import { Hono } from "hono";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

export const authRoutes = new Hono();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
