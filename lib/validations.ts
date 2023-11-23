import { z } from "zod";

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, "Title of question must be atleast 5 characters")
    .max(130, "Title too long"),

  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
