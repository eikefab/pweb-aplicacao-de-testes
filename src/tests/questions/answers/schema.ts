import z from "zod";

const createTestQuestionAnswerSchema = z.object({
  testQuestionOptionId: z.uuid(),
});

const updateTestQuestionAnswerSchema = createTestQuestionAnswerSchema.partial();

type UpdateTestQuestionAnswerDTO = z.infer<
  typeof updateTestQuestionAnswerSchema
>;

type CreateTestQuestionAnswerDTO = z.infer<
  typeof createTestQuestionAnswerSchema
>;

export { createTestQuestionAnswerSchema, updateTestQuestionAnswerSchema };
export type { UpdateTestQuestionAnswerDTO, CreateTestQuestionAnswerDTO };
