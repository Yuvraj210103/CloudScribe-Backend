import { model, Schema } from "mongoose";
import { IToken } from "../interfaces/token.interface";

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    expires: {
      type: Date,
      required: true,
      index: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export default model<IToken>("Token", tokenSchema);
