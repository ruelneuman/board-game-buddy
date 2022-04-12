import { z } from 'zod';
import User from '../models/user.model';
import { transformKeysSnakeToCamel, assertNever } from '../utils/helpers';

export const usersSortEnum = z.enum(['username', 'createdAt'] as const);
export const gamesSortEnum = z.enum(['name', 'year'] as const);
export const orderEnum = z.enum(['asc', 'desc'] as const);

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

export const gamesQuerySchema = z
  .object({
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
    sort: gamesSortEnum.default(gamesSortEnum.enum.name),
    order: orderEnum.default(orderEnum.enum.desc),
  })
  .transform(({ sort, limit, offset, order }) => {
    switch (sort) {
      case gamesSortEnum.enum.name:
        return {
          limit,
          skip: offset,
          order_by: order === orderEnum.enum.asc ? 'name' : 'name_reverse',
          ascending: 'true',
        };
      case gamesSortEnum.enum.year:
        return {
          limit,
          skip: offset,
          order_by: 'year_published',
          ascending: order === orderEnum.enum.asc ? 'true' : 'false',
        };
      default:
        return assertNever(sort);
    }
  });

export const boardGameAtlasPublisherSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    url: z.string().url(),
  })
  .partial();

export const boardGameAtlasDesignerSchema = boardGameAtlasPublisherSchema;

export const boardGameAtlasGameSchema = z.preprocess(
  (game) => transformKeysSnakeToCamel(game),
  z.object({
    id: z.string(),
    name: z.string().nullable().default(null),
    description_preview: z.string().default(''),
    price: z.string(),
    priceCa: z.string(),
    priceUk: z.string(),
    priceAu: z.string(),
    yearPublished: z.number().nullable(),
    minPlayers: z.number().nullable(),
    maxPlayers: z.number().nullable(),
    minPlaytime: z.number().nullable(),
    maxPlaytime: z.number().nullable(),
    minAge: z.number().nullable(),
    mechanics: z.array(z.object({ id: z.string(), url: z.string().url() })),
    categories: z.array(z.object({ id: z.string(), url: z.string().url() })),
    primaryPublisher: boardGameAtlasPublisherSchema.default({}),
    primaryDesigner: boardGameAtlasDesignerSchema.default({}),
    artists: z.array(z.string()),
    names: z.array(z.string()),
    players: z.string().nullable().default(null),
    playtime: z.string().nullable().default(null),
    images: z.object({
      thumb: z.string().url(),
      small: z.string().url(),
      medium: z.string().url(),
      large: z.string().url(),
      original: z.string().url(),
    }),
  })
);

export const boardGameAtlasSearchSchema = z.object({
  games: z.array(boardGameAtlasGameSchema),
  count: z.number(),
});
