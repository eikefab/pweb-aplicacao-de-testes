import { Router } from "express";
import authMiddleware from "../../../users/auth/middleware";
import testQuestionOptionController from "./controller";

const testQuestionOptionRouter: Router = Router({ mergeParams: true });

testQuestionOptionRouter.use(authMiddleware);

testQuestionOptionRouter.get("/", testQuestionOptionController.fetch);
testQuestionOptionRouter.post("/", testQuestionOptionController.create);
testQuestionOptionRouter.patch(
  "/:optionId",
  testQuestionOptionController.update,
);
testQuestionOptionRouter.delete(
  "/:optionId",
  testQuestionOptionController.delete,
);

export default testQuestionOptionRouter;
