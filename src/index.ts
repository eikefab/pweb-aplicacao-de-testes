import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import express, { json } from "express";
import cors from "cors";
import authRouter from "./users/auth/router";
import userRouter from "./users/router";
import errorMiddleware from "./error";
import helmet from "helmet";
import { schema } from "./db/schema";
import testRouter from "./tests/router";
import testQuestionRouter from "./tests/questions/router";

export const db = drizzle(process.env.DATABASE_URL!, { schema });
const server = express();

server.use(json());
server.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Vite default
  }),
);
server.use(
  helmet({
    hidePoweredBy: true,
  }),
);

server.use("/auth", authRouter);
server.use("/users", userRouter);
server.use("/tests", testRouter);
server.use("/questions", testQuestionRouter);

server.use(errorMiddleware);

server.listen(process.env.PORT ?? 3000, () => {
  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
});
