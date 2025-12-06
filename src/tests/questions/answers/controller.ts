import type { Request, Response } from "express";
import {
  createTestQuestionAnswerSchema,
  updateTestQuestionAnswerSchema,
} from "./schema";
import {
  createTestQuestionAnswer,
  deleteTestQuestionAnswer,
  fetchTestQuestionAnswers,
  updateTestQuestionAnswer,
} from "./service";

type TestQuestionAnswerController = {
  create: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  fetch: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
};

const testQuestionAnswerController: TestQuestionAnswerController = {
  async create(req, res) {
    const data = await createTestQuestionAnswerSchema.parseAsync(req.body);
    const result = await createTestQuestionAnswer({
      ...data,
      testQuestionId: req.params.questionId!,
      userId: req.user!.id,
    });

    res.status(201).json(result);
  },
  async update(req, res) {
    const data = await updateTestQuestionAnswerSchema.parseAsync(req.body);
    const result = await updateTestQuestionAnswer(data, req.params.answerId!);

    res.status(200).json(result);
  },
  async fetch(req, res) {
    const result = await fetchTestQuestionAnswers(req.params.questionId!);

    res.status(200).json(result);
  },
  async delete(req, res) {
    await deleteTestQuestionAnswer(req.params.answerId!);

    res.status(204).send();
  },
};

export default testQuestionAnswerController;

export type { TestQuestionAnswerController };
