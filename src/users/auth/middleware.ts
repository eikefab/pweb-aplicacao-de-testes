import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "./token";
import { fetchUserById } from "../service";

export default async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        throw new Error("unauthorized/missing-token");
    }

    const user = verifyToken(token.replace("Bearer ", ""));

    if (!user) {
        throw new Error("unauthorized/invalid-token");
    }

    const record = await fetchUserById(user.id);

    if (!record) {
        throw new Error("unauthorized/user-not-found");
    }

    req.user = record;

    next();
}
