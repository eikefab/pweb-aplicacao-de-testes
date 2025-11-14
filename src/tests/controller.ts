import type { Request, Response } from "express";
import { createTestSchema, updateTestSchema } from "./schema";
import {
  createTest,
  deleteTest,
  fetchTests,
  findTest,
  updateTest,
} from "./service";

type TestController = {
  create: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  fetch: (req: Request, res: Response) => Promise<void>;
  find: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
};

const testController: TestController = {
  async create(req, res) {
    const data = await createTestSchema.parseAsync(req.body);
    const result = await createTest({
      ...data,
      createdBy: req.user!.id,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });

    res.status(201).json(result);
  },
  async update(req, res) {
    const data = await updateTestSchema.parseAsync(req.body);
    const result = await updateTest(data, req.params.id!);

    res.status(200).json(result);
  },
  async fetch(req, res) {
    const result = await fetchTests();

    res.status(200).json(result);
  },
  async find(req, res) {
    const result = await findTest(req.params.id!);

    res.status(200).json(result);
  },
  async delete(req, res) {
    await deleteTest(req.params.id!);

    res.status(204).send();
  },
};

export default testController;

export type { TestController };
