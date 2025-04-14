import { Request, Response } from "express";
import { ErrorCode } from "../../error/custom.error";
import { findUserById } from "../../services/user.services";
import { UserDataType } from "../../middleware/authJWT.middleware";
import UnAuthenticatedError from "../../error/UnAuthenticatedError";

export const fetchAuthUser = async (req: Request, res: Response) => {
  try {
    const user: UserDataType = (req as any).userData;

    if (!user) {
      throw new UnAuthenticatedError(
        "Please authenticate",
        ErrorCode.UNAUTHENTICATED_USER
      );
    }

    const authUser = await findUserById(user.userId);

    const data = { fullName: authUser.fullName, email: authUser.email };

    res.status(201).json({
      success: true,
      message: "User fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
