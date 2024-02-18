import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import * as z from "zod";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const detailPost = await db.post.findUnique({
      where: {
        idPost: params.id,
      },
      select: {
        idPost: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            username: true,
            fullName: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
        comments: {
          select: {
            author: {
              select: {
                username: true,
                fullName: true,
              },
            },
            idComment: true,
            content: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(
      {
        detailPost: detailPost,
        messgae: "Detail post retrieval successfully",
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

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const post = await db.post.delete({
      where: {
        idPost: params.id,
      },
      select: {
        idPost: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            username: true,
            fullName: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        post: post,
        message: "Post deleted successfully!",
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

const editPostSchema = z.object({
  content: z.string().min(1, "Content is required").max(250),
});

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body = await request.json();
  const { content } = editPostSchema.parse(body);
  try {
    const post = await db.post.update({
      where: {
        idPost: params.id,
      },
      data: {
        content,
      },
      select: {
        idPost: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            username: true,
            fullName: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        post: post,
        message: "Post edited sucessfully!",
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
