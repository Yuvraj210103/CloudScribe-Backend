import { Request, Response } from "express";
import { registerUserSchema } from "../../validation/auth.validation";
import { createUser, findUserByEmail } from "../../services/user.services";
import BadRequestError from "../../error/badRequest.error";
import { ErrorCode } from "../../error/custom.error";
import bcrypt from "bcryptjs";
import { generateRandom6DigitString } from "../../utils/util";
import { EventEmitterInstance } from "../../config/event-emitter";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await registerUserSchema.safeParseAsync(req.body);

    if (!result.success) {
      throw new Error((result.error as unknown as string) || "Invalid");
    }

    const { email, password, fullName } = result.data.body;

    const code = generateRandom6DigitString();
    const verificationExpires =
      parseInt(process.env.VERIFICATION_CODE_EXP ?? "30", 10) * 1000 * 60;

    const userExist = await findUserByEmail(email);
    if (userExist) {
      if (userExist.isActive) {
        throw new BadRequestError(
          "User already exists with this email",
          ErrorCode.ALREADY_EXST
        );
      } else {
        userExist.OTPCode = code;
        userExist.OTPCodeExpires = Date.now() + verificationExpires;

        await userExist.save();
        EventEmitterInstance.emit("signup", { code, user: fullName, email });

        res
          .status(201)
          .json({ success: true, message: "Verification email sent" });
        return;
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await createUser({
      fullName,
      email,
      password: hashedPassword,
      OTPCode: code,
      OTPCodeExpires: Date.now() + verificationExpires,
    });

    EventEmitterInstance.emit("signup", { code, user: fullName, email });

    res.status(201).json({ success: true, message: "Verification email sent" });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
