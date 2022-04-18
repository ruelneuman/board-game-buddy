import mongoose from 'mongoose';
import { z } from 'zod';
import { transformKeysSnakeToCamel } from '../utils/helpers';

export const usersSortEnum = z.enum(['username', 'createdAt'] as const);
export const gamesSortEnum = z.enum(['name', 'year'] as const);
export const orderEnum = z.enum(['asc', 'desc'] as const);
export const searchSuggestionEnum = z.enum([
  'mechanic',
  'category',
  'designer',
  'publisher',
] as const);

export type SearchSuggestionEnum = z.infer<typeof searchSuggestionEnum>;

export const usersPaginationQuerySchema = z.object({
  limit: z
    .preprocess(
      (limit) => parseInt(limit as string, 10),
      z
        .number({
          required_error: 'limit is required',
          invalid_type_error: 'limit must be a number',
        })
        .int('limit must be an integer')
        .min(0, 'minimum limit is 0')
        .max(100, 'maximum limit is 100')
    )
    .default(30),
  offset: z
    .preprocess(
      (offset) => parseInt(offset as string, 10),
      z
        .number({
          required_error: 'offset is required',
          invalid_type_error: 'offset must be a number',
        })
        .int('offset must be an integer')
        .min(0, 'minimum offset is 0')
    )
    .default(0),
  sort: usersSortEnum.default(usersSortEnum.enum.username),
  order: orderEnum.default(orderEnum.enum.desc),
});

export const userIdSchema = z
  .string({
    required_error: 'user id is required',
    invalid_type_error: 'user id must be a string',
  })
  .refine((id) => mongoose.isValidObjectId(id), { message: 'Invalid user id' });

export const collectionIdSchema = z
  .string({
    required_error: 'collection id is required',
    invalid_type_error: 'collection id must be a string',
  })
  .refine((id) => mongoose.isValidObjectId(id), {
    message: 'invalid collection id',
  });

export const gameIdSchema = z
  .string({
    required_error: 'game id is required',
    invalid_type_error: 'game id must be a string',
  })
  .refine((id) => mongoose.isValidObjectId(id), { message: 'Invalid game id' });

export const reviewIdSchema = z
  .string({
    required_error: 'review id is required',
    invalid_type_error: 'review id must be a string',
  })
  .refine((id) => mongoose.isValidObjectId(id), {
    message: 'Invalid review id',
  });

export const newUserSchema = z.object({
  username: z
    .string({
      required_error: 'username is required',
      invalid_type_error: 'username must be a string',
    })
    .min(3, 'username must be at least 3 characters')
    .max(20, 'username must be 20 or less characters')
    .regex(
      /^[a-zA-Z0-9]+$/,
      'username must contain only alphanumeric characters'
    ),
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email(),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
    .min(8, 'password must be at least 8 characters')
    .max(40, 'password must be 40 or less characters'),
  bio: z
    .string({
      required_error: 'bio is required',
      invalid_type_error: 'bio must be a string',
    })
    .max(5000, 'bio must be 5000 or less characters')
    .optional(),
});

export const usernameSchema = newUserSchema.pick({ username: true });

export const emailSchema = newUserSchema.pick({ email: true });

export const passwordSchema = newUserSchema.pick({ password: true });

export const bioSchema = newUserSchema.pick({ bio: true }).required();

export const newReviewSchema = z.object({
  gameId: z
    .string({
      required_error: 'gameId is required',
      invalid_type_error: 'gameId must be a string',
    })
    .refine((id) => mongoose.isValidObjectId(id), {
      message: 'invalid gameId',
    }),
  userId: z
    .string({
      required_error: 'userId is required',
      invalid_type_error: 'userId must be a string',
    })
    .refine((id) => mongoose.isValidObjectId(id), {
      message: 'invalid userId',
    }),
  rating: z
    .number({
      required_error: 'rating is required',
      invalid_type_error: 'rating must be a string',
    })
    .int('rating must be an integer')
    .min(1, 'rating must be at least 1')
    .max(5, 'rating can be at most 5'),
  reviewText: z
    .string({
      required_error: 'reviewText is required',
      invalid_type_error: 'reviewText must be a string',
    })
    .max(5000, 'review must be 5000 or less characters')
    .optional(),
});

