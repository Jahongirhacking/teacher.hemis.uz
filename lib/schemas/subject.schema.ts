import { z } from "zod";

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
