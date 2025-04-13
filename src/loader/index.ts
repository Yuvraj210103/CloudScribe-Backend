import { validateEnv } from "../config/env.config";
import { EventEmitterInstance } from "../config/event-emitter";
import { connectToDb } from "../config/mongoose";
//imported forgotpasswordsubscriber
import {
  signUpSubscriber,
  forgetPasswordSubscriber,
} from "../subscriber/auth.subscriber";

export const bootstrap = async (app) => {
  validateEnv();
  await connectToDb();
  bootstrapExpress(app);
  console.log("Express app initiated.");

  EventEmitterInstance.on("signup", signUpSubscriber);
  EventEmitterInstance.on("forgot", forgetPasswordSubscriber);
};
