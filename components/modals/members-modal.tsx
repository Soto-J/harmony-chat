"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import qs from "query-string";

import { ServerWithChannelsAndMembers } from "@/types";
import { MemberRole } from "@prisma/client";
import { useModalStore } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 h-4 w-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
};

const MembersModal = () => {
  const [loadingId, setLoadingId] = useState("");

  const router = useRouter();
  const { isOpen, onOpen, onClose, modalType, data } = useModalStore();
  const { server } = data as { server: ServerWithChannelsAndMembers };

  const isModalOpen = isOpen && modalType === "members";

  const members =
    server?.members?.length > 1
      ? `${server.members.length} Members`
      : `${server?.members?.length} Member`;

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: { serverId: server.id },
      });

      const response = await axios.delete(url);
      
      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: { serverId: server.id },
      });

      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {members}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="mb-6 flex items-center gap-x-2">
              <UserAvatar src={member.profile.imageUrl} className="" />
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center text-xs font-semibold">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500">{member.profile.email}</p>
              </div>

              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="h-4 w-4" />
                            <span className="ml-2">Role</span>
                          </DropdownMenuSubTrigger>

                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, "GUEST")}
                              >
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Guest</span>
                                {member.role === MemberRole.GUEST && (
                                  <Check className="ml-auto h-4 w-4" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, "MODERATOR")
                                }
                              >
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                <span className="mr-2">Moderator</span>
                                {member.role === MemberRole.MODERATOR && (
                                  <Check className="ml-auto h-4 w-4" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className="mr-2 h-4 w-4" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className="ml-auto h-4 w-4 animate-spin text-zinc-500" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
