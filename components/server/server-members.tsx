"use client";

import { useParams, useRouter } from "next/navigation";

import { MemberWithProfile } from "@/types";
import { MemberRole } from "@prisma/client";
import { cn } from "@/lib/utils";

import { ShieldAlert, ShieldCheck } from "lucide-react";
import UserAvatar from "../user-avatar";

type ServerMembersProps = {
  member: MemberWithProfile;
};

const roleIconMap = {
  [MemberRole.ADMIN]: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="ml-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.GUEST]: null,
};

const ServerMembers = ({ member }: ServerMembersProps) => {
  const router = useRouter();
  const params = useParams();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${params.serverId}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700",
      )}
    >
      <UserAvatar
        className="h-8 w-8 md:h-8 md:w-8"
        src={member.profile.imageUrl}
      />
      <span
        className={cn(
          "text-sm font-semibold capitalize text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300",
          params.memberId === member.id && "text-primary dark:text-zinc-200",
        )}
      >
        {member.profile.name}
      </span>
      {icon}
    </button>
  );
};

export default ServerMembers;
