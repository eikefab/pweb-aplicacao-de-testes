import z from "zod";

const createTestAssigneeSchema = z.object({
  userId: z.uuid().nonoptional(),
});

type CreateTestAssigneeDTO = z.infer<typeof createTestAssigneeSchema>;

export { createTestAssigneeSchema };
export type { CreateTestAssigneeDTO };
