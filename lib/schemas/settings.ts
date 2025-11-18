import { z } from 'zod';

export const EditPhoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .regex(/^\+?\d+$/, 'Enter a valid phone number (only numbers, optional +)'),

});

export type EditPhoneNumberFormType = z.infer<typeof EditPhoneNumberSchema>;
