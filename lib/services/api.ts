/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { CookieItems } from "../const";

// options.token can still override cookie
export type FetchOptions = Omit<RequestInit, "body"> & {
  body?: any;
  token?: string;
  cookie?: string; // for SSR
};

export const getBaseUrl = async () => {
  const cookieStore = await cookies();
  const serverUrl = cookieStore.get(CookieItems.ServerUrl);
  return `${decodeURIComponent(serverUrl?.value || "") || "https://api-univer.hemis.uz"}/api/v1/teacher`;
};

export async function fetcher<T>(
  path: string,
  options: FetchOptions = {},
): Promise<{ data: T; headers: Headers }> {
  // return headers too
  let token = options.token;
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}/${path}`;

  // On server: read token from cookies
  if (!token) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(CookieItems.AccessToken);
    token = accessToken?.value;
  }

  if (process.env.NODE_ENV === "development") {
    console.log(url, options, "debug");
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "Fetch error");
  }

  const data = await res.json();
  return { data, headers: res.headers }; // include headers
}
