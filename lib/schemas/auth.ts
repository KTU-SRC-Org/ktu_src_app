import { z } from 'zod';

export const OTPSchema = z.object({
  otpCode: z
    .string()
    .min(4, 'Code must be 4 digits')
    .max(6, 'Code cannot exceed 6 digits')
    .regex(/^\d+$/, 'Code must contain only numbers'),
});

export type OTPFormType = z.infer<typeof OTPSchema>;
