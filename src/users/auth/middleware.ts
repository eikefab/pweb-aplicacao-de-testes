import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "./token";
import { findUserById } from "../service";
import { AppError } from "../../error";

export default async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;

  if (!token) {
    throw new Error("unauthorized/missing-token");
  }

  const user = verifyToken(token.replace("Bearer ", ""));

  if (!user) {
    throw new AppError({
      message: "Unauthorized",
      statusCode: 401,
      errorSlug: "unauthorized/bearer-token-missing-or-invalid",
    });
  }

  try {
    const result = await findUserById(user.id);

    req.user = result;

    next();
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError({
        message: "Unauthorized",
        statusCode: 401,
        errorSlug: "unauthorized/user-not-found",
      });
    }
  }
}
