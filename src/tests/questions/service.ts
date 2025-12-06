import { eq } from "drizzle-orm";
import { db } from "../..";
import { testQuestions } from "../../db/schema";
import { TestQuestionNotFound } from "./exception";
import { UpdateTestQuestionDTO } from "./schema";

async function createTestQuestion(
  testQuestion: typeof testQuestions.$inferInsert,
) {
  return db.insert(testQuestions).values(testQuestion).returning();
}

async function findTestQuestionById(testQuestionId: string) {
  const testQuestion = await db.query.testQuestions.findFirst({
    where: (testQuestions, { eq }) => eq(testQuestions.id, testQuestionId),
  });

  if (!testQuestion) {
    throw TestQuestionNotFound;
  }

  return testQuestion;
}

async function updateTestQuestion(
  data: UpdateTestQuestionDTO,
  testQuestionId: string,
) {
  return db
    .update(testQuestions)
    .set(data)
    .where(eq(testQuestions.id, testQuestionId))
    .returning();
}

async function fetchTestQuestions(testId: string) {
  return db.query.testQuestions.findMany({
    where: (testQuestions, { eq }) => eq(testQuestions.testId, testId),
    with: {
      options: true,
      answers: true,
    },
  });
}

async function deleteTestQuestion(testQuestionId: string) {
  return db.delete(testQuestions).where(eq(testQuestions.id, testQuestionId));
}

export {
  createTestQuestion,
  findTestQuestionById,
  fetchTestQuestions,
  deleteTestQuestion,
  updateTestQuestion,
};
