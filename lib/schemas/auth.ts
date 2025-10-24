import { z } from 'zod';

export const OTPSchema = z.object({
  otpCode: z
    .string()
    .min(4, 'Code must be 4 digits')
    .max(6, 'Code cannot exceed 6 digits')
    .regex(/^\d+$/, 'Code must contain only numbers'),
});

export const SignupSchema = z.object({
  email: z.email(),
  password: z.string().min(8, {error: 'Password must be at least 8 characters'}),
  confirmPassword: z.string().min(8, { message: "Minimum 8 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const SigninSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type OTPFormType = z.infer<typeof OTPSchema>;
export type SignupFormType = z.infer<typeof SignupSchema>;
export type SigninFormType = z.infer<typeof SigninSchema>;