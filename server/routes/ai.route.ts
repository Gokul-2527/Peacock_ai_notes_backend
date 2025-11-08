import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.js";
import {
  generateSummary,
  improveNote,
  generateTags,
} from "../controllers/ai.controller.js";

export const aiRoutes = new Hono();

aiRoutes.use("*", authMiddleware);

aiRoutes.post("/summary/:noteId", generateSummary);
aiRoutes.post("/improve/:noteId", improveNote);
aiRoutes.post("/tags/:noteId", generateTags);

export default aiRoutes;
