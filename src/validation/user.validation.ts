import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    fullName: z.string({
      required_error: "First name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
