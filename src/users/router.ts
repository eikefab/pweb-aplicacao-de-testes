import { Router } from "express";
import authMiddleware from "./auth/middleware";
import { deleteUser, getUsers, updateUserByToken } from "./controller";

const userRouter: Router = Router();

userRouter.use(authMiddleware);

userRouter.get("/", getUsers);
userRouter.patch("/", updateUserByToken);
userRouter.delete("/:id", deleteUser);

export default userRouter;