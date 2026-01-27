/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CookieItems } from "../const";
import paths from "../paths";
import { FetchResult } from "../services/api";

export const handlePrivateRequest = async (result: FetchResult<any>) => {
  console.log(result, "result");
  const cookieStore = await cookies();
  if (!result?.success) {
    if (result?.reason === "unauthorized") {
      cookieStore.delete({ name: CookieItems.AccessToken, path: "/" });
      cookieStore.delete({ name: CookieItems.RefreshToken, path: "/" });
      cookieStore.delete({ name: CookieItems.ServerUrl, path: "/" });
      redirect(paths.base);
    }
  }
  if (result?.success && result?.token) {
    console.log(result?.token, "token-1");
    cookieStore.set({
      name: CookieItems.AccessToken,
      value: result?.token,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  }
  return result;
};
