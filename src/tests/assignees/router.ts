import { Router } from "express";
import testAssigneeController from "./controller";
import authMiddleware from "../../users/auth/middleware";

const testAssigneesRouter: Router = Router();

testAssigneesRouter.use(authMiddleware);

testAssigneesRouter.get("/", testAssigneeController.fetch);
testAssigneesRouter.post("/", testAssigneeController.create);
testAssigneesRouter.delete("/:id", testAssigneeController.delete);

export default testAssigneesRouter;
