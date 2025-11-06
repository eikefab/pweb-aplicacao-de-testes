import type { Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "./schema";
import { createUser, deleteUser, fetchUsers, updateUser } from "./service";

type UserController = {
  create: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  fetch: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
};

const userController: UserController = {
  async create(req, res) {
    const data = await createUserSchema.parseAsync(req.body);
    const result = await createUser(data);

    res.status(201).json(result);
  },
  async update(req, res) {
    const data = await updateUserSchema.parseAsync(req.body);
    const result = await updateUser(data, req.user!.id);

    res.status(200).json(result);
  },
  async fetch(req, res) {
    const result = await fetchUsers();

    res.status(200).json(result);
  },
  async delete(req, res) {
    await deleteUser(req.user!.id);

    res.status(204).send();
  },
};

export default userController;

export type { UserController };
