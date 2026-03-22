import { useState } from 'react';
import { Movie } from '../types';

export const useCompare = () => {
  const [compareList, setCompareList] = useState<Movie[]>([]);

  const toggleCompare = (movie: Movie) => {
    setCompareList((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev.filter((m) => m.id !== movie.id);
      if (prev.length >= 2) return [prev[1], movie];
      return [...prev, movie];
    });
  };

  const isInCompare = (id: number) => compareList.some((m) => m.id === id);

  const clearCompare = () => setCompareList([]);

  return { compareList, toggleCompare, isInCompare, clearCompare };
};
