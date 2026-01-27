import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // current pathname ni headerga yozamiz
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}
