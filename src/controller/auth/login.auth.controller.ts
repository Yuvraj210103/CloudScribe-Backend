import { Request, Response } from "express";
import { loginUserSchema } from "../../validation/auth.validation";
import { findUser } from "../../services/user.services";
import ForbiddenError from "../../error/forbidden.error";
import { ErrorCode } from "../../error/custom.error";
import BadRequestError from "../../error/badRequest.error";
import { validateEnv } from "../../config/env.config";
import bcrypt from "bcryptjs";
import { signJwt } from "../../utils/jwt";
import TokenModel from "../../models/token.model";

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUserSchema.safeParseAsync(req.body);

    if (!result.success) {
      throw new Error((result.error as unknown as string) || "Invalid");
    }

    const { email, password } = result.data.body;

    const user = await findUser({ email }, { select: "+password", lean: true });
    if (!user) {
      throw new ForbiddenError("User does not exist", ErrorCode.FORBIDDEN);
    }
    if (!user.isActive) {
      throw new BadRequestError(
        "Please verify your email first",
        ErrorCode.BAD_REQUEST
      );
    }
    // Define a function to get the secret key based on the role
    const secretKey = validateEnv()?.jwtConfig.accessSecret;

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ForbiddenError("Invalid credentials", ErrorCode.FORBIDDEN);
    }
    const accessToken = signJwt({ userId: user._id }, secretKey as string, {
      expiresIn: "3d",
    });
    await TokenModel.create({
      token: accessToken,
      userId: user._id,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    // Remove sensitive data from user object (//!not from the database)
    delete user.password;

    // Send response with user data and access token
    res.status(200).json({
      success: true,
      user: user,
      message: "Logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
