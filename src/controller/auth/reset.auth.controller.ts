import { Request, Response } from "express";
import { resetPasswordSchema } from "../../validation/auth.validation";
import { findUserByEmail } from "../../services/user.services";
import BadRequestError from "../../error/badRequest.error";
import { ErrorCode } from "../../error/custom.error";
import bcrypt from "bcryptjs";

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const result = await resetPasswordSchema.safeParseAsync(req.body);

    if (!result.success) {
      throw new Error((result.error as unknown as string) || "Invalid");
    }

    const { email, password, passwordResetCode } = result.data.body;

    const user = await findUserByEmail(email);
    if (
      !user ||
      !user.passwordResetCode ||
      user.passwordResetCode !== passwordResetCode ||
      user.OTPCodeExpires < Date.now()
    ) {
      throw new BadRequestError(
        "Could not reset user password",
        ErrorCode.BAD_REQUEST
      );
    }

    // Generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user's password and clear password reset code
    user.password = hashedPassword;
    user.passwordResetCode = null;
    await user.save();

    res
      .status(200)
      .json({ message: "Password updated successfully", success: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
