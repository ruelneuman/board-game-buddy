import Game from '../models/game.model';
import { GameInput } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const createGame = async (newGame: GameInput) => {
  const game = await Game.create(newGame);

  return game;
};
