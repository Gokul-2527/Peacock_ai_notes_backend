import { Context } from "hono";
import Note from "../models/note.model.js";

export const getNotes = async (c: Context) => {
  try {
    const user = c.get("user"); 
    if (!user?.id) return c.json({ error: "Unauthorized" }, 401);

    const notes = await Note.find({ user: user.id }).sort({ createdAt: -1 });
    return c.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return c.json({ error: "Failed to fetch notes" }, 500);
  }
};

export const createNote = async (c: Context) => {
  try {
    const { title, content } = await c.req.json();
    const user = c.get("user"); 
    if (!user?.id) return c.json({ error: "Unauthorized" }, 401);

    const note = await Note.create({ title, content, user: user.id });
    return c.json(note, 201);
  } catch (error) {
    console.error("Error creating note:", error);
    return c.json({ error: "Failed to create note" }, 500);
  }
};

export const updateNote = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const { title, content } = await c.req.json();
    const user = c.get("user"); 

    const note = await Note.findOneAndUpdate(
      { _id: id, user: user.id },
      { title, content },
      { new: true }
    );

    if (!note) return c.json({ error: "Note not found or unauthorized" }, 404);

    return c.json(note);
  } catch (error) {
    console.error("Error updating note:", error);
    return c.json({ error: "Failed to update note" }, 500);
  }
};

export const deleteNote = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const user = c.get("user"); 

    const note = await Note.findOneAndDelete({ _id: id, user: user.id });
    if (!note) return c.json({ error: "Note not found or unauthorized" }, 404);

    return c.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return c.json({ error: "Failed to delete note" }, 500);
  }
};
