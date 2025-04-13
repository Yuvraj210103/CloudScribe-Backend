import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  isActive: boolean;
  OTPCode?: string;
  OTPCodeExpires?: number;
  passwordResetCode?: string;
}
