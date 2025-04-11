import { Document, Schema } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  images: string[];
  tag?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: Schema.Types.ObjectId;
}
