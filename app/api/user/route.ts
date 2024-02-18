import { db } from "@/libs/db";
import { NextResponse } from "next/server";
import type { User } from "@prisma/client";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z.object({
  fullName: z.string().min(1, "Fullname is required").max(100),
  username: z.string().min(1, "Username is required").max(100),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export const POST = async (request: Request) => {
  const body: User = await request.json();
  const { fullName, username, password } = userSchema.parse(body);

  try {
    //check if user already exists
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "user with this username already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully",
      },
      { status: 201 }
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
