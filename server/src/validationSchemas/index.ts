import { z } from 'zod';

// eslint-disable-next-line import/prefer-default-export
export const newUserSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(
      /^[a-zA-Z0-9]+$/,
      'username must contain only alphanumeric characters'
    ),
  email: z.string().email(),
  password: z.string().min(8).max(40),
  bio: z.string().max(5000).default(''),
});
