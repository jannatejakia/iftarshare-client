import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

// sends visitors who are not logged in to the login page
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/create-event/:path*", "/manage-events/:path*", "/joined-events/:path*"],
};
