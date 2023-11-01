import { redirect } from "next/navigation";

import { redirectToSignIn } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import ChatHeader from "@/components/chat/chat-header";

type ChannelIdPageProps = {
  params: {
    serverId: string;
    channelId: string;
  };
};

const page = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: { id: params.channelId, profileId: profile.id },
  });

  const member = await db.member.findFirst({
    where: { serverId: params.serverId, profileId: profile.id },
  });

  if (!channel || !member) {
    return redirect("/");
  }
  return (
    <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
      <ChatHeader
        serverId={params.serverId}
        name={channel.name}
        type="channel"
      />
    </div>
  );
};

export default page;
