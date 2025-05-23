import { Request, Response } from "express";
import { findNoteById } from "../../services/note.services";
import BadRequestError from "../../error/badRequest.error";
import { ErrorCode } from "../../error/custom.error";

export const fetchSingleNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;

    if (!noteId) {
      throw new BadRequestError(
        "Please provide note id",
        ErrorCode.BAD_REQUEST
      );
    }

    const data = await findNoteById(noteId);

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
