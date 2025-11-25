import { z } from 'zod';

export const EditPhoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .regex(/^\+?\d+$/, 'Enter a valid phone number (only numbers, optional +)'),

});


export const ChangePasswordSchema = z.object({
  oldPass: z.string().min(8, "Password must be at least 8 characters"),
  newPass: z.string().min(8, "Password must be at least 8 characters"),
  confirmPass: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPass === data.confirmPass, {
  message: "Passwords do not match",
  path: ["confirmPass"],
});


export type ChangePasswordFormType = z.infer<typeof ChangePasswordSchema>;
export type EditPhoneNumberFormType = z.infer<typeof EditPhoneNumberSchema>;
