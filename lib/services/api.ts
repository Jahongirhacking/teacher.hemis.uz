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

export async function fetcher<T>(
  path: string,
  options: FetchOptions = {},
): Promise<{ data: T; headers: Headers }> {
  const token = options.token || (await getAccessToken());
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}/${path}`;

  if (process.env.NODE_ENV === "development") {
    console.log(url, options, "debug");
  }

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
    return await actualFetch(token);
  } catch (err: any) {
    if (err.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          if (!newToken) throw new Error("Token topilmadi");
          processQueue(null, String(newToken));
          return actualFetch(String(newToken));
        } catch (refreshError) {
          processQueue(refreshError, null);
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      } else {
        // Queue the request until refresh finishes
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: async (tok: string) => {
              try {
                const result = await actualFetch(tok);
                resolve(result);
              } catch (e) {
                reject(e);
              }
            },
            reject,
          });
        });
      }
    }
    throw err;
  }
}
