import z from "zod";

const createTestSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(1024),
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .nonoptional(),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .nonoptional(),
});

const updateTestSchema = createTestSchema.partial();

type UpdateTestDTO = z.infer<typeof updateTestSchema>;
type CreateTestDTO = z.infer<typeof createTestSchema>;

export { createTestSchema, updateTestSchema };
export type { UpdateTestDTO, CreateTestDTO };
