import type { Request, Response } from "express";
import {
  createTestQuestionOptionSchema,
  updateTestQuestionOptionSchema,
} from "./schema";
import {
  createTestQuestionOption,
  deleteTestQuestionOption,
  fetchTestQuestionOptions,
  updateTestQuestionOption,
} from "./service";

type TestQuestionOptionController = {
  create: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  fetch: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
};

const testQuestionOptionController: TestQuestionOptionController = {
  async create(req, res) {
    const data = await createTestQuestionOptionSchema.parseAsync(req.body);
    const result = await createTestQuestionOption(data);

    res.status(201).json(result);
  },
  async update(req, res) {
    const data = await updateTestQuestionOptionSchema.parseAsync(req.body);
    const result = await updateTestQuestionOption(data, req.params.id!);

    res.status(200).json(result);
  },
  async fetch(req, res) {
    const result = await fetchTestQuestionOptions();

    res.status(200).json(result);
  },
  async delete(req, res) {
    await deleteTestQuestionOption(req.params.id!);

    res.status(204).send();
  },
};

export default testQuestionOptionController;

export type { TestQuestionOptionController };
