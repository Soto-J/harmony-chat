import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = {
  memberId: string;
};

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(request.url);
    const { role } = await request.json();
    const { memberId } = params;
    const serverId = searchParams.get("serverId");
    console.log(searchParams.toString());

    if (!profile) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID midding", { status: 400 });
    }

    if (!memberId) {
      return new NextResponse("Member ID midding", { status: 400 });
    }

    if (!role) {
      return new NextResponse("Role midding", { status: 400 });
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
