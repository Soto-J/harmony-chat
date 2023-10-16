import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

type Params = {
  serverId: string;
};

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, imageUrl } = await request.json();

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: { name, imageUrl },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
