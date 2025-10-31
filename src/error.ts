import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export default function errorMiddleware(err: Error, request: Request, response: Response, next: NextFunction) {
    if (response.headersSent) {
        return;
    }

    if (!err) {
        return next();
    }

    if (err instanceof ZodError) {
        return response.status(400).json({
            error: "bad-request/validation-failed",
            details: err.issues,
        });
    }

    return response.status(500).json({
        status: "WIP",
        error: err.message,
    });
}