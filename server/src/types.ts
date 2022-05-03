import mongoose from 'mongoose';

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

export interface ReviewInput {
  gameId: string;
  userId: string;
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
  gameId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
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
