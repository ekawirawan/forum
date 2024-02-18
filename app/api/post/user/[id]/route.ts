import { NextResponse } from "next/server";
import { db } from "@/libs/db";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const posts = await db.user.findUnique({
      where: {
        idUser: params.id,
      },
      select: {
        posts: {
          select: {
            idPost: true,
            content: true,
            createdAt: true,
            _count: {
              select: {
                comments: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(
      {
        posts: posts?.posts,
        message: "User post retrieval successfully",
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
