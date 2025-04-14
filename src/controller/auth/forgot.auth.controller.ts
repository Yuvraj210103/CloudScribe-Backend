import { Request, Response } from "express";
import { forgotPasswordSchema } from "../../validation/auth.validation";
import { findUserByEmail } from "../../services/user.services";
import NotFoundError from "../../error/notFound.error";
import { ErrorCode } from "../../error/custom.error";
import BadRequestError from "../../error/badRequest.error";
import { generateRandom6DigitString } from "../../utils/util";
import { EventEmitterInstance } from "../../config/event-emitter";

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const result = await forgotPasswordSchema.safeParseAsync(req.body);

    if (!result.success) {
      throw new Error((result.error as unknown as string) || "Invalid");
    }

    const { email } = result.data.body;

    const user = await findUserByEmail(email);
    if (!user) {
      throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
    }

    if (!user.isActive) {
      throw new BadRequestError(
        "Please verify your email first",
        ErrorCode.BAD_REQUEST
      );
    }

    const code = generateRandom6DigitString();
    const verificationExpires =
      parseInt(process.env.VERIFICATION_CODE_EXP ?? "30") * 1000 * 60;

    user.passwordResetCode = code;
    user.OTPCodeExpires = Date.now() + verificationExpires;
    await user.save();

    EventEmitterInstance.emit("forgot", {
      code,
      user: user.fullName,
      email: user.email,
    });

    res.status(201).json({
      message:
        "If a user with that email is registered, you will receive a password reset email",
      email,
      success: true,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
