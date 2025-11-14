import z from "zod";

const createTestQuestionSchema = z.object({
  testId: z.uuid({ message: "ID do teste inválido" }),
  question: z
    .string()
    .min(1, { message: "Questão não pode estar vazia" })
    .max(1024, { message: "Questão deve ter no máximo 1024 caracteres" }),
  createdBy: z.uuid({ message: "ID do criador inválido" }),
});

const updateTestQuestionSchema = createTestQuestionSchema
  .omit({ testId: true, createdBy: true })
  .partial();

type UpdateTestQuestionDTO = z.infer<typeof updateTestQuestionSchema>;

type CreateTestQuestionDTO = z.infer<typeof createTestQuestionSchema>;

export { createTestQuestionSchema, updateTestQuestionSchema };
export type { UpdateTestQuestionDTO, CreateTestQuestionDTO };
