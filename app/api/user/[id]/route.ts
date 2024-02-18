import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import * as z from "zod";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await db.user.findUnique({
      where: {
        idUser: params.id,
      },
      select: {
        username: true,
        fullName: true,
        bio: true,
      },
    });

    return NextResponse.json(
      {
        user: user,
        message: "User retrieval successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
};

//validasi input
const userSchema = z.object({
  fullName: z.string().min(1, "Fullname is required").max(100),
  bio: z.string().nullable(),
});

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body = await request.json();
  const { fullName, bio } = userSchema.parse(body);

  try {
    const user = await db.user.update({
      where: {
        idUser: params.id,
      },
      data: {
        fullName,
        bio,
      },
      select: {
        idUser: true,
        username: true,
        fullName: true,
        bio: true,
      },
    });

    return NextResponse.json(
      {
        user: user,
        message: "User edited successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
};
