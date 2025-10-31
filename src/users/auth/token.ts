import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = "1h";

export function getToken(payload: unknown) {
    if (!SECRET) {
        throw new Error("server/missing-jwt-secret");
    }

    return jwt.sign(
        JSON.stringify(payload),
        SECRET,
    );
}

export function verifyToken(token: string) {
    if (!SECRET) {
        throw new Error("server/missing-jwt-secret");
    }

    try {
        const payload = jwt.verify(token, SECRET);

        // TODO: tipar corretamente
        return payload as { id: number; email: string };
    } catch {
        return null;
    }
}

