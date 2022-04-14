import mongoose from 'mongoose';

export type GameRating = 1 | 2 | 3 | 4 | 5;

export enum CollectionCategory {
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

export interface GameInput {
  boardGameAtlasId: string;
}

export interface GameDocument extends GameInput, mongoose.Document {
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

export interface CollectionDocument extends mongoose.Document {
  listName: CollectionCategory;
  games: mongoose.Schema.Types.ObjectId[];
}

export interface UserDocument extends Required<UserInput>, mongoose.Document {
  collections: CollectionDocument;
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
