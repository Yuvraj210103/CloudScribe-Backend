import { Request, Response } from "express";
import BadRequestError from "../../error/badRequest.error";
import { ErrorCode } from "../../error/custom.error";
import { findUser } from "../../services/user.services";
import { activateUserSchema } from "../../validation/auth.validation";

export const activateUser = async (req: Request, res: Response) => {
  try {
    const result = await activateUserSchema.safeParseAsync(req.body);

    if (!result.success) {
      throw new Error((result.error as unknown as string) || "Invalid");
    }

    const { email, OTPCode } = result.data.body;

    const user = await findUser(
      { email },
      { select: "+password +OTPCode +OTPCodeExpires" }
    );

    if (!user) {
      throw new BadRequestError("User does not exist", ErrorCode.BAD_REQUEST);
    }

    if (user.isActive) {
      throw new BadRequestError(
        "User has already been verified",
        ErrorCode.BAD_REQUEST
      );
    }
    // Validate OTP code
    if (user.OTPCode !== OTPCode || user.OTPCodeExpires < Date.now()) {
      throw new BadRequestError(
        "Invalid or expired OTP code",
        ErrorCode.BAD_REQUEST
      );
    }

    user.OTPCode = "";
    user.OTPCodeExpires = 0;
    user.isActive = true;

    await user.save();

    res.status(201).json({ message: "Verified successfully", success: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
