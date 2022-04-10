import Game from '../models/game.model';
import { GameDocument, GameInput } from '../types';

export const createGame = async (newGame: GameInput) => {
  const game = await Game.create(newGame);

  return game;
};

export const findGameByBoardGameAtlasId = async (
  boardGameAtlasId: GameDocument['boardGameAtlasId']
) => Game.findOne({ boardGameAtlasId });
