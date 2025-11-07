import { Router } from "express";
import testAssigneeController from "./controller";
import authMiddleware from "../../users/auth/middleware";

const testAssigneesRouter: Router = Router({ mergeParams: true });

testAssigneesRouter.use(authMiddleware);

testAssigneesRouter.get("/", testAssigneeController.fetch);
testAssigneesRouter.post("/", testAssigneeController.create);
testAssigneesRouter.delete("/:assigneeId", testAssigneeController.delete);

export default testAssigneesRouter;
