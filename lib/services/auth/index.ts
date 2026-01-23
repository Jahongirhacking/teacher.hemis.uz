import { fetcher, getBaseUrl } from "../api";
import { IBaseDataRes } from "../type";
import { LoginPayload, LoginResponse } from "./type";

export const login = async (data: LoginPayload) => {
  const url = await getBaseUrl();
  return fetcher<IBaseDataRes<LoginResponse>>(`${url}/auth/login`, {
    method: "POST",
    body: data,
  });
};

export const getProfile = async () => {
  const url = await getBaseUrl();
  return fetcher<{ id: string; name: string }>(`${url}/auth/me`);
};
