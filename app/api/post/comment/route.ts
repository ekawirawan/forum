import { db } from "@/libs/db";
import { NextResponse } from "next/server";
import type { Comment } from "@prisma/client";
import * as z from "zod";

const commentSchema = z.object({
  content: z.string().min(1, "Content is required").max(250),
  postId: z.string(),
  authorId: z.string(),
});

export const POST = async (request: Request) => {
  const body: Comment = await request.json();
  const { content, postId, authorId } = commentSchema.parse(body);

  try {
    const comment = await db.comment.create({
      data: {
        content,
        postId,
        authorId,
      },
    });

    return NextResponse.json(
      {
        comment: comment,
        message: "Comment created successfully",
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
