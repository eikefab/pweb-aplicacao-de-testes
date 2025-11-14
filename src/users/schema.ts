import z from "zod";

const createUserSchema = z.object({
  email: z.email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
  name: z.string().min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
});

const updateUserSchema = createUserSchema.partial();

type UpdateUserDTO = z.infer<typeof updateUserSchema>;
type CreateUserDTO = z.infer<typeof createUserSchema>;

export { createUserSchema, updateUserSchema };
export type { UpdateUserDTO, CreateUserDTO };
