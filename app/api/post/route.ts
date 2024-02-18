import { db } from "@/libs/db";
import { NextResponse } from "next/server";
import type { Post } from "../../../prisma/generated/client";
import * as z from "zod";

const postSchema = z.object({
  content: z.string().min(1, "Content is required").max(250),
  authorId: z.string().min(1),
});

export const GET = async () => {
  try {
    const posts = await db.post.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        posts: posts,
        message: "Posts retrieval successfully",
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

export const POST = async (request: Request) => {
  const body: Post = await request.json();
  const { content, authorId } = postSchema.parse(body);
  try {
    const post = await db.post.create({
      data: {
        content,
        authorId,
      },
    });

    return NextResponse.json(
      {
        post: post,
        message: "Post created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went error!",
      },
      { status: 500 }
    );
  }
};
