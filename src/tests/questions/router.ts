import { Router } from "express";
import testQuestionController from "./controller";
import authMiddleware from "../../users/auth/middleware";
import testQuestionOptionRouter from "./options/router";
import testQuestionAnswerRouter from "./answers/router";

const testQuestionRouter: Router = Router({ mergeParams: true });

testQuestionRouter.use(authMiddleware);

testQuestionRouter.get("/", testQuestionController.fetch);
testQuestionRouter.post("/", testQuestionController.create);
testQuestionRouter.patch("/:questionId", testQuestionController.update);
testQuestionRouter.delete("/:questionId", testQuestionController.delete);

testQuestionRouter.use("/:questionId/options", testQuestionOptionRouter);
testQuestionRouter.use("/:questionId/answers", testQuestionAnswerRouter);

export default testQuestionRouter;
