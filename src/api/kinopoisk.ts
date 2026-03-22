import axios from 'axios';
import { ApiResponse, Movie, FiltersState } from '../types';

const API_KEY = 'PRHT9N8-VCN4SYB-Q327F2T-XC37DTB';

const api = axios.create({
  baseURL: '/api/v1.4',
  headers: {
    'X-API-KEY': API_KEY,
  },
});

export const fetchMovies = async (
  page: number,
  filters: FiltersState
): Promise<ApiResponse> => {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('limit', '50');
  params.set('rating.kp', `${filters.ratingFrom}-${filters.ratingTo}`);
  params.set('year', `${filters.yearFrom}-${filters.yearTo}`);
  params.append('notNullFields', 'name');
  params.append('notNullFields', 'poster.url');
  filters.genres.forEach((g) => params.append('genres.name', g));

  const { data } = await api.get<ApiResponse>('/movie', { params });
  return data;
};

export const fetchMovieById = async (id: number): Promise<Movie> => {
  const { data } = await api.get<Movie>(`/movie/${id}`);
  return data;
};

export const searchMovies = async (query: string, page = 1): Promise<ApiResponse> => {
  const { data } = await api.get<ApiResponse>('/movie/search', {
    params: { query, page, limit: 50 },
  });
  return data;
};

export const AVAILABLE_GENRES = [
  'аниме', 'биография', 'боевик', 'вестерн', 'документальный',
  'драма', 'история', 'комедия', 'криминал', 'мелодрама',
  'мультфильм', 'мюзикл', 'приключения', 'семейный', 'триллер',
  'ужасы', 'фантастика', 'фэнтези', 'спорт',
];
