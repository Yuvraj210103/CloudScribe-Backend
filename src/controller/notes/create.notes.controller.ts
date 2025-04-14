import { NextFunction, Request, Response } from "express";
import { UserDataType } from "../../middleware/authJWT.middleware";
import { createNoteSchema } from "../../validation/note.validation";
import { createNote } from "../../services/note.services";
import mongoose, { Schema } from "mongoose";

export const createNotes = async (req: Request, res: Response) => {
  try {
    const user: UserDataType = (req as any).userData;

    const result = await createNoteSchema.safeParseAsync(req.body);

    if (!result.success) {
      throw new Error((result.error as unknown as string) || "Invalid");
    }

    const { title, content, images, tag } = result.data.body;

    const noteCreateRes = await createNote({
      title,
      content,
      images,
      tag,
      userId: new mongoose.Types.ObjectId(user.userId),
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: noteCreateRes,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
