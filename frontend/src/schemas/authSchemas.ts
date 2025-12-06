import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z.object({
    firstname: z.string().min(2, "First name must be at least 2 characters long"),
    lastname: z.union([z.string().min(2, "Last name must be at least 2 characters long"), z.literal("")]).optional(),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
