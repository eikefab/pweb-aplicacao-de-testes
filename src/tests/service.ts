import { eq } from "drizzle-orm";
import { tests } from "../db/schema";
import { db } from "../index";
import { TestInvalidDateRange, TestNotFound } from "./exception";
import { UpdateTestDTO } from "./schema";

async function createTest(test: typeof tests.$inferInsert) {
  if (test.startDate > test.endDate) {
    throw TestInvalidDateRange;
  }

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
  const start = data.startDate ? new Date(data.startDate) : undefined;
  const end = data.endDate ? new Date(data.endDate) : undefined;

  if (start) {
    if (end) {
      if (start > end) {
        throw TestInvalidDateRange;
      }
    }

    const existingTest = await findTestById(testId);

    if (existingTest.endDate < start) {
      throw TestInvalidDateRange;
    }
  }

  return db
    .update(tests)
    .set({
      ...data,
      startDate: start,
      endDate: end,
    })
    .where(eq(tests.id, testId))
    .returning();
}

async function fetchTests() {
  return db.query.tests.findMany();
}

async function findTest(testId: string) {
  const result = await db.query.tests.findFirst({
    columns: {
      createdBy: false,
    },
    where: (tests, { eq }) => eq(tests.id, testId),
    with: {
      questions: {
        with: {
          options: true,
        },
      },
      assignees: true,
      results: true,
      creator: {
        columns: {
          password: false,
        },
      },
    },
  });

  if (!result) {
    throw TestNotFound;
  }

  return result;
}

async function deleteTest(testId: string) {
  return db.delete(tests).where(eq(tests.id, testId));
}

export {
  createTest,
  findTestById,
  fetchTests,
  deleteTest,
  updateTest,
  findTest,
};
