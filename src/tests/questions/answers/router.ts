import { Router } from "express";
import authMiddleware from "../../../users/auth/middleware";
import testQuestionAnswerController from "./controller";

const testQuestionAnswerRouter: Router = Router({ mergeParams: true });

testQuestionAnswerRouter.use(authMiddleware);

testQuestionAnswerRouter.get("/", testQuestionAnswerController.fetch);
testQuestionAnswerRouter.post("/", testQuestionAnswerController.create);
testQuestionAnswerRouter.patch(
  "/:answerId",
  testQuestionAnswerController.update,
);
testQuestionAnswerRouter.delete(
  "/:answerId",
  testQuestionAnswerController.delete,
);

export default testQuestionAnswerRouter;
