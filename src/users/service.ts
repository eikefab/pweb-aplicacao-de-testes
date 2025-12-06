import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import { db } from "../index";
import bcrypt from "bcryptjs";
import { UpdateUserDTO } from "./schema";
import {
  UserEmailConflict,
  UserNotFound,
  UserHasCreatedContent,
} from "./exception";

type LoginParams = {
  email: string;
  password: string;
};

async function createUser(user: typeof users.$inferInsert) {
  const conflict = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, user.email),
  });

  if (conflict) {
    throw UserEmailConflict;
  }

  user.password = await bcrypt.hash(user.password, 10);

  return db.insert(users).values(user).returning();
}

async function findUser(data: LoginParams) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, data.email),
  });

  if (!user) {
    throw UserNotFound;
  }

  const passwordMatches = await bcrypt.compare(data.password, user.password);

  if (!passwordMatches) {
    throw new Error("unauthorized/invalid-credentials");
  }

  return user;
}

async function findUserById(userId: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (!user) {
    throw UserNotFound;
  }

  return user;
}

async function updateUser(data: UpdateUserDTO, userId: string) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return db.update(users).set(data).where(eq(users.id, userId)).returning();
}

async function fetchUsers() {
  return db.query.users.findMany({
    columns: {
      password: false,
    },
  });
}

async function deleteUser(userId: string) {
  const createdTests = await db.query.tests.findFirst({
    where: (tests, { eq }) => eq(tests.createdBy, userId),
  });

  const createdQuestions = await db.query.testQuestions.findFirst({
    where: (testQuestions, { eq }) => eq(testQuestions.createdBy, userId),
  });

  if (createdTests || createdQuestions) {
    throw UserHasCreatedContent;
  }

  return db.delete(users).where(eq(users.id, userId));
}

export {
  createUser,
  findUser,
  findUserById,
  fetchUsers,
  deleteUser,
  updateUser,
};
