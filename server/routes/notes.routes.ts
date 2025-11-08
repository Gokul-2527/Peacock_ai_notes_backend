import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.js";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";

export const noteRoutes = new Hono();

noteRoutes.use("*", authMiddleware);

noteRoutes.get("/get", getNotes);
noteRoutes.post("/create", createNote);
noteRoutes.put("/update/:id", updateNote);
noteRoutes.delete("/delete/:id", deleteNote);

