import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

type Params = {
  serverId: string;
};

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { serverId } = params;
    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: { not: profile.id },
        members: {
          some: { profileId: profile.id },
        },
      },
      data: {
        members: {
          deleteMany: { profileId: profile.id },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error: any) {
    console.log("[SERVERS_ID_LEAVE]", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
