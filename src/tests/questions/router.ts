import { Router } from "express";
import testQuestionController from "./controller";
import authMiddleware from "../../users/auth/middleware";
import testQuestionOptionRouter from "./options/router";

const testQuestionRouter: Router = Router();

testQuestionRouter.use(authMiddleware);

testQuestionRouter.get("/", testQuestionController.fetch);
testQuestionRouter.post("/", testQuestionController.create);
testQuestionRouter.patch("/:id", testQuestionController.update);
testQuestionRouter.delete("/:id", testQuestionController.delete);

testQuestionRouter.use("/:questionId/options", testQuestionOptionRouter);

export default testQuestionRouter;
