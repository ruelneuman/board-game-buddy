import mongoose from 'mongoose';
import { z } from 'zod';
import { transformKeysSnakeToCamel } from '../utils/helpers';

export const usersSortEnum = z.enum(['username', 'createdAt'] as const);
export const reviewsSortEnum = z.enum(['rating', 'createdAt'] as const);
export const gamesSortEnum = z.enum(['name', 'yearPublished'] as const);
export const orderEnum = z.enum(['asc', 'desc'] as const);
export const searchSuggestionEnum = z.enum([
  'mechanic',
  'category',
  'designer',
  'publisher',
] as const);

export type SearchSuggestionEnum = z.infer<typeof searchSuggestionEnum>;

export const ratingSchema = z
  .number({
    required_error: 'rating is required',
    invalid_type_error: 'rating must be a number',
  })
  .int('rating must be an integer')
  .min(1, 'rating must be at least 1')
  .max(10, 'rating can be at most 10');

export const gameIdSchema = z
  .string({
    required_error: 'gameId is required',
    invalid_type_error: 'gameId must be a string',
  })
  .refine((id) => mongoose.isValidObjectId(id), { message: 'Invalid gameId' });

export const reviewIdSchema = z
  .string({
    required_error: 'reviewId is required',
    invalid_type_error: 'reviewId must be a string',
  })
  .refine((id) => mongoose.isValidObjectId(id), {
    message: 'Invalid reviewId',
  });

export const userIdSchema = z
  .string({
    required_error: 'userId is required',
    invalid_type_error: 'userId must be a string',
  })
  .refine((id) => mongoose.isValidObjectId(id), { message: 'Invalid userId' });

export const collectionIdSchema = z
  .string({
    required_error: 'collectionId is required',
    invalid_type_error: 'collectionId must be a string',
  })
  .refine((id) => mongoose.isValidObjectId(id), {
    message: 'invalid collectionId',
  });

export const basePaginationQuerySchema = z.object({
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
        .max(25, 'maximum limit is 25')
    )
    .default(25),
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
  order: orderEnum.default(orderEnum.enum.desc),
});

export type BasePaginationQuery = z.infer<typeof basePaginationQuerySchema>;

export const usersPaginationQuerySchema = basePaginationQuerySchema.merge(
  z.object({
    sort: usersSortEnum.default(usersSortEnum.enum.createdAt),
  })
);

export type UsersPaginationQuery = z.infer<typeof usersPaginationQuerySchema>;

export const reviewsPaginationQuerySchema = basePaginationQuerySchema.merge(
  z.object({
    sort: reviewsSortEnum.default(reviewsSortEnum.enum.createdAt),
    gameId: gameIdSchema.optional(),
    userId: userIdSchema.optional(),
    rating: z
      .preprocess((limit) => parseInt(limit as string, 10), ratingSchema)
      .optional(),
  })
);

export type ReviewsPaginationQuery = z.infer<
  typeof reviewsPaginationQuerySchema
>;

export const gamesPaginationQuerySchema = basePaginationQuerySchema.merge(
  z.object({
    sort: gamesSortEnum.default(gamesSortEnum.enum.name),
    name: z
      .string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
      })
      .optional(),
    yearPublished: z
      .preprocess(
        (yearPublished) => parseInt(yearPublished as string, 10),
        z.number({
          required_error: 'year is required',
          invalid_type_error: 'year must be a number',
        })
      )
      .optional(),
    players: z
      .preprocess(
        (players) => parseInt(players as string, 10),
        z.number({
          required_error: 'players is required',
          invalid_type_error: 'players must be a number',
        })
      )
      .optional(),
    maxPlaytimeLte: z
      .preprocess(
        (maxPlaytimeLte) => parseInt(maxPlaytimeLte as string, 10),
        z.number({
          required_error: 'maxPlaytimeLte is required',
          invalid_type_error: 'maxPlaytimeLte must be a number',
        })
      )
      .optional(),
    categories: z
      .string({
        required_error: 'categories is required',
        invalid_type_error: 'categories must be a string',
      })
      .optional(),
    mechanics: z
      .string({
        required_error: 'mechanics is required',
        invalid_type_error: 'mechanics must be a string',
      })
      .optional(),
    publisher: z
      .string({
        required_error: 'publisher is required',
        invalid_type_error: 'publisher must be a string',
      })
      .optional(),
    designer: z
      .string({
        required_error: 'designer is required',
        invalid_type_error: 'designer must be a string',
      })
      .optional(),
  })
);

export type GamesPaginationQuery = z.infer<typeof gamesPaginationQuerySchema>;

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
  rating: ratingSchema,
  reviewText: z
    .string({
      required_error: 'reviewText is required',
      invalid_type_error: 'reviewText must be a string',
    })
    .max(5000, 'review must be 5000 or less characters')
    .optional(),
});

export const newReviewWithoutUserIdSchema = newReviewSchema.omit({
  userId: true,
});

export const gameForCollectionSchema = z.object({
  gameId: gameIdSchema,
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

export const searchSuggestionQuerySchema = z.object({
  search: z.string({
    required_error: 'search is required',
    invalid_type_error: 'search must be a string',
  }),
  type: searchSuggestionEnum,
});

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
