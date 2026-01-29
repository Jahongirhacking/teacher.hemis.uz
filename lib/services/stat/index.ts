import { fetcher } from "../api";
import { IBaseDataRes, IServerSideOptions } from "../type";
import { IDashboardStats } from "./type";

export const getDashboardStats = async ({ ...options }: IServerSideOptions) => {
  return fetcher<IBaseDataRes<IDashboardStats>>(`dashboard`, {
    method: "GET",
    ...options,
  });
};
