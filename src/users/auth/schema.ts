import { z } from "zod";

const registerSchema = z.object({
  email: z.email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
  name: z
    .string()
    .trim()
    .min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
});

const loginSchema = z.object({
  email: z.email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
});

type RegisterDTO = z.infer<typeof registerSchema>;
type LoginDTO = z.infer<typeof loginSchema>;

export { registerSchema, loginSchema };
export type { RegisterDTO, LoginDTO };
