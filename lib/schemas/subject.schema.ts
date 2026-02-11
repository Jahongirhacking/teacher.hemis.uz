import { z } from "zod";
import { uploadedFileSchema } from "./file.schema";

export const createTopicSchema = z.object({
  name: z.string(),
  _training_type: z.string(),
  topic_load: z.number(),
  active: z.boolean().optional(),
  _translations: z
    .object({
      name_uz: z.string(),
      name_ru: z.string(),
      name_en: z.string(),
    })
    .optional(),
});

export type ICreateTopicBody = z.infer<typeof createTopicSchema>;

// resources
export const createResourceSchema = z.object({
  title: z.string(),
  comment: z.string(),
  subject_id: z.number(),
  language: z.array(z.string()),
  files: z.array(uploadedFileSchema).optional(),
  active: z.boolean().optional(),
});

export type ICreateResourceBody = z.infer<typeof createResourceSchema>;
