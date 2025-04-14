import { NextFunction, Request, Response } from "express";
import { UserDataType } from "../../middleware/authJWT.middleware";
import { findNotesByUserId } from "../../services/note.services";

export const fetchNotes = async (req: Request, res: Response) => {
  try {
    const user: UserDataType = (req as any).userData;

    const data = await findNotesByUserId(user.userId);

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
