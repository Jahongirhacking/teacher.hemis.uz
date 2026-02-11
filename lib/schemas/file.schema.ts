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
