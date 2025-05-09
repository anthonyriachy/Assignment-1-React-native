import { z } from 'zod';

export const SignupSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Invalid email address'),
  password: z.string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  phoneNumber: z.string().trim().min(1, 'Phone number is required'),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;