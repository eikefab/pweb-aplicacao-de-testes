import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const tests = pgTable("tests", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 1024 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.id),
});

export const testQuestions = pgTable("tests_questions", {
  id: uuid().primaryKey().defaultRandom(),
  testId: uuid("test_id")
    .notNull()
    .references(() => tests.id),
  question: varchar("question", { length: 1024 }).notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.id),
});

export const testQuestionsOptions = pgTable("tests_questions_options", {
  id: uuid().primaryKey().defaultRandom(),
  testQuestionId: uuid("test_question_id")
    .notNull()
    .references(() => testQuestions.id, { onDelete: "cascade" }),
  description: varchar("description", { length: 512 }).notNull(),
  isCorrect: boolean("is_correct").notNull().default(false),
});

export const testResult = pgTable("test_results", {
  id: uuid().primaryKey().defaultRandom(),
  testId: uuid("test_id")
    .notNull()
    .references(() => tests.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  score: numeric("score").notNull(),
});

export const testAssignees = pgTable("test_assignees", {
  id: uuid().primaryKey().defaultRandom(),
  testId: uuid("test_id")
    .notNull()
    .references(() => tests.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
});

export const usersRelations = relations(users, ({ many }) => ({
  createdTests: many(tests),
  assignedTests: many(testAssignees),
  testResults: many(testResult),
}));

export const testsRelations = relations(tests, ({ one, many }) => ({
  creator: one(users, {
    fields: [tests.createdBy],
    references: [users.id],
  }),
  questions: many(testQuestions),
  assignees: many(testAssignees),
  results: many(testResult),
}));

export const testQuestionsRelations = relations(
  testQuestions,
  ({ one, many }) => ({
    test: one(tests, {
      fields: [testQuestions.testId],
      references: [tests.id],
    }),
    creator: one(users, {
      fields: [testQuestions.createdBy],
      references: [users.id],
    }),
    options: many(testQuestionsOptions),
  }),
);

export const testQuestionsOptionsRelations = relations(
  testQuestionsOptions,
  ({ one }) => ({
    question: one(testQuestions, {
      fields: [testQuestionsOptions.testQuestionId],
      references: [testQuestions.id],
    }),
  }),
);

export const testAssigneesRelations = relations(testAssignees, ({ one }) => ({
  test: one(tests, {
    fields: [testAssignees.testId],
    references: [tests.id],
  }),
  user: one(users, {
    fields: [testAssignees.userId],
    references: [users.id],
  }),
}));

export const testResultRelations = relations(testResult, ({ one }) => ({
  test: one(tests, {
    fields: [testResult.testId],
    references: [tests.id],
  }),
  user: one(users, {
    fields: [testResult.userId],
    references: [users.id],
  }),
}));

export const schema = {
  users,
  tests,
  testQuestions,
  testQuestionsOptions,
  testAssignees,
  testResult,
  testAssigneesRelations,
  testResultRelations,
  testQuestionsOptionsRelations,
  testQuestionsRelations,
  testsRelations,
  usersRelations,
};
