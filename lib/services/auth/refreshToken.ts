// lib/auth/refreshToken.ts
import { CookieItems } from "@/lib/const";
import { forwardSetCookie } from "@/lib/services/forwardSetCookie";
import { cookies } from "next/headers";
import { getBaseUrl } from "../api";

export async function refreshToken(): Promise<boolean> {
  const cookieStore = await cookies();

  // refresh_token bo‘lmasa — darhol fail
  if (!cookieStore.get(CookieItems.RefreshToken)) {
    return false;
  }

  const serverUrl = getBaseUrl();

  const res = await fetch(
    `${serverUrl || "https://api-univer.hemis.uz"}/api/v1/teacher/auth/refresh-token`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (!res.ok) return false;

  // API qaytargan Set-Cookie’ni browserga forward qilamiz
  forwardSetCookie(res.headers.get("set-cookie"));

  return (await res?.json())?.data?.access_token;
}
