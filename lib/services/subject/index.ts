/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { DEFAULT_PAGINATION } from "@/lib/const";
import { ICreateTopicBody } from "@/lib/schemas/subject.schema";
import { getSearchParamString } from "@/lib/utils";
import { fetcher } from "../api";
import {
  IBaseDataRes,
  IBaseDataWithMeta,
  IBodySchema,
  IPaginationParams,
  IParamsSchema,
  IServerSideOptions,
} from "../type";
import {
  ICurriculum,
  ICurriculumSubject,
  IEducationYear,
  IFiltersForm,
  IFiltersRes,
  IGroup,
  ISchedule,
  ISemester,
  ISubject,
  ISubjectInfo,
  ISubjectTask,
  ISubjectTopic,
  ISubjectWithResources,
  ITaskType,
  ITeacherResource,
  ITraining,
  ITrainingType,
  SubjectFilters,
} from "./type";

// Subject Topic

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
  return fetcher<IBaseDataRes<ICurriculumSubject[]> & IBaseDataWithMeta>(
    `subject-topics?${getSearchParamString({ ...params, page: page || DEFAULT_PAGINATION.page, per_page: per_page || DEFAULT_PAGINATION.size })}`,
    {
      method: "GET",
      ...options,
    },
  );
};

export const getSubjectTopicWithId = async ({
  params: { topicContainerId, page, per_page, ...params },
  ...options
}: IServerSideOptions &
  IParamsSchema<
    IPaginationParams & {
      topicContainerId: ICurriculumSubject["id"] | string;
      training_type?: ITrainingType["code"];
      active?: boolean;
    }
  >) => {
  return fetcher<IBaseDataRes<ISubjectTopic>>(
    `subject-topics/${topicContainerId}?${getSearchParamString({ ...params, page: page || DEFAULT_PAGINATION.page, per_page: per_page || DEFAULT_PAGINATION.size })}`,
    {
      method: "GET",
      ...options,
    },
  );
};

export const createSubjectTopic = async ({
  params: { topicContainerId },
  body,
  ...options
}: IServerSideOptions &
  IParamsSchema<{
    topicContainerId: ICurriculumSubject["id"] | string;
  }> &
  IBodySchema<ICreateTopicBody>) => {
  return fetcher<IBaseDataRes<ISubjectTopic>>(
    `subject-topics/${topicContainerId}/topics`,
    {
      method: "POST",
      body: {
        active: true,
        ...body,
      },
      ...options,
    },
  );
};

export const editSubjectTopic = async ({
  params: { topicId },
  body,
  ...options
}: IServerSideOptions &
  IParamsSchema<{
    topicId: number | string;
  }> &
  IBodySchema<ICreateTopicBody>) => {
  return fetcher<IBaseDataRes<ISubjectTopic>>(
    `subject-topics/topics/${topicId}`,
    {
      method: "PUT",
      body: {
        ...body,
      },
      ...options,
    },
  );
};

// Subject Info

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

export const getSubjects = async ({ ...options }: IServerSideOptions) => {
  return fetcher<IBaseDataRes<ISubjectWithResources[]> & IBaseDataWithMeta>(
    `subjects`,
    {
      method: "GET",
      ...options,
    },
  );
};

// Subject Tasks

export const getSubjectTasks = async ({
  params: { page, per_page, ...params },
  ...options
}: IServerSideOptions &
  IParamsSchema<
    IPaginationParams & {
      curriculum_id?: ICurriculum["id"];
      training_type?: ITraining["training_type"];
      semester?: ISemester["code"];
      subject_id?: ISubject["id"];
      task_type?: ITaskType["code"];
      status?: string;
    }
  >) => {
  return fetcher<IBaseDataRes<ISubjectTask[]> & IBaseDataWithMeta>(
    `subject-tasks/tasks?${getSearchParamString({ ...params, page: page || DEFAULT_PAGINATION.page, per_page: per_page || DEFAULT_PAGINATION.size })}`,
    {
      method: "GET",
      ...options,
    },
  );
};

// Schedules

export const getSchedulesByRange = async ({
  params,
  ...options
}: IServerSideOptions &
  IParamsSchema<{
    start_date?: string;
    end_date?: string;
    semester?: ISemester["code"];
    subject_id?: ISubject["id"];
    education_year?: IEducationYear["code"];
    group_id?: IGroup["id"];
  }>) => {
  return fetcher<IBaseDataRes<ISchedule[]>>(
    `schedule?${getSearchParamString({ ...params })}`,
    {
      method: "GET",
      ...options,
    },
  );
};

export const getSchedulesByDate = async ({
  params,
  ...options
}: IServerSideOptions &
  IParamsSchema<{
    date?: string;
    semester?: ISemester["code"];
    subject_id?: ISubject["id"];
    education_year?: IEducationYear["code"];
    group_id?: IGroup["id"];
  }>) => {
  return getSchedulesByRange({
    params: {
      ...params,
      start_date: params?.date,
      end_date: params?.date,
    },
    ...options,
  });
};

// Filters

export const batchSubjectFilters = async ({
  body,
  ...options
}: IServerSideOptions &
  IBodySchema<
    {
      types?: SubjectFilters[];
    } & IFiltersForm
  >) => {
  return fetcher<IBaseDataRes<IFiltersRes>>(`filters/batch`, {
    method: "POST",
    body,
    ...options,
  });
};

export const getSubjectFilterByType = async ({
  params: { filterType },
  ...options
}: IServerSideOptions &
  IParamsSchema<
    {
      filterType?: SubjectFilters;
    } & IFiltersForm
  >) => {
  return fetcher<IBaseDataRes<any[]>>(`filters/${filterType}`, {
    method: "GET",
    ...options,
  });
};

// Resources

export const getTeacherResources = async ({
  params,
  ...options
}: IServerSideOptions &
  IParamsSchema<
    {
      subject_id?: ISubject["id"];
      curriculum_subject_id?: ISubject["curriculum_subject_id"];
      resource_type?: string;
      active?: boolean;
    } & IPaginationParams
  >) => {
  return fetcher<IBaseDataRes<ITeacherResource[]> & IBaseDataWithMeta>(
    `resources?${getSearchParamString(params)}`,
    {
      method: "GET",
      ...options,
    },
  );
};

export const getTeacherResourceWithId = async ({
  params,
  ...options
}: IServerSideOptions & IParamsSchema<{ id: ITeacherResource["id"] }>) => {
  return fetcher<IBaseDataRes<ITeacherResource>>(`resources/${params?.id}`, {
    method: "GET",
    ...options,
  });
};

export const getSubjectsWithResources = async ({
  params,
  ...options
}: IServerSideOptions &
  IParamsSchema<
    {
      subject_id?: ISubject["id"];
      education_year?: IEducationYear["code"];
    } & IPaginationParams
  >) => {
  return fetcher<IBaseDataRes<ISubjectWithResources[]> & IBaseDataWithMeta>(
    `resources/subjects?${getSearchParamString(params)}`,
    {
      method: "GET",
      ...options,
    },
  );
};
