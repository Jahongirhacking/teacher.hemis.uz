import { IUploadedFile } from "@/lib/schemas/file.schema";
import { fetcher } from "../api";
import { IBaseDataRes, IBodySchema, IServerSideOptions } from "../type";

export const uploadFiles = async ({
  body,
  ...options
}: IServerSideOptions & IBodySchema<FormData>) => {
  return fetcher<IBaseDataRes<void>>(`files/upload-multiple`, {
    method: "POST",
    body,
    ...options,
    fromTeacherPath: false,
    withMetaHeader: false,
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
    fromTeacherPath: false,
    withMetaHeader: false,
  });
};
