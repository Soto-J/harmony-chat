import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

type InviteCodeProps = {
  params: { inviteCode: string };
};

const InviteCodePage = async ({ params }: InviteCodeProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const profileIsInServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: { profileId: profile.id },
      },
    },
  });

  if (profileIsInServer) {
    return redirect(`/servers/${profileIsInServer.id}`);
  }

  const server = await db.server.update({
    where: { inviteCode: params.inviteCode },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InviteCodePage;
