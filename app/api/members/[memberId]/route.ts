import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = {
  memberId: string;
};

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const { memberId } = params;

    if (!memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const { role } = await request.json();

    if (!role) {
      return new NextResponse("Role missing", { status: 400 });
    }

    const server = await db.server.update({
      where: { id: serverId, profileId: profile.id },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: { not: profile.id },
            },
            data: { role },
          },
        },
      },
      include: {
        members: {
          include: { profile: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[MEMBERS_ID_PATCH]", error);
    return new NextResponse("Iternal Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const { memberId } = params;

    if (!memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const server = await db.server.update({
      where: { id: serverId, profileId: profile.id },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            profileId: { not: profile.id },
          },
        },
      },
      include: {
        members: {
          include: { profile: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[MEMBERS_ID_DELETE]", error);
    return new NextResponse("Iternal Error", { status: 500 });
  }
}
