import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BGA_API_URL, BGA_CLIENT_ID } from '../config';

export class BoardGameArenaClient {
  httpClient: AxiosInstance;

  clientId: string;

  constructor({ baseUrl = BGA_API_URL, clientId = BGA_CLIENT_ID } = {}) {
    this.httpClient = axios.create({
      baseURL: baseUrl,
      params: { client_id: BGA_CLIENT_ID, pretty: true },
    });
    this.clientId = clientId;
  }

  async getRequest(url: string, options: AxiosRequestConfig = {}) {
    return this.httpClient.get(url, options);
  }

  async getMechanics(options: AxiosRequestConfig = {}) {
    return this.getRequest('/api/game/mechanics', options);
  }

  async getCategories(options: AxiosRequestConfig = {}) {
    return this.getRequest('/api/game/categories', options);
  }

  async getGames(options: AxiosRequestConfig = {}) {
    return this.getRequest('/api/search', options);
  }

  async getGamesByQueryParams(
    params: Record<string, string> = {},
    options: AxiosRequestConfig = {}
  ) {
    return this.getGames({ ...options, params });
  }

  // includes suggestions for games, mechanics, and categories
  async getSearchSuggestion(query: string, options: AxiosRequestConfig = {}) {
    return this.getRequest('/api/search-suggestions', {
      ...options,
      params: { name: query },
    });
  }

  async getExtraSearchSuggestion(
    type: 'mechanic' | 'category' | 'designer' | 'publisher',
    query: string,
    options: AxiosRequestConfig = {}
  ) {
    return this.getRequest('/api/search-suggestions/extras', {
      ...options,
      params: { type, name: query },
    });
  }
}

export const boardGameAtlasClient = new BoardGameArenaClient();

export default boardGameAtlasClient;
