import { Request, Response } from "express";
import { findNoteById, findNotesByUserId } from "../../services/note.services";

export const fetchSingleNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;

    const data = await findNoteById(noteId);

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
