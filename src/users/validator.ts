import z from "zod";

const registerSchema = z.object({
    email: z.email().nonoptional(),
    password: z.string().min(8).nonoptional(),
    name: z.string().min(2).nonoptional(),
});

const loginSchema = z.object({
    email: z.email().nonoptional(),
    password: z.string().min(8).nonoptional(),
});

const updateSchema = z.object({
    email: z.email().optional(),
    password: z.string().min(8).optional(),
    name: z.string().min(2).optional(),
});

type UpdateSchemaType = z.infer<typeof updateSchema>;

export { registerSchema, loginSchema, updateSchema };
export type { UpdateSchemaType };