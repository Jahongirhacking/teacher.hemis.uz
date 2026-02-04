"use server";

import { fetcher } from "../api";
import { IBaseDataRes, IServerSideOptions } from "../type";
import { ITeacherInfo, LoginPayload, LoginResponse } from "./type";

export const login = async (data: LoginPayload) => {
  console.log(data, "calling fetcher with body...");
  return fetcher<IBaseDataRes<LoginResponse>>(`auth/login`, {
    method: "POST",
    body: data,
  });
};

export const getProfile = async (options?: IServerSideOptions) => {
  return fetcher<IBaseDataRes<{ teacher: ITeacherInfo }>>(`auth/me`, {
    ...options,
  });
};

export const logout = async () => {
  return fetcher<void>(`auth/logout`, {
    method: "POST",
  });
};
