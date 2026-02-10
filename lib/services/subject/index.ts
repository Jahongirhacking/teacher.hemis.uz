/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { DEFAULT_PAGINATION } from "@/lib/const";
import {
  ICreateResourceBody,
  ICreateTopicBody,
} from "@/lib/schemas/subject.schema";
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
  IEducationType,
  IEducationYear,
  IFiltersForm,
  IFiltersRes,
  IGroup,
  ILanguage,
  IResourceItem,
  ISchedule,
  ISemester,
  IStudyResourceOptions,
  IStudyResourceSubjectOptions,
  ISubject,
  ISubjectInfo,
  ISubjectResourceDetails,
  ISubjectResources,
  ISubjectTask,
  ISubjectTaskStats,
  ISubjectTopic,
  ISubjectTopicItem,
  ISubjectTopicItemRes,
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

export const getSubjectTopicItem = async ({
  params: { topicId },
  ...options
}: IServerSideOptions &
  IParamsSchema<{
    topicId: number | string;
  }>) => {
  return fetcher<IBaseDataRes<ISubjectTopicItemRes>>(
    `subject-topics/topics/${topicId}`,
    {
      method: "GET",
      cache: "no-store",
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

export const deleteSubjectTopicItem = async ({
  params: { topicId },
  ...options
}: IServerSideOptions &
  IParamsSchema<{
    topicId: number | string;
  }>) => {
  return fetcher<IBaseDataRes<void>>(`subject-topics/topics/${topicId}`, {
    method: "DELETE",
    ...options,
  });
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

export const getTaskSubjectList = async ({
  params: { page, per_page, ...params },
  ...options
}: IServerSideOptions &
  IParamsSchema<
    IPaginationParams & {
      education_year?: IEducationYear["code"];
      semester?: ISemester["code"];
    }
  >) => {
  return fetcher<IBaseDataRes<ISubjectTaskStats>>(
    `subject-tasks/subjects?${getSearchParamString({ ...params, page: page || DEFAULT_PAGINATION.page, per_page: per_page || DEFAULT_PAGINATION.size })}`,
    {
      method: "GET",
      ...options,
    },
  );
};

export enum SubjectTaskOptions {
  TaskTypes = "task-types",
}

export const getSubjectTaskOptions = async ({
  params: { optionType },
  ...options
}: IServerSideOptions &
  IParamsSchema<{
    optionType: SubjectTaskOptions;
  }>) => {
  return fetcher<IBaseDataRes<Record<string, string>>>(
    `subject-tasks/options/${optionType}`,
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
      language?: ILanguage["code"];
      active?: boolean;
    } & IPaginationParams
  >) => {
  return fetcher<IBaseDataRes<ITeacherResource[]> & IBaseDataWithMeta>(
    `study-resources?${getSearchParamString(params)}`,
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
  return fetcher<IBaseDataRes<ITeacherResource>>(
    `study-resources/${params?.id}`,
    {
      method: "GET",
      ...options,
    },
  );
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

export const createResource = async ({
  body,
  ...options
}: IServerSideOptions & IBodySchema<ICreateResourceBody>) => {
  return fetcher<IBaseDataRes<ISubjectWithResources[]> & IBaseDataWithMeta>(
    `study-resources`,
    {
      method: "POST",
      body,
      ...options,
    },
  );
};

export const editResource = async ({
  body,
  params: { resourceId },
  ...options
}: IServerSideOptions &
  IBodySchema<ICreateResourceBody> &
  IParamsSchema<{ resourceId: number | string }>) => {
  return fetcher<IBaseDataRes<ISubjectWithResources[]> & IBaseDataWithMeta>(
    `study-resources/${resourceId}`,
    {
      method: "PUT",
      body,
      ...options,
    },
  );
};

export const getStudyResourceSubjectOptions = async ({
  ...options
}: IServerSideOptions) => {
  return fetcher<IBaseDataRes<IStudyResourceSubjectOptions>>(
    `study-resources/subjects/filter-options`,
    {
      method: "GET",
      ...options,
    },
  );
};

export const getStudyResourceOptions = async ({
  ...options
}: IServerSideOptions) => {
  return fetcher<IBaseDataRes<IStudyResourceOptions>>(
    `study-resources/filter-options`,
    {
      method: "GET",
      ...options,
    },
  );
};

export const getSubjectResources = async ({
  params: { page, per_page, ...params },
  ...options
}: IServerSideOptions &
  IParamsSchema<
    {
      education_type?: IEducationType["code"];
      education_year?: IEducationYear["code"];
      semester?: ISemester["code"];
      subject_id?: ISubject["id"];
    } & IPaginationParams
  >) => {
  return fetcher<IBaseDataRes<ISubjectResources[]> & IBaseDataWithMeta>(
    `subject-resources/subjects?${getSearchParamString({ ...params, page: page || DEFAULT_PAGINATION.page, per_page: per_page || DEFAULT_PAGINATION.size })}`,
    {
      method: "GET",
      ...options,
    },
  );
};

export const getResourcesWithSubjectId = async ({
  params: { subject_id, ...params },
  ...options
}: IServerSideOptions &
  IParamsSchema<{
    subject_id?: ISubject["id"] | string;
    type?: IResourceItem["resource_type"];
    topic_id?: ISubjectTopicItem["id"];
  }>) => {
  return fetcher<IBaseDataRes<ISubjectResourceDetails[]>>(
    `subjects/${subject_id}/resources?${getSearchParamString(params)}`,
    {
      method: "GET",
      ...options,
    },
  );
};

export const deleteResourceItem = async ({
  params: { resourceId },
  ...options
}: IServerSideOptions &
  IParamsSchema<{
    resourceId: number | string;
  }>) => {
  return fetcher<IBaseDataRes<void>>(`study-resources/${resourceId}`, {
    method: "DELETE",
    ...options,
  });
};
