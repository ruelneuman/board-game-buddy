import { z } from 'zod';
import User from '../models/user.model';

const usersQueryEnum = z.enum(['username', 'createdAt'] as const);

export const getUsersQuery = z.object({
  limit: z
    .preprocess(
      (limit) => parseInt(limit as string, 10),
      z
        .number({
          required_error: 'Limit is required',
          invalid_type_error: 'Limit must be a number',
        })
        .int('Limit must be an integer')
        .min(0, 'Minimum limit is 0')
        .max(100, 'Maximum limit is 100')
    )
    .default(30),
  offset: z
    .preprocess(
      (offset) => parseInt(offset as string, 10),
      z
        .number({
          required_error: 'Offset is required',
          invalid_type_error: 'Offset must be a number',
        })
        .int('Offset must be an integer')
        .min(0, 'Minimum offset is 0')
    )
    .default(0),
  sort: usersQueryEnum.default(usersQueryEnum.enum.username),
});

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
