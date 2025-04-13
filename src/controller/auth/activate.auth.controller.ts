import { Request, Response } from "express";
import BadRequestError from "../../error/badRequest.error";
import { ErrorCode } from "../../error/custom.error";
import { findUser } from "../../services/user.services";
import { activateUserSchema } from "../../validation/auth.validation";
import { generateRandom6DigitString } from "../../utils/util";
import { EventEmitterInstance } from "../../config/event-emitter";

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
    if (user.OTPCode !== OTPCode) {
      throw new BadRequestError("Invalid OTP code", ErrorCode.BAD_REQUEST);
    }

    if (user.OTPCodeExpires < Date.now()) {
      const code = generateRandom6DigitString();
      const verificationExpires =
        parseInt(process.env.VERIFICATION_CODE_EXP ?? "30", 10) * 1000 * 60;
      user.OTPCode = code;
      user.OTPCodeExpires = Date.now() + verificationExpires;

      await user.save();

      EventEmitterInstance.emit("signup", { code, user: user.fullName, email });

      res.status(500).json({
        message: "OTP expired, please enter the new otp which sent now",
        success: false,
      });

      return;
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
