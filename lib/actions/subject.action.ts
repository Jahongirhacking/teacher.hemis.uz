"use server";

import { handlePrivateRequest } from ".";
import { getSubjectTopic } from "../services/subject";

export const getSubjectTopicAction = async () => {
  try {
    return handlePrivateRequest((props) =>
      getSubjectTopic({ ...props, params: { page: 1, per_page: 15 } }),
    );
  } catch (err) {
    console.error(err);
  }
};
