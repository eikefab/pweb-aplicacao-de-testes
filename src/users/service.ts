import { eq } from "drizzle-orm";
import { users } from "../db/schema.js";
import { db } from "../index.js";
import bcrypt from "bcryptjs";
import type { UpdateSchemaType } from "./validator.js";

type LoginParams = {
    email: string;
    password: string;
}

async function registerUser(user: typeof users.$inferInsert) {
    const conflict = await db.select().from(users).where(eq(users.email, user.email)).limit(1);

    if (conflict.length) {
        throw new Error("conflict/user-exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return db.insert(users).values(user).returning();
}

async function login(data: LoginParams) {
    const [user] = await db.select().from(users).where(eq(users.email, data.email)).limit(1);

    if (!user) {
        throw new Error("not-found/user-not-found");
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);

    if (!passwordMatches) {
        throw new Error("unauthorized/invalid-credentials");
    }

    return user;
}

async function updateUser(data: UpdateSchemaType, userId: number) {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    return db.update(users).set(data).where(eq(users.id, userId)).returning();
}

async function fetchUsers() {
    return db.select().from(users);
}

async function fetchUserById(userId: number) {
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (!user) {
        throw new Error("not-found/user-not-found");
    }

    return user;
}

async function delUser(userId: number) {
    return db.delete(users).where(eq(users.id, userId));
}

export {
    registerUser,
    login,
    fetchUsers,
    delUser,
    fetchUserById,
    updateUser
}
