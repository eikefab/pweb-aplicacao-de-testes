import type { Request, Response } from "express";
import { createTestQuestionSchema, updateTestQuestionSchema } from "./schema";
import {
  createTestQuestion,
  deleteTestQuestion,
  fetchTestQuestions,
  updateTestQuestion,
} from "./service";

type TestQuestionController = {
  create: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  fetch: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
};

const testQuestionController: TestQuestionController = {
  async create(req, res) {
    const data = await createTestQuestionSchema.parseAsync(req.body);
    const result = await createTestQuestion({
      ...data,
      testId: req.params.id!,
      createdBy: req.user!.id,
    });

    res.status(201).json(result);
  },
  async update(req, res) {
    const data = await updateTestQuestionSchema.parseAsync(req.body);
    const result = await updateTestQuestion(data, req.params.questionId!);

    res.status(200).json(result);
  },
  async fetch(req, res) {
    const result = await fetchTestQuestions(req.params.id!);

    res.status(200).json(result);
  },
  async delete(req, res) {
    await deleteTestQuestion(req.params.questionId!);

    res.status(204).send();
  },
};

export default testQuestionController;

export type { TestQuestionController };
