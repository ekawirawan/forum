import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req, secret: process.env.EXTAUTH_SECRET });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith("/sign-in") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/sign-up") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isGuest =
    req.nextUrl.pathname.startsWith("/sign-in") ||
    req.nextUrl.pathname.startsWith("/sign-up");

  if (!isAuthenticated) {
    if (isGuest) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(
        `/sign-in?callbackUrl=${encodeURIComponent(new URL(req.url).pathname)}`,
        req.url
      )
    );
  }

  return NextResponse.next();

  // const authMiddleware = await withAuth({
  //   pages: {
  //     signIn: `/sign-in`,
  //   },
  // });

  // ats-expect-error
  // return authMiddleware(req, event);
}

export const config = {
  matcher: [
    "/api/post/:path*",
    "/",
    "/profile",
    "/post",
    "/forum/:path*",
    "/sign-in",
    "/sign-up",
    "/search",
  ],
};
