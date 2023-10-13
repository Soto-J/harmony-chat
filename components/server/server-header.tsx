import type { ServerWithChannelsAndMembers } from "@/types";
import { MemberRole } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type ServerHeadderProps = {
  server: ServerWithChannelsAndMembers;
  role?: MemberRole;
};

const ServerHeadder = ({ server, role }: ServerHeadderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

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
    </DropdownMenu>
  );
};

export default ServerHeadder;
