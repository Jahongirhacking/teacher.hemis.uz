"use server";

import { handlePrivateRequest } from ".";
import { getSubjectInfo, getSubjectTopic } from "../services/subject";

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
