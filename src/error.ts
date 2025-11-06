import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

type AppErrorConstructorParams = {
    message: string;
    statusCode: number;
    errorSlug: string;
}

export class AppError extends Error {
    readonly statusCode: number;
    readonly errorSlug: string;

    constructor({ message, statusCode, errorSlug }: AppErrorConstructorParams) {
        super(message);

        this.statusCode = statusCode;
        this.errorSlug = errorSlug;
    }
}

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

    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            error: err.errorSlug,
            details: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({ error: "internal-server-error/unhandled-exception",});
}