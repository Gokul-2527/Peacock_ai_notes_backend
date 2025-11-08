import { Context } from "hono";
import Note from "../models/note.model.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// --- AI Summary ---
export const generateSummary = async (c: Context) => {
  try {
    const noteId = c.req.param("noteId");
    if (!noteId) return c.json({ error: "Note ID missing" }, 400);

    const note = await Note.findById(noteId);
    if (!note) return c.json({ error: "Note not found" }, 404);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize this note clearly and briefly." },
        { role: "user", content: note.content },
      ],
    });

    const summary = response.choices[0].message?.content ?? "No summary generated.";
    note.aiSummary = summary;
    await note.save();

    return c.json({ success: true, summary });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to generate summary" }, 500);
  }
};

// --- AI Improve ---
export const improveNote = async (c: Context) => {
  try {
    const noteId = c.req.param("noteId");
    if (!noteId) return c.json({ error: "Note ID missing" }, 400);

    const note = await Note.findById(noteId);
    if (!note) return c.json({ error: "Note not found" }, 404);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Improve clarity and grammar of the following text while keeping the same meaning.",
        },
        { role: "user", content: note.content },
      ],
    });

    const improved = response.choices[0].message?.content ?? note.content;
    note.aiImprovedContent = improved;
    await note.save();

    return c.json({ success: true, improved });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to improve note" }, 500);
  }
};

// --- AI Tags ---
export const generateTags = async (c: Context) => {
  try {
    const noteId = c.req.param("noteId");
    if (!noteId) return c.json({ error: "Note ID missing" }, 400);

    const note = await Note.findById(noteId);
    if (!note) return c.json({ error: "Note not found" }, 404);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Generate 3–5 short, relevant tags for this note. Return them as a comma-separated list.",
        },
        { role: "user", content: note.content },
      ],
    });

    const rawTags = response.choices[0].message?.content ?? "";
    const tags = rawTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    note.tags = tags;
    await note.save();

    return c.json({ success: true, tags });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to generate tags" }, 500);
  }
};
