import { NextFunction, Request, Response } from "express";
import {
  registerUserInput,
  registerUserSchema,
} from "../../validation/auth.validation";
import { createUser, findUserByEmail } from "../../services/user.services";
import BadRequestError from "../../error/badRequest.error";
import { ErrorCode } from "../../error/custom.error";
import bcrypt from "bcryptjs";
import { generateRandom6DigitString } from "../../utils/util";
import { sendMail } from "../../utils/sendMail";
import validateSchema from "../../middleware/validateSchema.middleware";

export const registerUser = async (
  req: Request<object, object, registerUserInput>,
  res: Response
) => {
  try {
    validateSchema(registerUserSchema);
    const { email, password } = req.body;

    const userExist = await findUserByEmail(email);
    if (userExist) {
      throw new BadRequestError(
        "User already exists with this email",
        ErrorCode.ALREADY_EXST
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const code = generateRandom6DigitString();
    const verificationExpires =
      parseInt(process.env.VERIFICATION_CODE_EXP ?? "30", 10) * 1000 * 60;

    await createUser({
      ...req.body,
      password: hashedPassword,
      OTPCode: code,
      OTPCodeExpires: Date.now() + verificationExpires,
    });

    await sendMail({
      email: email,
      subject: "Email verification",
      template: "emailVerification.mails.ejs",
      data: {
        user: req.body.fullName,
        code,
      },
    });

    //res.status(201).json({ success: true, message: "Verification email sent" });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
