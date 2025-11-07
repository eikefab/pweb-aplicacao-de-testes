import z from "zod";

const createTestQuestionOptionSchema = z.object({
  description: z.string().min(1).max(512),
  isCorrect: z.boolean().nonoptional(),
});

const updateTestQuestionOptionSchema = createTestQuestionOptionSchema.partial();

type UpdateTestQuestionOptionDTO = z.infer<
  typeof updateTestQuestionOptionSchema
>;

type CreateTestQuestionOptionDTO = z.infer<
  typeof createTestQuestionOptionSchema
>;

export { createTestQuestionOptionSchema, updateTestQuestionOptionSchema };
export type { UpdateTestQuestionOptionDTO, CreateTestQuestionOptionDTO };
