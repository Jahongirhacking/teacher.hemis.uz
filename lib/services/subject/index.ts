"use server";

import { DEFAULT_PAGINATION } from "@/lib/const";
import { getSearchParamString } from "@/lib/utils";
import { fetcher } from "../api";
import {
  IBaseDataRes,
  IBaseDataWithMeta,
  IPaginationParams,
  IParamsSchema,
  IServerSideOptions,
} from "../type";
import { ISubjectTopic } from "./type";

export const getSubjectTopic = async ({
  params: { page, per_page, ...params },
  ...options
}: IServerSideOptions &
  IParamsSchema<
    IPaginationParams & { semester?: string; subject_id?: number }
  >) => {
  return fetcher<IBaseDataRes<ISubjectTopic[]> & IBaseDataWithMeta>(
    `subject-topics?${getSearchParamString({ ...params, page: page || DEFAULT_PAGINATION.page, per_page: per_page || DEFAULT_PAGINATION.size })}`,
    {
      method: "GET",
      ...options,
    },
  );
};
