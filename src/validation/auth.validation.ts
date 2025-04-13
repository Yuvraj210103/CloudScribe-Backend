import { object, string, TypeOf, date } from "zod";
export const registerUserSchema = object({
  body: object({
    fullName: string({ required_error: "Should have name" })
      .min(1, { message: "name should have at least 1 character" })
      .max(20, { message: "First name should have at most 20 characters" }),
    email: string({ required_error: "Should have email" }).email({
      message: "Invalid email address",
    }),
    password: string({ required_error: "Should have password" }).min(6, {
      message: "Password should have at least 6 characters",
    }),
    confirmPassword: string({
      required_error: "Should have confirm password",
    }).min(6, { message: "confirmPassword should have at least 6 characters" }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
});
export type registerUserInput = TypeOf<typeof registerUserSchema>["body"];

export const activateUserSchema = object({
  body: object({
    email: string({ required_error: "Should have email" }).email({
      message: "Invalid email address",
    }),
    OTPCode: string({ required_error: "OTP should be provided" }),
  }),
});

export type activateUserInput = TypeOf<typeof activateUserSchema>["body"];
