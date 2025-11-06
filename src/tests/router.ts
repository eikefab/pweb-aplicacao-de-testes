import { Router } from "express";
import authMiddleware from "../users/auth/middleware";
import testController from "./controller";

const testRouter: Router = Router();

testRouter.use(authMiddleware);

testRouter.get("/", testController.fetch);
testRouter.post("/", testController.create);
testRouter.patch("/:id", testController.update);
testRouter.delete("/:id", testController.delete);

export default testRouter;
