import z from "zod";

const createTestAssigneeSchema = z.object({
  userId: z.uuid({ message: "ID do usuário inválido" }),
});

type CreateTestAssigneeDTO = z.infer<typeof createTestAssigneeSchema>;

export { createTestAssigneeSchema };
export type { CreateTestAssigneeDTO };
