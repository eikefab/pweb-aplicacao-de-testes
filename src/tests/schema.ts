import z from "zod";

const createTestSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Título não pode estar vazio" })
    .max(255, { message: "Título deve ter no máximo 255 caracteres" }),
  description: z
    .string()
    .min(1, { message: "Descrição não pode estar vazia" })
    .max(1024, { message: "Descrição deve ter no máximo 1024 caracteres" }),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Formato de data inválido para data de início",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Formato de data inválido para data de término",
  }),
});

const updateTestSchema = createTestSchema.partial();

type UpdateTestDTO = z.infer<typeof updateTestSchema>;
type CreateTestDTO = z.infer<typeof createTestSchema>;

export { createTestSchema, updateTestSchema };
export type { UpdateTestDTO, CreateTestDTO };
