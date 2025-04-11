import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  images: z.array(z.string()).default([]).optional(),
  tag: z.string().optional(),
  userId: z.string({ required_error: "User ID is required" }),
});
