import { eq } from "drizzle-orm";
import { tests } from "../db/schema";
import { db } from "../index";
import { TestNotFound } from "./exception";
import { UpdateTestDTO } from "./schema";

async function createTest(test: typeof tests.$inferInsert) {
  return db.insert(tests).values(test).returning();
}

async function findTestById(testId: string) {
  const test = await db.query.tests.findFirst({
    where: (tests, { eq }) => eq(tests.id, testId),
  });

  if (!test) {
    throw TestNotFound;
  }

  return test;
}

async function updateTest(data: UpdateTestDTO, testId: string) {
  return db
    .update(tests)
    .set({
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    })
    .where(eq(tests.id, testId))
    .returning();
}

async function fetchTests() {
  return db.query.tests.findMany();
}

async function deleteTest(testId: string) {
  return db.delete(tests).where(eq(tests.id, testId));
}

export { createTest, findTestById, fetchTests, deleteTest, updateTest };
