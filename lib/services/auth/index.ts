import { fetcher } from "../api";
import { IBaseDataRes } from "../type";
import { ITeacherInfo, LoginPayload, LoginResponse } from "./type";

export const login = async (data: LoginPayload) => {
  return fetcher<IBaseDataRes<LoginResponse>>(`auth/login`, {
    method: "POST",
    body: data,
  });
};

export const getProfile = async () => {
  return fetcher<IBaseDataRes<{ teacher: ITeacherInfo }>>(`auth/me`, undefined);
};

export const logout = async () => {
  return fetcher<void>(`auth/logout`, {
    method: "POST",
  });
};
