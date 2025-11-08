import { Hono } from "hono";
import { getUserProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.js";

export const userRoutes = new Hono();

userRoutes.use("*", authMiddleware);
userRoutes.get("/profile", getUserProfile);
