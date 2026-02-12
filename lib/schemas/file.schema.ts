import z from "zod";

export const uploadedFileSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  url: z.string(),
  original_name: z.string(),
  mime_type: z.string(),
  extension: z.string(),
  size: z.number(),
  human_size: z.string(),
  type: z.string(),
  type_name: z.string(),
  created_at: z.string(), // agar ISO date bo‘lsa pastda yaxshiroq variant bor
});
export type IUploadedFile = z.infer<typeof uploadedFileSchema>;

export enum FileStatus {
  New = "new",
  Submitted = "submitted",
}

export const clientFileSchema = uploadedFileSchema.transform((data) => ({
  url: data?.url,
  name: data?.original_name,
  size: data?.size,
  file_type: data?.type,
  type: data?.mime_type,
  status: FileStatus.New,
}));
export type IClientFile = z.infer<typeof clientFileSchema>;

export const submitFileSchema = z.object({
  url: z.string(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  file_type: z.string(),
});
export type ISubmitFile = z.infer<typeof submitFileSchema>;
