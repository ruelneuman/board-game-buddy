import { z } from 'zod';
import User from '../models/user.model';

// eslint-disable-next-line import/prefer-default-export
export const newUserSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be 20 or less characters')
    .regex(
      /^[a-zA-Z0-9]+$/,
      'Username must contain only alphanumeric characters'
    )
    .refine(
      async (username) => {
        const user = await User.findOne({ username });
        return !user;
      },
      {
        message: 'Username is already taken',
      }
    ),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email()
    .refine(
      async (email) => {
        const user = await User.findOne({ email });
        return !user;
      },
      {
        message: 'Email is already taken',
      }
    ),
  password: z.string().min(8).max(40),
  bio: z.string().max(5000).default(''),
});
