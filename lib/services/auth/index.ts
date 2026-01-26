import { fetcher } from "../api";
import { IBaseDataRes } from "../type";
import { LoginPayload, LoginResponse } from "./type";

export const login = async (data: LoginPayload) => {
  return fetcher<IBaseDataRes<LoginResponse>>(`auth/login`, {
    method: "POST",
    body: data,
  });
};

export const getProfile = async () => {
  return fetcher<{ id: string; name: string }>(`auth/me`);
};

export const logout = async () => {
  return fetcher<void>(`auth/logout`, {
    method: "POST",
  });
};
