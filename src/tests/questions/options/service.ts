import { eq } from "drizzle-orm";
import { TestQuestionOptionNotFound } from "./exception";
import { UpdateTestQuestionOptionDTO } from "./schema";
import { db } from "../../..";
import { testQuestionsOptions } from "../../../db/schema";

async function createTestQuestionOption(
  testQuestionOption: typeof testQuestionsOptions.$inferInsert,
) {
  return db.insert(testQuestionsOptions).values(testQuestionOption).returning();
}

async function findTestQuestionOptionById(testQuestionOptionId: string) {
  const testQuestionOption = await db.query.testQuestionsOptions.findFirst({
    where: (testQuestionsOptions, { eq }) =>
      eq(testQuestionsOptions.id, testQuestionOptionId),
  });

  if (!testQuestionOption) {
    throw TestQuestionOptionNotFound;
  }

  return testQuestionOption;
}

async function updateTestQuestionOption(
  data: UpdateTestQuestionOptionDTO,
  testQuestionOptionId: string,
) {
  return db
    .update(testQuestionsOptions)
    .set(data)
    .where(eq(testQuestionsOptions.id, testQuestionOptionId))
    .returning();
}

async function fetchTestQuestionOptions(questionId: string) {
  return db.query.testQuestionsOptions.findMany({
    where: (testQuestionsOptions, { eq }) =>
      eq(testQuestionsOptions.testQuestionId, questionId),
  });
}

async function deleteTestQuestionOption(testQuestionOptionId: string) {
  return db
    .delete(testQuestionsOptions)
    .where(eq(testQuestionsOptions.id, testQuestionOptionId));
}

export {
  createTestQuestionOption,
  findTestQuestionOptionById,
  fetchTestQuestionOptions,
  deleteTestQuestionOption,
  updateTestQuestionOption,
};
