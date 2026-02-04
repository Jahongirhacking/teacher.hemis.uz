"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { CookieItems } from "../const";
import { refreshToken } from "./auth/refreshToken";
import { extractCookieValue } from "./cookieUtils";
import { IServerSideOptions } from "./type";

export type FetchOptions = Omit<RequestInit, "body"> & {
  body?: any;
  token?: string;
  cookie?: string; // for SSR
};

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => (token ? p.resolve(token) : p.reject(error)));
  failedQueue = [];
};

export const getBaseUrl = async (isPrivate: boolean = false) => {
  const postfix = "api/v1/teacher";
  const cookieStore = await cookies();
  const serverUrl = cookieStore.get(CookieItems.ServerUrl);
  if (!serverUrl?.value) {
    if (isPrivate) return "";
    return `https://api-univer.hemis.uz/${postfix}`;
  }
  return `${decodeURIComponent(serverUrl?.value)}/${postfix}`;
};

const getAccessToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(CookieItems.AccessToken)?.value;
};

export type FetchResult<T> =
  | { success: true; data: T; headers: Headers; credentials?: string }
  | { success: false; reason: "unauthorized" | "other"; error?: any };

export async function fetcher<T>(
  path: string,
  { server, isPrivate, ...options }: FetchOptions & IServerSideOptions = {},
): Promise<FetchResult<T>> {
  console.log(path, server, isPrivate, options, "fetcher oprtions");
  const token = options.token || (await getAccessToken());
  const baseUrl = await getBaseUrl(isPrivate);
  console.log(baseUrl, "baseUrl");
  if (!baseUrl)
    return {
      success: false,
      reason: "unauthorized",
      error: "Muassasa topilmadi",
    };

  const url = `${baseUrl}/${path}`;
  console.log(url, "baseUrl/path");

  const actualFetch = async (tok?: string) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(tok ? { Authorization: `Bearer ${tok}` } : {}),
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: "include",
    });

    // if (process.env.NODE_ENV === "development") {
    console.log(url, options, res, "debug");
    // }

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      const errMsg = error.message || res.statusText || "Fetch error";
      const err: any = new Error(errMsg);
      err.status = res.status;
      throw err;
    }

    const data = await res.json();
    // if (process.env.NODE_ENV === "development") {
    console.log(data, "debug");
    // }
    return { data, headers: res.headers };
  };

  try {
    console.log("fetching...");
    const result = await actualFetch(token);
    console.log(result, "result");
    return { success: true, ...result };
  } catch (err: any) {
    if (err.status === 401 && !server) {
      // token refresh flow
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newCredentials = await refreshToken();
          const newToken =
            extractCookieValue(newCredentials, CookieItems.AccessToken) || "";
          if (!newCredentials || !newToken)
            return { success: false, reason: "unauthorized" };
          processQueue(null, newToken);
          const result = await actualFetch(newToken);
          return { success: true, credentials: newCredentials, ...result };
        } catch (refreshError) {
          processQueue(refreshError, null);
          return {
            success: false,
            reason: "unauthorized",
            error: refreshError,
          };
        } finally {
          isRefreshing = false;
        }
      } else {
        // queued requests wait for new token
        return new Promise((resolve) => {
          failedQueue.push({
            resolve: async (tok: string) => {
              try {
                if (!tok) return;
                const result = await actualFetch(tok);
                resolve({ success: true, ...result });
              } catch (e) {
                resolve({ success: false, reason: "other", error: e });
              }
            },
            reject: () => resolve({ success: false, reason: "unauthorized" }),
          });
        });
      }
    }
    return { success: false, reason: "other", error: err };
  }
}
