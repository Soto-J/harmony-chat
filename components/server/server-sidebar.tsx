import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./server-header";

type ServerSidebarProps = {
  serverId: string;
};

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: { id: serverId },
    include: {
      channels: {
        orderBy: { createdAt: "asc" },
      },
      members: {
        include: { profile: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  );
  const voiceChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VOICE,
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO,
  );

  const members = server.members.filter(
    (member) => member.profileId !== profile.id,
  );

  const profileRole = server.members.find(
    (member) => member.profileId === profile.id,
  )?.role;

  return (
    <div
      className="
        flex 
        h-full 
        flex-col
        bg-[#f2f3f5]
        text-primary
        dark:bg-[#2b2d31]
      "
    >
      <ServerHeader server={server} role={profileRole} />
    </div>
  );
};

export default ServerSidebar;
