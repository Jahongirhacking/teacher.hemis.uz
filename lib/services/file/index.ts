import { fetcher } from "../api";
import { IBaseDataRes, IBodySchema, IServerSideOptions } from "../type";
import { IUploadedFile } from "./type";

export const uploadFiles = async ({
  body,
  ...options
}: IServerSideOptions & IBodySchema<FormData>) => {
  return fetcher<IBaseDataRes<void>>(`files/upload-multiple`, {
    method: "POST",
    body,
    ...options,
    fromTeacherPath: false,
  });
};

export const uploadFile = async ({
  body,
  ...options
}: IServerSideOptions & IBodySchema<FormData>) => {
  return fetcher<IBaseDataRes<IUploadedFile>>(`files/upload`, {
    method: "POST",
    body,
    ...options,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    fromTeacherPath: false,
  });
};
