"use server";

import { revalidatePath } from "next/cache";
import { handlePrivateRequest } from ".";
import paths from "../paths";
import {
  batchSubjectFilters,
  createResource,
  createSubjectTopic,
  deleteResourceItem,
  deleteSubjectTopicItem,
  editResource,
  editSubjectTopic,
  getResourcesWithSubjectId,
  getSchedulesByDate,
  getSchedulesByRange,
  getStudentTaskSubmissionDetail,
  getStudyResourceOptions,
  getStudyResourceSubjectOptions,
  getSubjectFilterByType,
  getSubjectInfo,
  getSubjectResources,
  getSubjectsWithResources,
  getSubjectTaskOptions,
  getSubjectTasks,
  getSubjectTopic,
  getSubjectTopicItem,
  getSubjectTopicWithId,
  getTaskAssessmentList,
  getTaskSubjectList,
  getTaskSubmissions,
  getTeacherResources,
  getTeacherResourceWithId,
  gradeTaskSubmission,
} from "../services/subject";

// Subject Topic

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

export const getSubjectTopicWithIdAction = async (
  props: Parameters<typeof getSubjectTopicWithId>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getSubjectTopicWithId({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const createSubjectTopicAction = async (
  props: Parameters<typeof createSubjectTopic>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      createSubjectTopic({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getSubjectTopicItemAction = async (
  props: Parameters<typeof getSubjectTopicItem>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getSubjectTopicItem({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const editSubjectTopicAction = async (
  props: Parameters<typeof editSubjectTopic>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      editSubjectTopic({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const deleteSubjectTopicItemAction = async (
  props: Parameters<typeof deleteSubjectTopicItem>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      deleteSubjectTopicItem({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Subject Info

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

// Subject Tasks

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

export const getTaskSubjectListAction = async (
  props: Parameters<typeof getTaskSubjectList>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getTaskSubjectList({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const getSubjectTaskOptionsAction = async (
  props: Parameters<typeof getSubjectTaskOptions>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getSubjectTaskOptions({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const getTaskAssessmentListAction = async (
  props: Parameters<typeof getTaskAssessmentList>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getTaskAssessmentList({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const getTaskSubmissionsAction = async (
  props: Parameters<typeof getTaskSubmissions>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getTaskSubmissions({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const getStudentTaskSubmissionDetailAction = async (
  props: Parameters<typeof getStudentTaskSubmissionDetail>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getStudentTaskSubmissionDetail({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const gradeTaskSubmissionAction = async (
  props: Parameters<typeof gradeTaskSubmission>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      gradeTaskSubmission({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

// Schedules

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

export const getSchedulesByRangeAction = async (
  props: Parameters<typeof getSchedulesByRange>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getSchedulesByRange({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

// Filters

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

export const getSubjectFilterByTypeAction = async (
  props: Parameters<typeof getSubjectFilterByType>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getSubjectFilterByType({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

// Resources

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

export const getSubjectsWithResourcesAction = async (
  props: Parameters<typeof getSubjectsWithResources>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getSubjectsWithResources({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const createResourceAction = async (
  props: Parameters<typeof createResource>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      createResource({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const editResourceAction = async (
  props: Parameters<typeof editResource>[0],
) => {
  try {
    const res = await handlePrivateRequest((serverProps) =>
      editResource({ ...serverProps, ...props }),
    );
    if (res?.success) {
      revalidatePath(`${paths.private.subjects.subjectResources}`, "layout");
    }
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getStudyResourceOptionsAction = async (
  props: Parameters<typeof getStudyResourceOptions>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getStudyResourceOptions({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const getStudyResourceSubjectOptionsAction = async (
  props: Parameters<typeof getStudyResourceSubjectOptions>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getStudyResourceSubjectOptions({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const getSubjectResourcesAction = async (
  props: Parameters<typeof getSubjectResources>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getSubjectResources({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const getResourcesWithSubjectIdAction = async (
  props: Parameters<typeof getResourcesWithSubjectId>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      getResourcesWithSubjectId({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const deleteResourceItemAction = async (
  props: Parameters<typeof deleteResourceItem>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      deleteResourceItem({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
    return err;
  }
};
