import { Router } from "express";
import authMiddleware from "../../../users/auth/middleware";
import testQuestionOptionController from "./controller";

const testQuestionOptionRouter: Router = Router();

testQuestionOptionRouter.use(authMiddleware);

testQuestionOptionRouter.get("/", testQuestionOptionController.fetch);
testQuestionOptionRouter.post("/", testQuestionOptionController.create);
testQuestionOptionRouter.patch("/:id", testQuestionOptionController.update);
testQuestionOptionRouter.delete("/:id", testQuestionOptionController.delete);

export default testQuestionOptionRouter;
