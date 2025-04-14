import { NextFunction, Request, Response } from "express";
import { UserDataType } from "../../middleware/authJWT.middleware";
import { findNotesByUserId } from "../../services/note.services";
import UnAuthenticatedError from "../../error/UnAuthenticatedError";
import { ErrorCode } from "../../error/custom.error";

export const fetchNotes = async (req: Request, res: Response) => {
  try {
    const user: UserDataType = (req as any).userData;

    if (!user) {
      throw new UnAuthenticatedError(
        "Please authenticate",
        ErrorCode.UNAUTHENTICATED_USER
      );
    }

    const data = await findNotesByUserId(user.userId);

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
