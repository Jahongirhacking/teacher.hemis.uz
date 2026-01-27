"use server";

import { CookieItems } from "@/lib/const";
import paths from "@/lib/paths";
import { getProfile, logout } from "@/lib/services/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { handlePrivateRequest } from ".";

export const logoutAction = async () => {
  try {
    await logout();
  } catch (err) {
    console.error(err);
  } finally {
    const cookieStore = await cookies();
    cookieStore.delete({ name: CookieItems.AccessToken, path: "/" });
    cookieStore.delete({ name: CookieItems.RefreshToken, path: "/" });
    cookieStore.delete({ name: CookieItems.ServerUrl, path: "/" });
    redirect(paths.base);
  }
};

export const getProfileAction = async () => {
  try {
    return handlePrivateRequest(await getProfile());
  } catch (err) {
    console.error(err);
  }
};
