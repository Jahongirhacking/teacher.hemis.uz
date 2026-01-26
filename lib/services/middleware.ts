// middleware.ts
import { CookieItems } from "@/lib/const";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import paths from "../paths";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(CookieItems.AccessToken);

  if (!accessToken && req.nextUrl.pathname.startsWith(paths.private.base)) {
    return NextResponse.redirect(new URL(paths.base, req.url));
  }

  return NextResponse.next();
}
