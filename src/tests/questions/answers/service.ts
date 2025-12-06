import { eq } from "drizzle-orm";
import { TestQuestionAnswerNotFound } from "./exception";
import { UpdateTestQuestionAnswerDTO } from "./schema";
import { db } from "../../..";
import { testQuestionsAnswers } from "../../../db/schema";

async function createTestQuestionAnswer(
  testQuestionAnswer: typeof testQuestionsAnswers.$inferInsert,
) {
  return db.insert(testQuestionsAnswers).values(testQuestionAnswer).returning();
}

async function findTestQuestionAnswerById(testQuestionAnswerId: string) {
  const testQuestionAnswer = await db.query.testQuestionsAnswers.findFirst({
    where: (testQuestionsAnswers, { eq }) =>
      eq(testQuestionsAnswers.id, testQuestionAnswerId),
  });

  if (!testQuestionAnswer) {
    throw TestQuestionAnswerNotFound;
  }

  return testQuestionAnswer;
}

async function updateTestQuestionAnswer(
  data: UpdateTestQuestionAnswerDTO,
  testQuestionAnswerId: string,
) {
  return db
    .update(testQuestionsAnswers)
    .set(data)
    .where(eq(testQuestionsAnswers.id, testQuestionAnswerId))
    .returning();
}

async function fetchTestQuestionAnswers(questionId: string) {
  return db.query.testQuestionsAnswers.findMany({
    where: (testQuestionsAnswers, { eq }) =>
      eq(testQuestionsAnswers.testQuestionId, questionId),
  });
}

async function deleteTestQuestionAnswer(testQuestionAnswerId: string) {
  return db
    .delete(testQuestionsAnswers)
    .where(eq(testQuestionsAnswers.id, testQuestionAnswerId));
}

export {
  createTestQuestionAnswer,
  findTestQuestionAnswerById,
  fetchTestQuestionAnswers,
  deleteTestQuestionAnswer,
  updateTestQuestionAnswer,
};
