import mongoose from 'mongoose';

export type GameRating = 1 | 2 | 3 | 4 | 5;

export enum GameListCategory {
  Wishlist = 'wishlist',
  Own = 'own',
  PreviouslyOwned = 'previouslyOwned',
  WantToPlay = 'wantToPlay',
  WantToBuy = 'wantToBuy',
}

export interface UserInput {
  username: string;
  email: string;
  password: string;
  bio?: string;
}

export interface GameDocument extends mongoose.Document {
  boardGameAtlasId: string;
  reviews: mongoose.Schema.Types.ObjectId[];
  createdAt: mongoose.Schema.Types.Date;
  updatedAt: mongoose.Schema.Types.Date;
}

export interface ReviewDocument extends mongoose.Document {
  gameId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  rating: GameRating;
  reviewText: string;
  likes: mongoose.Schema.Types.ObjectId[];
  createdAt: mongoose.Schema.Types.Date;
  updatedAt: mongoose.Schema.Types.Date;
}

export interface GameListDocument extends mongoose.Document {
  listName: GameListCategory;
  games: mongoose.Schema.Types.ObjectId[];
}

export interface UserDocument extends Required<UserInput>, mongoose.Document {
  gameLists: GameListDocument;
  reviews: mongoose.Schema.Types.ObjectId[];
  createdAt: mongoose.Schema.Types.Date;
  updatedAt: mongoose.Schema.Types.Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ErrorResponse {
  message: string;
  status: number;
  details: ValidationErrorDetails[];
}

export interface ValidationErrorDetails {
  path: string | null;
  messages: string[];
}
