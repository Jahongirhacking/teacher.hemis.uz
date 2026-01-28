"use server";

import { CookieItems } from "@/lib/const";
import { cookies } from "next/headers";
import { getBaseUrl } from "../api";

export async function refreshToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(CookieItems.RefreshToken)?.value;

  if (!refreshToken) return null;

  const baseUrl = await getBaseUrl();
  if (!baseUrl) return null;

  const res = await fetch(`${baseUrl}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${CookieItems.RefreshToken}=${refreshToken}`,
    },
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return null;

  return res?.headers?.get("set-cookie") ?? null;
}
