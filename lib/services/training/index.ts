import { DEFAULT_PAGINATION } from "@/lib/const";
import { getSearchParamString } from "@/lib/utils";
import { fetcher } from "../api";
import {
  IBaseDataRes,
  IPaginationParams,
  IParamsSchema,
  IServerSideOptions,
} from "../type";
import { IAttendanceJournalRes } from "./type";

export const getAttendanceJournal = async ({
  params: { page, per_page, ...params },
  ...options
}: IServerSideOptions &
  IParamsSchema<
    {
      education_year?: string;
      semester?: string;
      group_id?: number | string;
      subject_id?: number | string;
      training_type?: string;
    } & IPaginationParams
  >) => {
  return fetcher<IBaseDataRes<IAttendanceJournalRes>>(
    `attendance-journal?${getSearchParamString({ ...params, page: page || DEFAULT_PAGINATION.page, per_page: per_page || DEFAULT_PAGINATION.size })}`,
    {
      method: "GET",
      ...options,
    },
  );
};
