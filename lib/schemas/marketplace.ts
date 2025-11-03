import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(3, 'Product name must be at least 3 characters long')
    .max(100, 'Product name cannot exceed 100 characters'),

  price: z.number({ message: 'Price must be a number' }).min(0.1, 'Price must be greater than 0'),

  stock: z.number({ message: 'Stock must be a number' }).min(0, 'Stock cannot be negative'),

  category: z.string().min(1, 'Please select a category'),

  description: z
    .string()
    .min(5, 'Description must be at least 5 characters long')
    .max(500, 'Description cannot exceed 500 characters'),
  images: z.array(z.any()).min(1, 'At least one image is required'),
  sizes: z.array(z.string()).min(1, 'At least one image is required'),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
