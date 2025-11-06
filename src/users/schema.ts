import z from "zod";

const createUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    name: z.string().min(2),
});

const updateUserSchema = createUserSchema.partial();

type UpdateUserDTO = z.infer<typeof updateUserSchema>;
type CreateUserDTO = z.infer<typeof createUserSchema>;

export { createUserSchema, updateUserSchema };
export type { UpdateUserDTO, CreateUserDTO };