import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Do not include password in queries by default
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    OTPCode: {
      type: String,
      select: false,
    },
    OTPCodeExpires: {
      type: Number,
      select: false,
    },
    passwordResetCode: {
      type: String,
      select: true,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
