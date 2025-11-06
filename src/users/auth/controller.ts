import type { Request, Response } from "express";
import { createUser, findUser } from "../service";
import { getToken } from "./token";
import { loginSchema, registerSchema } from "./schema";

async function register(request: Request, response: Response) {
  const data = await registerSchema.parseAsync(request.body);
  const [user] = await createUser(data);

  const token = getToken({
    id: user!.id,
    email: user!.email,
  });

  return response.status(200).json({
    user: {
      id: user!.id,
      email: user!.email,
      name: user!.name,
    },
    token,
  });
}

async function login(request: Request, response: Response) {
  const data = await loginSchema.parseAsync(request.body);
  const user = await findUser(data);

  const token = getToken({ id: user.id, email: user.email });

  return response.status(200).json({
    user,
    token,
  });
}

export { login, register };
