import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  content: string;
  tags?: string[];
  aiSummary?: string;
  aiImprovedContent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    aiSummary: { type: String },
    aiImprovedContent: { type: String },
  },
  { timestamps: true }
);

const Note = mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
export default Note;
