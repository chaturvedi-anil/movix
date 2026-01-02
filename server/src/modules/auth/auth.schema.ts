import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .trim(),

  email: z.email("Invalid email address").toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(16, "Password must be at most 16 characters long"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address").toLowerCase(),

  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
