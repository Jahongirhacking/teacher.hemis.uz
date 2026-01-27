"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { CookieItems } from "../const";
import { refreshToken } from "./auth/refreshToken";

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

export const getBaseUrl = async () => {
  const cookieStore = await cookies();
  const serverUrl = cookieStore.get(CookieItems.ServerUrl);
  return (
    (decodeURIComponent(serverUrl?.value || "") ||
      "https://api-univer.hemis.uz") + "/api/v1/teacher"
  );
};

const getAccessToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(CookieItems.AccessToken)?.value;
};

export type FetchResult<T> =
  | { success: true; data: T; headers: Headers; token?: string }
  | { success: false; reason: "unauthorized" | "other"; error?: any };

export async function fetcher<T>(
  path: string,
  options: FetchOptions = {},
): Promise<FetchResult<T>> {
  const token = options.token || (await getAccessToken());
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}/${path}`;

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

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      const errMsg = error.message || res.statusText || "Fetch error";
      const err: any = new Error(errMsg);
      err.status = res.status;
      throw err;
    }

    const data = await res.json();
    return { data, headers: res.headers };
  };

  try {
    const result = await actualFetch(token);
    return { success: true, ...result };
  } catch (err: any) {
    if (err.status === 401) {
      // token refresh flow
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          if (!newToken) return { success: false, reason: "unauthorized" };
          processQueue(null, String(newToken));
          const result = await actualFetch(String(newToken));
          return { success: true, token: newToken, ...result };
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
