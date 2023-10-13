import type { ServerWithChannelsAndMembers } from "@/types";
import { MemberRole } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModalStore } from "@/hooks/use-modal-store";

type ServerHeadderProps = {
  server: ServerWithChannelsAndMembers;
  role?: MemberRole;
};

const ServerHeadder = ({ server, role }: ServerHeadderProps) => {
  const { onOpen } = useModalStore();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  const dropDownItems = [
    {
      role: MemberRole.MODERATOR,
      text: "Invite People",
      icon: UserPlus,
      fontPurple: true,
    },
    { role: MemberRole.ADMIN, text: "Server Settings", icon: Settings },
    { role: MemberRole.ADMIN, text: "Manage Members", icon: Users },
    { role: MemberRole.MODERATOR, text: "Create Channel", icon: PlusCircle },
  ];

  const moderatorItems = [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button
          className="
            flex
            h-12
            w-full
            items-center
            border-b-2
            border-neutral-200
            px-3
            text-base
            font-semibold
            transition
            hover:bg-zinc-700/10
            dark:border-neutral-800
            dark:hover:bg-zinc-700/50
          "
        >
          {server.name}
          <ChevronDown className="ml-auto h-5 w-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="
          w-56
          space-y-[2px]
          text-xs
          font-medium
          text-black
          dark:text-neutral-400
        "
      >
        {/* {dropDownItems.map(
          (item) =>
            role === "ADMIN" && (
              <DropdownMenuItem
                key={item.text}
                className={`
                  cursor-pointer 
                  px-3 
                  py-2 
                  text-sm
                  ${item.fontPurple && "text-indigo-600 dark:text-indigo-400"}
                `}
              >
                {item.text}
                <item.icon className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
              
            ),
        )} */}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="
              cursor-pointer
              px-3
              py-2
              text-sm
              text-indigo-600
              dark:text-indigo-400
            "
          >
            Invite People
            <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Server Settings
            <Settings className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Manage Members
            <Users className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Create Channel
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Delete Server
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Leave Server
            <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeadder;
