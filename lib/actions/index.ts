/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CookieItems } from "../const";
import paths from "../paths";
import { FetchResult, FetchResultWithError } from "../services/api";
import { forwardSetCookie } from "../services/cookieUtils";
import { IServerSideOptions } from "../services/type";

export const handlePrivateRequest = async <T>(
  cb: (props?: IServerSideOptions) => Promise<FetchResult<T>>,
): Promise<T | FetchResultWithError> => {
  const result = await cb?.({ isPrivate: true });
  const cookieStore = await cookies();
  if (!result?.success) {
    if (result?.reason === "unauthorized") {
      cookieStore.delete({ name: CookieItems.AccessToken, path: "/" });
      cookieStore.delete({ name: CookieItems.RefreshToken, path: "/" });
      cookieStore.delete({ name: CookieItems.ServerUrl, path: "/" });
      redirect(paths.base);
    }
    return result;
  } else if (result?.credentials) {
    forwardSetCookie(result?.credentials);
  }
  return result?.data;
};
