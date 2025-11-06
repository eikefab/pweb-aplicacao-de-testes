import { z } from "zod";

const registerSchema = z.object({
  email: z.email().nonoptional(),
  password: z.string().min(8).nonoptional(),
  name: z.string().min(2).nonoptional(),
});

const loginSchema = z.object({
  email: z.email().nonoptional(),
  password: z.string().min(8).nonoptional(),
});

type RegisterDTO = z.infer<typeof registerSchema>;
type LoginDTO = z.infer<typeof loginSchema>;

export { registerSchema, loginSchema };
export type { RegisterDTO, LoginDTO };
