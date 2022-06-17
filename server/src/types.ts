import mongoose from 'mongoose';

export const collectionCategories = [
  'wishlist',
  'own',
  'previouslyOwned',
  'wantToPlay',
  'wantToBuy',
] as const;

export type CollectionCategory = typeof collectionCategories[number];

export interface UserInput {
  username: string;
  email: string;
  password: string;
  bio?: string;
}

export interface GameInput {
  boardGameAtlasId: string;
}

export interface ReviewInput {
  game: string;
  user: string;
  rating: number;
  reviewText?: string;
}

export interface GameDocument extends GameInput, mongoose.Document {
  reviews: mongoose.Types.ObjectId[];
  createdAt: mongoose.Schema.Types.Date;
  updatedAt: mongoose.Schema.Types.Date;
}

export interface GameResponse extends GameDocument {
  _id: mongoose.Types.ObjectId;
  ratingAverage: number;
}

export interface ReviewDocument extends mongoose.Document {
  game: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
  reviewText: string;
  likes: mongoose.Types.ObjectId[];
  createdAt: mongoose.Schema.Types.Date;
  updatedAt: mongoose.Schema.Types.Date;
}

export interface CollectionDocument extends mongoose.Document {
  collectionName: CollectionCategory;
  games: mongoose.Types.ObjectId[];
}

export interface UserDocument extends Required<UserInput>, mongoose.Document {
  collections: mongoose.Types.DocumentArray<CollectionDocument>;
  reviews: mongoose.Types.ObjectId[];
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
