export interface Pagination {
  count: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: number;
  hasNextPage: number;
  prevPage: number | null;
  nextPage: number | null;
}

export type CollectionCategory =
  | 'wishlist'
  | 'own'
  | 'previouslyOwned'
  | 'wantToPlay'
  | 'wantToBuy';

export interface Collection {
  _id: string;
  collectionName: CollectionCategory;
  games: string[];
}

export interface GameMechanic {
  id: string;
}

export interface GameCategory {
  id: string;
}

export interface GamePublisher {
  id: string;
  name: string;
}

export interface GameDesigner {
  id: string;
  name: string;
}

export interface GameImages {
  thumb: string;
  small: string;
  medium: string;
  large: string;
  original: string;
}

export interface Game {
  _id: string;
  reviews: string[];
  averageRating: number | null;
  boardGameAtlasId: string;
  name: string | null;
  descriptionPreview: string;
  price: string;
  priceCa: string;
  priceUk: string;
  priceAu: string;
  yearPublished: number | null;
  minPlayers: number | null;
  maxPlayers: number | null;
  minPlaytime: number | null;
  maxPlaytime: number | null;
  minAge: number;
  mechanics: GameMechanic[];
  categories: GameCategory[];
  primaryPublisher: GamePublisher;
  primaryDesigner: GameDesigner;
  artists: string[];
  names: string[];
  players: string | null;
  playtime: string | null;
  images: GameImages;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedGames extends Pagination {
  games: Game[];
}

export interface Review {
  _id: string;
  game: string;
  user: User | null;
  rating: number | null;
  reviewText: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedReviews extends Pagination {
  reviews: Review[];
}

export interface User {
  _id: string;
  username: string;
  email: string;
  bio: string;
  reviews: string[];
  collections: Collection[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedUsers extends Pagination {
  users: User[];
}