export const gameForCollectionSchema = z.object({
  id: z
    .string({
      required_error: 'id is required',
      invalid_type_error: 'id must be a string',
    })
    .refine((id) => mongoose.isValidObjectId(id), { message: 'Invalid id' }),
});

export const authenticationSchema = z
  .object({
    username: z
      .string({
        required_error: 'username is required',
        invalid_type_error: 'username must be a string',
      })
      .optional(),
    email: z
      .string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string',
      })
      .email()
      .optional(),
    password: z.string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    }),
  })
  .refine((object) => object.email || object.username, {
    message: 'username or email is required',
    path: ['username', 'email'],
  });

export const gamesQuerySchema = z.object({
  limit: z
    .preprocess(
      (limit) => parseInt(limit as string, 10),
      z
        .number({
          required_error: 'limit is required',
          invalid_type_error: 'limit must be a number',
        })
        .int('limit must be an integer')
        .min(0, 'minimum limit is 0')
        .max(100, 'maximum limit is 100')
    )
    .default(30),
  offset: z
    .preprocess(
      (offset) => parseInt(offset as string, 10),
      z
        .number({
          required_error: 'offset is required',
          invalid_type_error: 'offset must be a number',
        })
        .int('offset must be an integer')
        .min(0, 'minimum offset is 0')
    )
    .default(0),
  sort: gamesSortEnum.default(gamesSortEnum.enum.name),
  order: orderEnum.default(orderEnum.enum.desc),
});

export const searchSuggestionQuerySchema = z.object({
  search: z.string({
    required_error: 'search is required',
    invalid_type_error: 'search must be a string',
  }),
  type: searchSuggestionEnum,
});

export type GamesQuery = z.infer<typeof gamesQuerySchema>;

export const boardGameAtlasPublisherSchema = z
  .object({
    id: z.string(),
    name: z.string(),
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
    mechanics: z.array(z.object({ id: z.string() })),
    categories: z.array(z.object({ id: z.string() })),
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

export type BgaGame = z.infer<typeof boardGameAtlasGameSchema>;

export const boardGameAtlasSearchSchema = z.object({
  games: z.array(boardGameAtlasGameSchema),
  count: z.number(),
});

export const boardGameAtlasMechanicsSchema = z.object({
  mechanics: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export const boardGameAtlasMechanicIdToNameSchema =
  boardGameAtlasMechanicsSchema.transform((obj) =>
    obj.mechanics.reduce<{ [mechanicId: string]: string }>(
      (transformedObject, mechanic) => {
        // eslint-disable-next-line no-param-reassign
        transformedObject[mechanic.id] = mechanic.name;
        return transformedObject;
      },
      {}
    )
  );

export const boardGameAtlasCategoriesSchema = z.object({
  categories: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export const boardGameAtlasCategoryIdToNameSchema =
  boardGameAtlasCategoriesSchema.transform((obj) =>
    obj.categories.reduce<{ [categoryId: string]: string }>(
      (transformedObject, category) => {
        // eslint-disable-next-line no-param-reassign
        transformedObject[category.id] = category.name;
        return transformedObject;
      },
      {}
    )
  );

export const boardGameAtlasSearchSuggestionSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const boardGameAtlasSearchSuggestionsSchema = z.union([
  z.object({
    designers: z.array(boardGameAtlasSearchSuggestionSchema),
  }),
  z.object({
    publishers: z.array(boardGameAtlasSearchSuggestionSchema),
  }),
  z.object({
    mechanics: z.array(boardGameAtlasSearchSuggestionSchema),
  }),
  z.object({
    categories: z.array(boardGameAtlasSearchSuggestionSchema),
  }),
]);
