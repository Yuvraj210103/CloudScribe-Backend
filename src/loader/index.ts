import { validateEnv } from "../config/env.config";
import { EventEmitterInstance } from "../config/event-emitter";
import { connectToDb } from "../config/mongoose";
import {
  signUpSubscriber,
  forgetPasswordSubscriber,
} from "../subscriber/auth.subscriber";

export const bootstrap = async () => {
  validateEnv();
  await connectToDb();
  console.log("Express app initiated.");

  EventEmitterInstance.on("signup", signUpSubscriber);
  EventEmitterInstance.on("forgot", forgetPasswordSubscriber);
};
