import { Movie } from '../types';

const STORAGE_KEY = 'kino_favorites';

export const getFavorites = (): Movie[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const addFavorite = (movie: Movie): void => {
  const favs = getFavorites();
  if (!favs.find((f) => f.id === movie.id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favs, movie]));
  }
};

export const removeFavorite = (id: number): void => {
  const favs = getFavorites().filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
};

export const isFavorite = (id: number): boolean => {
  return getFavorites().some((f) => f.id === id);
};
