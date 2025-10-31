import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import express, { json } from "express";
import authRouter from "./users/auth/router.js";
import userRouter from "./users/router.js";
import errorMiddleware from "./error.js";

export const db = drizzle(process.env.DATABASE_URL!);
const server = express();

server.use(json());

server.use("/auth", authRouter);
server.use("/users", userRouter);

server.use(errorMiddleware);

server.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
});