"use server";

import { getSearchParamString } from "@/lib/utils";
import { fetcher } from "../api";
import { IPaginationParams, IParamsSchema, IServerSideOptions } from "../type";

export const getSubjectTopic = async ({
  params,
  ...options
}: IServerSideOptions &
  IParamsSchema<
    IPaginationParams & { semester?: string; subject_id?: number }
  >) => {
  return fetcher(`/subject-topics?${getSearchParamString(params)}`, {
    method: "GET",
    ...options,
  });
};
