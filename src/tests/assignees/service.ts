import { eq } from "drizzle-orm";
import { db } from "../..";
import { testAssignees } from "../../db/schema";
import { TestAssigneeNotFound } from "./exception";

async function createTestAssignee(
  testAssignee: typeof testAssignees.$inferInsert,
) {
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

async function deleteTestAssignee(testAssigneeId: string) {
  return db.delete(testAssignees).where(eq(testAssignees.id, testAssigneeId));
}

export {
  createTestAssignee,
  findTestAssigneeById,
  fetchTestAssignees,
  deleteTestAssignee,
};
