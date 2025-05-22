import { z } from 'zod';

export const SignupSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, 'First Name is required')
    .max(50, 'First Name must be less than 50 characters'),
  lastName: z.string()
    .trim()
    .min(2, 'Last Name is required')
    .max(50, 'Last Name must be less than 50 characters'),
  email: z.string()
    .trim()
    .email('Invalid email address')
    .min(1, 'Email is required')
    .max(100, 'Email must be less than 100 characters'),
  
  password: z.string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;