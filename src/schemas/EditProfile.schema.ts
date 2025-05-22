import { z } from 'zod';

export const EditProfileSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, 'First Name is required')
    .max(50, 'First Name must be less than 50 characters'),
  lastName: z.string()
    .trim()
    .min(2, 'Last Name is required')
    .max(50, 'Last Name must be less than 50 characters'),
  profileImage: z.object({
    url: z.string(),
  }).optional(),
});

export type EditProfileSchemaType = z.infer<typeof EditProfileSchema>;