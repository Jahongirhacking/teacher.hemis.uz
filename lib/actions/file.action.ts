"use server";

import { handlePrivateRequest } from ".";
import { uploadFile, uploadFiles } from "../services/file";

export const uploadFilesAction = async (
  props: Parameters<typeof uploadFiles>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      uploadFiles({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};

export const uploadFileAction = async (
  props: Parameters<typeof uploadFile>[0],
) => {
  try {
    return handlePrivateRequest((serverProps) =>
      uploadFile({ ...serverProps, ...props }),
    );
  } catch (err) {
    console.error(err);
  }
};
