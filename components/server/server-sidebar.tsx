import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import ServerHeader from "./server-header";
import ServerSearch from "./server-search";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import ServerMembers from "./server-members";

type ServerSidebarProps = {
  serverId: string;
};

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.VOICE]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.GUEST]: null,
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

      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channel",
                type: "channel",
                data: textChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channel",
                type: "channel",
                data: voiceChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channel",
                type: "channel",
                data: videoChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>

        <Separator className="my-2 rounded-md bg-zinc-200 dark:bg-zinc-700" />

        {!!textChannels?.length && (
          <section className="mb-2">
            <ServerSection
              label="Text Channels"
              role={profileRole}
              sectionType="channels"
              channelType={ChannelType.TEXT}
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={profileRole}
                />
              ))}
            </div>
          </section>
        )}

        {!!voiceChannels?.length && (
          <section className="mb-2">
            <ServerSection
              label="Voice Channels"
              role={profileRole}
              sectionType="channels"
              channelType={ChannelType.VOICE}
            />
            <div className="space-y-[2px]">
              {voiceChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={profileRole}
                />
              ))}
            </div>
          </section>
        )}

        {!!videoChannels?.length && (
          <section className="mb-2">
            <ServerSection
              label="Video Channels"
              role={profileRole}
              sectionType="channels"
              channelType={ChannelType.VIDEO}
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={profileRole}
                />
              ))}
            </div>
          </section>
        )}

        {!!members?.length && (
          <section className="mb-2">
            <ServerSection
              label="Members"
              role={profileRole}
              sectionType="members"
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ServerMembers key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
