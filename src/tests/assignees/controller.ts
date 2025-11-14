import type { Request, Response } from "express";
import {
  createTestAssignee,
  deleteTestAssignee,
  fetchTestAssignees,
  fetchTestAssigneesByTestId,
} from "./service";
import { createTestAssigneeSchema } from "./schema";

type TestAssigneeController = {
  create: (req: Request, res: Response) => Promise<void>;
  fetch: (req: Request, res: Response) => Promise<void>;
  fetchAssignees: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
};

const testAssigneeController: TestAssigneeController = {
  async create(req, res) {
    const data = await createTestAssigneeSchema.parseAsync(req.body);
    const result = await createTestAssignee({
      ...data,
      testId: req.params.id!,
    });

    res.status(201).json(result);
  },
  async fetch(req, res) {
    const result = await fetchTestAssignees();

    res.status(200).json(result);
  },
  async fetchAssignees(req, res) {
    const result = await fetchTestAssigneesByTestId(req.params.id!);

    res.status(200).json(result);
  },
  async delete(req, res) {
    await deleteTestAssignee(req.params.assigneeId!);

    res.status(204).send();
  },
};

export default testAssigneeController;

export type { TestAssigneeController };
