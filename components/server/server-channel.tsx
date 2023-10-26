"use client";

import { useParams, useRouter } from "next/navigation";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { cn } from "@/lib/utils";

import ActionTooltip from "@/components/action-tooltip";
import { useModalStore } from "@/hooks/use-modal-store";
import { MouseEvent } from "react";

type ServerChannelProps = {
  channel: Channel;
  server: Server;
  role?: MemberRole;
};

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.VOICE]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const router = useRouter();
  const params = useParams();
  const { onOpen } = useModalStore();

  const Icon = iconMap[channel.type];

  const onEdit = async (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();

    onOpen("editChannel", { server, channel });
  };

  const onDelete = async (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();

    onOpen("deleteChannel", { server, channel });
  };

  return (
    <button
      onClick={() => router.push(`/channels/${channel.id})`)}
      className={cn(
        "group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50",
        params?.channelId === channel.id && "bg-zinc-700 dark:bg-zinc-700",
      )}
    >
      <Icon
        className="
          h-5 
          w-5 
          flex-shrink-0 
          text-zinc-500 
          dark:text-zinc-400
        "
      />
      <span
        className={cn(
          "line-clamp-1 text-xs font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white",
        )}
      >
        {channel.name}
      </span>
      {channel.name === "general" && (
        <Lock className="ml-auto h-4 w-4 text-zinc-500 dark:text-zinc-400" />
      )}

      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={onEdit}
              className="
                hidden 
                h-4 
                w-4 
                text-zinc-500 
                transition 
                hover:text-zinc-600 
                group-hover:block 
                dark:text-zinc-400 
                dark:hover:text-zinc-300
              "
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={onDelete}
              className="
                hidden 
                h-4 
                w-4 
                text-zinc-500 
                transition 
                hover:text-zinc-600 
                group-hover:block 
                dark:text-zinc-400 
                dark:hover:text-zinc-300
              "
            />
          </ActionTooltip>
        </div>
      )}
    </button>
  );
};

export default ServerChannel;
