import { Request, Response } from "express";
import { deleteNoteById } from "../../services/note.services";
import BadRequestError from "../../error/badRequest.error";
import { ErrorCode } from "../../error/custom.error";

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;

    if (!noteId) {
      throw new BadRequestError(
        "Please provide note id",
        ErrorCode.BAD_REQUEST
      );
    }

    const data = await deleteNoteById(noteId);

    res
      .status(201)
      .json({ success: true, message: "Note deleted successfully", data });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
