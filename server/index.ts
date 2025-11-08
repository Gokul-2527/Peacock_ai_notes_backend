import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { authRoutes } from "./routes/auth.routes.js";
import { noteRoutes } from "./routes/notes.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import aiRoutes from "./routes/ai.route.js";
dotenv.config();
await connectDB();

const app = new Hono();
app.use("*", cors());

app.get("/ping", (c) => c.text("pong"));

app.route("/", authRoutes);
app.route("/notes", noteRoutes);
app.route("/user", userRoutes);
app.route("/api/ai", aiRoutes);

const port = Number(process.env.PORT) || 4000;
serve({ fetch: app.fetch, port });
console.log(`Server running on http://localhost:${port}`);
