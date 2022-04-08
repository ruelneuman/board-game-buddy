import { z } from 'zod';
import User from '../models/user.model';

const usersSortEnum = z.enum(['username', 'createdAt'] as const);
const orderEnum = z.enum(['asc', 'desc'] as const);

export const usersPaginationQuerySchema = z.object({
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
  sort: usersSortEnum.default(usersSortEnum.enum.username),
  order: orderEnum.default(orderEnum.enum.desc),
});

export const idParamSchema = z.string({
  required_error: 'userId paramater is required',
  invalid_type_error: 'userId parameter must be a string',
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
        path: ['username'],
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
        path: ['email'],
      }
    ),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must be 40 or less characters'),
  bio: z
    .string({
      required_error: 'Bio is required',
      invalid_type_error: 'Bio must be a string',
    })
    .max(5000, 'Bio must be 5000 or less characters')
    .optional(),
});

export const usernameSchema = newUserSchema.pick({ username: true });

export const emailSchema = newUserSchema.pick({ email: true });

export const passwordSchema = newUserSchema.pick({ password: true });

export const bioSchema = newUserSchema.pick({ bio: true }).required();

export const authenticationSchema = z
  .object({
    username: z
      .string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email()
      .optional(),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
  })
  .refine((object) => object.email || object.username, {
    message: 'Username or email is required',
    path: ['username', 'email'],
  });

export const boardGameAtlasPublisherSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
});

export const boardGameAtlasDesignerSchema = boardGameAtlasPublisherSchema;

export const boardGameAtlasGameSchema = z.object({
  id: z.string(),
  name: z.string(),
  description_preview: z.string(),
  price: z.string(),
  price_ca: z.string(),
  price_uk: z.string(),
  price_au: z.string(),
  msrp: z.number(),
  year_published: z.number().nullable(),
  min_players: z.number().nullable(),
  max_players: z.number().nullable(),
  min_playtime: z.number().nullable(),
  max_playtime: z.number().nullable(),
  min_age: z.number().nullable(),
  mechanics: z.array(z.object({ id: z.string(), url: z.string().url() })),
  categories: z.array(z.object({ id: z.string(), url: z.string().url() })),
  primary_publisher: z.union([boardGameAtlasPublisherSchema, z.object({})]),
  primary_designer: z.union([boardGameAtlasDesignerSchema, z.object({})]),
  artists: z.array(z.string()),
  names: z.array(z.string()),
  players: z.string(),
  playtime: z.string(),
  images: z.object({
    thumb: z.string().url(),
    small: z.string().url(),
    medium: z.string().url(),
    large: z.string().url(),
    original: z.string().url(),
  }),
});
