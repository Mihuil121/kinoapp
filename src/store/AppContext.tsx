import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useCompare } from '../hooks/useCompare';
import { Movie } from '../types';
import { getFavorites, addFavorite as addFav, removeFavorite as removeFav, isFavorite as isFav } from './favorites';

interface AppContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  compareList: Movie[];
  toggleCompare: (movie: Movie) => void;
  isInCompare: (id: number) => boolean;
  clearCompare: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>(getFavorites);
  const compare = useCompare();

  const addFavorite = (movie: Movie) => { addFav(movie); setFavorites(getFavorites()); };
  const removeFavorite = (id: number) => { removeFav(id); setFavorites(getFavorites()); };
  const isFavorite = (id: number) => isFav(id);

  return (
    <AppContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, ...compare }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be inside AppProvider');
  return ctx;
};
