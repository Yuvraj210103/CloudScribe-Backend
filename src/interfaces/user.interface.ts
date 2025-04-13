import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  OTPCode?: string;
  OTPCodeExpires?: number;
  passwordResetCode?: string;
}
