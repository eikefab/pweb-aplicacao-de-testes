import z from "zod";

const createTestAssigneeSchema = z.object({
  testId: z.uuid().nonoptional(),
  userId: z.uuid().nonoptional(),
});

type CreateTestAssigneeDTO = z.infer<typeof createTestAssigneeSchema>;

export { createTestAssigneeSchema };
export type { CreateTestAssigneeDTO };
