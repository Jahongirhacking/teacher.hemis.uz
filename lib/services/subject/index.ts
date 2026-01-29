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
import {
  ICurriculum,
  IEducationYear,
  IGroup,
  ISemester,
  ISubject,
  ISubjectInfo,
  ISubjectTopic,
} from "./type";

export const getSubjectTopic = async ({
  params: { page, per_page, ...params },
  ...options
}: IServerSideOptions &
  IParamsSchema<
    IPaginationParams & {
      semester?: ISemester["code"];
      subject_id?: ISubject["id"];
    }
  >) => {
  return fetcher<IBaseDataRes<ISubjectTopic[]> & IBaseDataWithMeta>(
    `subject-topics?${getSearchParamString({ ...params, page: page || DEFAULT_PAGINATION.page, per_page: per_page || DEFAULT_PAGINATION.size })}`,
    {
      method: "GET",
      ...options,
    },
  );
};

export const getSubjectInfo = async ({
  params: { page, per_page, ...params },
  ...options
}: IServerSideOptions &
  IParamsSchema<
    IPaginationParams & {
      curriculum_id?: ICurriculum["id"];
      education_year?: IEducationYear["code"];
      group_id?: IGroup["id"];
      semester?: ISemester["code"];
      subject_id?: ISubject["id"];
    }
  >) => {
  return fetcher<IBaseDataRes<ISubjectInfo[]> & IBaseDataWithMeta>(
    `subject-info?${getSearchParamString({ ...params, page: page || DEFAULT_PAGINATION.page, per_page: per_page || DEFAULT_PAGINATION.size })}`,
    {
      method: "GET",
      ...options,
    },
  );
};
