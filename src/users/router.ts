import { Router } from "express";
import authMiddleware from "./auth/middleware";
import userController from "./controller";

const userRouter: Router = Router();

userRouter.use(authMiddleware);

userRouter.get("/", userController.fetch);
userRouter.patch("/", userController.update);
userRouter.delete("/:id", userController.delete);

export default userRouter;