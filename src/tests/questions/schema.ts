import z from "zod";

const createTestQuestionSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, { message: "Questão não pode estar vazia" })
    .max(1024, { message: "Questão deve ter no máximo 1024 caracteres" }),
});

const updateTestQuestionSchema = createTestQuestionSchema.partial();

type UpdateTestQuestionDTO = z.infer<typeof updateTestQuestionSchema>;

type CreateTestQuestionDTO = z.infer<typeof createTestQuestionSchema>;

export { createTestQuestionSchema, updateTestQuestionSchema };
export type { UpdateTestQuestionDTO, CreateTestQuestionDTO };
