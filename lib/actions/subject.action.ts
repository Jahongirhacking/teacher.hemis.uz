"use server";

import { handlePrivateRequest } from ".";
import {
  batchSubjectFilters,
  getSchedulesByDate,
  getSubjectInfo,
  getSubjectTasks,
  getSubjectTopic,
  getTeacherResources,
  getTeacherResourceWithId,
} from "../services/subject";

export const getSubjectTopicAction = async (
  props: Parameters<typeof getSubjectTopic>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getSubjectTopic({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const getSubjectInfoAction = async (
  props: Parameters<typeof getSubjectInfo>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getSubjectInfo({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const getSubjectTasksAction = async (
  props: Parameters<typeof getSubjectTasks>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getSubjectTasks({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const getSchedulesByDateAction = async (
  props: Parameters<typeof getSchedulesByDate>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getSchedulesByDate({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const batchSubjectFiltersAction = async (
  props: Parameters<typeof batchSubjectFilters>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      batchSubjectFilters({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const getTeacherResourcesAction = async (
  props: Parameters<typeof getTeacherResources>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getTeacherResources({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const getTeacherResourceWithIdAction = async (
  props: Parameters<typeof getTeacherResourceWithId>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getTeacherResourceWithId({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};
