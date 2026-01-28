"use server";

import { handlePrivateRequest } from ".";
import { getSubjectTopic } from "../services/subject";

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
