import { EventEmitterInstance } from "../config/event-emitter";
import { sendMail } from "../utils/sendMail";

export const signUpSubscriber = async (data) => {
  await sendMail({
    email: data?.email,
    subject: "Email verification",
    template: "emailverification.mails.ejs",
    data: {
      user: data.name,
      code: data?.code,
    },
  });
};

EventEmitterInstance.on("signup", signUpSubscriber);
