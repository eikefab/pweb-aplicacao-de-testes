import { Router } from "express";
import { authenticate, register } from "../controller";

const authRouter: Router = Router();

authRouter.post("/login", authenticate);
authRouter.post("/register", register);

export default authRouter;
