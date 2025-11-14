import z from "zod";

const createTestQuestionOptionSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Descrição da opção não pode estar vazia" })
    .max(512, {
      message: "Descrição da opção deve ter no máximo 512 caracteres",
    }),
  isCorrect: z.boolean({
    invalid_type_error:
      "Indicador de resposta correta deve ser verdadeiro ou falso",
  }),
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
