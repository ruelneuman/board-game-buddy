import { Types, isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import Game from '../models/game.model';
import bgaClient from '../utils/boardGameAtlasClient';
import { GameDocument, GameInput } from '../types';
import {
  GamesPaginationQuery,
  boardGameAtlasSearchSchema,
  gamesSortEnum,
  orderEnum,
  BgaGame,
  boardGameAtlasMechanicIdToNameSchema,
  boardGameAtlasCategoryIdToNameSchema,
  SearchSuggestionEnum,
  boardGameAtlasSearchSuggestionsSchema,
} from '../validationSchemas';
import { assertNever, getPaginationData } from '../utils/helpers';

const combineGameData = (gameFromDb: GameDocument, gameFromBga: BgaGame) => {
  const { id: boardGameAtlasId, ...gameWithoutId } = gameFromBga;
  return { ...gameFromDb.toJSON(), ...gameWithoutId };
};

const transormToBgaQuery = ({
  sort,
  limit,
  offset,
  order,
  name,
  yearPublished,
  players,
  maxPlaytimeLte,
  categories,
  mechanics,
  publisher,
  designer,
}: GamesPaginationQuery) => {
  const baseQuery = {
    limit,
    skip: offset,
    name,
    year_published: yearPublished,
    lt_min_players: players === undefined ? undefined : players + 1,
    gt_max_players: players === undefined ? undefined : players - 1,
    lt_max_playtime:
      maxPlaytimeLte === undefined ? undefined : maxPlaytimeLte + 1,
    categories,
    mechanics,
    publisher,
    designer,
  };

  switch (sort) {
    case gamesSortEnum.enum.name:
      return {
        ...baseQuery,
        order_by: order === orderEnum.enum.asc ? 'name' : 'name_reverse',
        ascending: 'true',
      };
    case gamesSortEnum.enum.year:
      return {
        ...baseQuery,
        order_by: 'year_published',
        ascending: order === orderEnum.enum.asc ? 'true' : 'false',
      };
    default:
      return assertNever(sort);
  }
};

export const createGame = async (newGame: GameInput) => Game.create(newGame);

export const findGameById = async (id: string) => {
  if (!isValidObjectId(id)) return null;
  return Game.findById(id).exec();
};

export const findGameByBoardGameAtlasId = async (
  boardGameAtlasId: GameDocument['boardGameAtlasId']
) => Game.findOne({ boardGameAtlasId });

export const findGameWithBgaDataById = async (id: string) => {
  const game = await findGameById(id);

  if (!game) return null;

  const response = await bgaClient.getGamesByQueryParams({
    ids: game.boardGameAtlasId,
  });

  const parsedGamesData = boardGameAtlasSearchSchema.parse(response.data);

  const gameFromBga = parsedGamesData.games[0];

  if (parsedGamesData.count === 0 || !gameFromBga) return null;

  return combineGameData(game, gameFromBga);
};

export const findPaginatedGamesWithBgaData = async (
  query: GamesPaginationQuery
) => {
  const bgaQuery = transormToBgaQuery(query);

  const response = await bgaClient.getGamesByQueryParams(bgaQuery);
  const parsedGamesData = boardGameAtlasSearchSchema.parse(response.data);

  const combinedGames = await Promise.all(
    parsedGamesData.games.map(async (game) => {
      let gameFromDb = await findGameByBoardGameAtlasId(game.id);

      if (!gameFromDb) {
        gameFromDb = await createGame({ boardGameAtlasId: game.id });
      }

      return combineGameData(gameFromDb, game);
    })
  );

  return {
    games: combinedGames,
    ...getPaginationData(parsedGamesData.count, query.offset, query.limit),
  };
};

export const findMechanics = async () => {
  const response = await bgaClient.getMechanics();
  return boardGameAtlasMechanicIdToNameSchema.parse(response.data);
};

export const findCategories = async () => {
  const response = await bgaClient.getCategories();
  return boardGameAtlasCategoryIdToNameSchema.parse(response.data);
};

export const findSearchSuggestions = async (
  searchTerm: string,
  type: SearchSuggestionEnum
) => {
  const response = await bgaClient.getExtraSearchSuggestion(searchTerm, type);

  return boardGameAtlasSearchSuggestionsSchema.parse(response.data);
};

export const addReviewToGame = async (gameId: string, reviewId: string) => {
  const game = await findGameById(gameId);

  if (!game) throw createHttpError(404, `Game with id '${gameId}' not found`);

  game.reviews.push(new Types.ObjectId(reviewId));

  const updatedGame = await game.save();

  return updatedGame;
};

export const removeReviewFromGame = async (gameId: string, reviewId: string) =>
  Game.findByIdAndUpdate(
    gameId,
    {
      $pull: { reviews: reviewId },
    },
    { new: true }
  );
