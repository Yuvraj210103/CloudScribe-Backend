import { EventEmitterInstance } from "../config/event-emitter";
import { sendMail } from "../utils/sendMail";

export const signUpSubscriber = async (data) => {
  await sendMail({
    email: data?.email,
    subject: "Email verification",
    template: "emailverification.mails.ejs",
    data: {
      user: data.user,
      code: data?.code,
    },
  });
};

export const forgetPasswordSubscriber = async (data) => {
  await sendMail({
    email: data?.email,
    subject: "Password reset code",
    template: "passwordReset.mails.ejs",
    data: {
      user: data.user,
      code: data.code,
    },
  });
};
