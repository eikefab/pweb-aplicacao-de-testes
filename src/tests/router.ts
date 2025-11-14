import { Router } from "express";
import authMiddleware from "../users/auth/middleware";
import testController from "./controller";
import testQuestionsRouter from "./questions/router";
import testAssigneeController from "./assignees/controller";

const testRouter: Router = Router();

testRouter.use(authMiddleware);

testRouter.get("/", testController.fetch);
testRouter.get("/assigned", testController.fetchTestsTo);
testRouter.post("/", testController.create);
testRouter.get("/:id", testController.find);
testRouter.patch("/:id", testController.update);
testRouter.delete("/:id", testController.delete);

testRouter.get("/:id/assignees", testAssigneeController.fetchAssignees);
testRouter.post("/:id/assign", testAssigneeController.create);
testRouter.delete("/:id/assignees/:assigneeId", testAssigneeController.delete);

testRouter.use("/:id/questions", testQuestionsRouter);

export default testRouter;
