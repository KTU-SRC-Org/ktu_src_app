import { z } from 'zod';

export const CompleteProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters long')
    .max(50, 'Full name cannot exceed 50 characters')
    .regex(/^[A-Za-z\s]+$/, 'Full name must contain only letters and spaces'),

  program: z
    .string()
    .min(1, 'Please select your program of study'),

  indexNumber: z
    .string()
    .min(3, 'Index number must be at least 3 characters')
    .max(20, 'Index number cannot exceed 20 characters')
    .regex(/^[A-Za-z0-9/ -]+$/, 'Index number must contain only letters, numbers, or slashes'),

  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .regex(/^\+?\d+$/, 'Enter a valid phone number (only numbers, optional +)'),

  level: z
    .string()
    .min(1, 'Please select your level of study'),
});

export type CompleteProfileFormType = z.infer<typeof CompleteProfileSchema>;
