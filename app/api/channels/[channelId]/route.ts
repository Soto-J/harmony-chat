import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { MemberRole } from "@prisma/client";

type Params = {
  channelId: string;
};

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { channelId } = params;

    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return NextResponse.json({});
  } catch (error) {
    return new NextResponse("[CHANNEL_ID_DELETE]", { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { channelId } = params;

    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }
    return NextResponse.json({});
  } catch (error) {
    return new NextResponse("[CHANNEL_ID_DELETE]", { status: 500 });
  }
}
