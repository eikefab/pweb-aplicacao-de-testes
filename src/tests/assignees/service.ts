import { eq } from "drizzle-orm";
import { db } from "../..";
import { testAssignees } from "../../db/schema";
import { TestAssigneeAlreadyExists, TestAssigneeNotFound } from "./exception";

async function createTestAssignee(
  testAssignee: typeof testAssignees.$inferInsert,
) {
  const conflictTestAssignee = await db.query.testAssignees.findFirst({
    where: (testAssignees, { eq }) =>
      eq(testAssignees.userId, testAssignee.userId) &&
      eq(testAssignees.testId, testAssignee.testId),
  });

  if (conflictTestAssignee) {
    throw TestAssigneeAlreadyExists;
  }

  return db.insert(testAssignees).values(testAssignee).returning();
}

async function findTestAssigneeById(testAssigneeId: string) {
  const testAssignee = await db.query.testAssignees.findFirst({
    where: (testAssignees, { eq }) => eq(testAssignees.id, testAssigneeId),
  });

  if (!testAssignee) {
    throw TestAssigneeNotFound;
  }

  return testAssignee;
}

async function fetchTestAssignees() {
  return db.query.testAssignees.findMany();
}

async function fetchTestAssigneesByTestId(testId: string) {
  return db.query.testAssignees.findMany({
    where: (testAssignees, { eq }) => eq(testAssignees.testId, testId),
    with: {
      user: {
        columns: {
          password: false,
        },
      },
    },
  });
}

async function deleteTestAssignee(testAssigneeId: string) {
  return db.delete(testAssignees).where(eq(testAssignees.id, testAssigneeId));
}

export {
  createTestAssignee,
  findTestAssigneeById,
  fetchTestAssignees,
  fetchTestAssigneesByTestId,
  deleteTestAssignee,
};
