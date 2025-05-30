import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),

  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email format" }),

  password: z
    .string()
    .nonempty({ message: "Passsword is required" })
    .min(3, { message: "Password must be at least 3 characters long " }),
});
