import { z } from 'zod';

export const SignupSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  
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
  phoneNumber: z.string()
    .trim()
    .min(1, 'Phone number is required')
    
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;