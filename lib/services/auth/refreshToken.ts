// lib/auth/refreshToken.ts
import { CookieItems } from "@/lib/const";
import { cookies } from "next/headers";
import { getBaseUrl } from "../api";

export async function refreshToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refresh = cookieStore.get(CookieItems.RefreshToken);
  if (!refresh) return null;

  const baseUrl = await getBaseUrl();

  const request = new Request(`${baseUrl}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${refresh.name}=${refresh.value}`,
    },
  });
  const res = await fetch(request);

  if (!res.ok) return null;

  const json = await res.json();
  return json?.data?.access_token ?? null;
}
