import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(request: Request) {
  try {
    return NextResponse.json({});
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    return NextResponse.json({});
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
