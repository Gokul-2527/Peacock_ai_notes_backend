import { Context, Next } from "hono";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) return c.json({ message: "No token provided" }, 401);

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    c.set("user", decoded);

    await next();
  } catch (error) {
    console.error("Auth error:", error);
    return c.json({ message: "Invalid token" }, 403);
  }
};
