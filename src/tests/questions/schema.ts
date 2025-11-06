import z from "zod";

const createTestQuestionSchema = z.object({
  testId: z.uuid().nonoptional(),
  question: z.string().min(1).max(1024),
  createdBy: z.uuid().nonoptional(),
});

const updateTestQuestionSchema = createTestQuestionSchema
  .omit({ testId: true, createdBy: true })
  .partial();

type UpdateTestQuestionDTO = z.infer<typeof updateTestQuestionSchema>;

type CreateTestQuestionDTO = z.infer<typeof createTestQuestionSchema>;

export { createTestQuestionSchema, updateTestQuestionSchema };
export type { UpdateTestQuestionDTO, CreateTestQuestionDTO };
