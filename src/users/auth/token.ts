import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function getToken(payload: unknown) {
  if (!SECRET) {
    throw new Error("server/missing-jwt-secret");
  }

  return jwt.sign(JSON.stringify(payload), SECRET);
}

export function verifyToken(token: string) {
  if (!SECRET) {
    throw new Error("server/missing-jwt-secret");
  }

  try {
    const payload = jwt.verify(token, SECRET);

    return payload as { id: string; email: string };
  } catch {
    return null;
  }
}
