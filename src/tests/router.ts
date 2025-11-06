import { Router } from "express";
import authMiddleware from "../users/auth/middleware";
import testController from "./controller";
import testQuestionsRouter from "./questions/router";
import testAssigneesRouter from "./assignees/router";

const testRouter: Router = Router();

testRouter.use(authMiddleware);

testRouter.get("/", testController.fetch);
testRouter.post("/", testController.create);
testRouter.patch("/:id", testController.update);
testRouter.delete("/:id", testController.delete);

testRouter.use("/:id/questions", testQuestionsRouter);
testRouter.use("/:id/assignees", testAssigneesRouter);

export default testRouter;
