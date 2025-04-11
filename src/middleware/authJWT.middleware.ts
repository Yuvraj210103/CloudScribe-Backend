import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validateEnv } from "../config/env.config";
import { extractTokenFromHeader } from "../utils/util";
import UnAuthenticatedError from "../error/UnAuthenticatedError";
import { ErrorCode } from "../error/custom.error";
import ForbiddenError from "../error/forbidden.error";
import { findUserById } from "../services/user.services";
import NotFoundError from "../error/notFound.error";

export interface UserDataType {
  userId: string;
}

export interface IUserMessage<TParams = any, TQuery = any, TBody = any>
  extends Request<TParams, TQuery, TBody> {
  userData: UserDataType;
}

export const authJWT = (
  req: IUserMessage,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtConfig = validateEnv()?.jwtConfig;
    const token = extractTokenFromHeader(req);
    if (!token)
      throw new UnAuthenticatedError(
        "Provide token",
        ErrorCode.TOKEN_NOT_FOUND
      );

    jwt.verify(
      token,
      jwtConfig.accessSecret,
      async (err: Error, decoded: any) => {
        if (err) {
          return next(
            new ForbiddenError("Token expires", ErrorCode?.TOKEN_EXPIRE)
          );
        }
        const decodedData = decoded as UserDataType;
        const user = await findUserById(decodedData.userId);

        if (!user)
          throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
        req.userData = {
          userId: decodedData?.userId,
        };
        next();
      }
    );
  } catch (error) {
    throw new UnAuthenticatedError("Provide token", ErrorCode.TOKEN_NOT_FOUND);
  }
};
