import { Request, Response } from "express";
import { createNoteSchema } from "../../validation/note.validation";
import { updateNoteById } from "../../services/note.services";
import BadRequestError from "../../error/badRequest.error";
import { ErrorCode } from "../../error/custom.error";

export const updateNotes = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;

    if (!noteId) {
      throw new BadRequestError(
        "Please provide note id",
        ErrorCode.BAD_REQUEST
      );
    }

    const result = await createNoteSchema.safeParseAsync(req.body);

    if (!result.success) {
      throw new Error((result.error as unknown as string) || "Invalid");
    }

    const { title, content, images, tag } = result.data.body;

    console.log(noteId, "noteId");

    const noteCreateRes = await updateNoteById(noteId, {
      title,
      content,
      images,
      tag,
    });

    res.status(201).json({
      success: true,
      message: "Note updated successfully",
      data: noteCreateRes,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
