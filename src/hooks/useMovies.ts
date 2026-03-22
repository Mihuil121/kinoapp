import { useState, useCallback, useRef } from 'react';
import { Movie, FiltersState } from '../types';
import { fetchMovies, searchMovies } from '../api/kinopoisk';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  const loadMovies = useCallback(async (filters: FiltersState, reset = false) => {
    const currentPage = reset ? 1 : pageRef.current;
    if (!reset && loading) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovies(currentPage, filters);
      setMovies((prev) => reset ? data.docs : [...prev, ...data.docs]);
      const nextPage = currentPage + 1;
      pageRef.current = nextPage;
      setPage(nextPage);
      setHasMore(currentPage < data.pages);
    } catch (e) {
      setError('Ошибка загрузки фильмов');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const searchMoviesQuery = useCallback(async (query: string, reset = false) => {
    const currentPage = reset ? 1 : pageRef.current;
    if (!reset && loading) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query, currentPage);
      setMovies((prev) => reset ? data.docs : [...prev, ...data.docs]);
      const nextPage = currentPage + 1;
      pageRef.current = nextPage;
      setPage(nextPage);
      setHasMore(currentPage < data.pages);
    } catch (e) {
      setError('Ошибка поиска');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const reset = useCallback(() => {
    pageRef.current = 1;
    setPage(1);
    setMovies([]);
    setHasMore(true);
  }, []);

  return { movies, loading, error, hasMore, page, loadMovies, searchMoviesQuery, reset };
};
