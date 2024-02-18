import { db } from "@/libs/db";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const queryParams = request.nextUrl.searchParams.get("query");

  try {
    if (!queryParams) {
      return NextResponse.json(
        {
          message: "Keyword cannot empty!",
        },
        { status: 200 }
      );
    }
    if (queryParams !== null) {
      const users = await db.user.findMany({
        where: {
          OR: [
            {
              username: {
                contains: queryParams,
              },
            },
            {
              fullName: {
                contains: queryParams,
              },
            },
          ],
        },
        select: {
          idUser: true,
          username: true,
          fullName: true,
        },
      });

      if (users.length < 1) {
        return NextResponse.json(
          {
            message: "Users not found!",
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          users: users,
          message: "Users found!",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
};
