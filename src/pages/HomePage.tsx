import React, { useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { useCompare } from '../hooks/useCompare';
import { FiltersState } from '../types';
import MovieCard from '../components/MovieCard';
import FiltersPanel from '../components/FiltersPanel';
import ComparePanel from '../components/ComparePanel';

const DEFAULT_FILTERS: FiltersState = {
  genres: [],
  ratingFrom: 0,
  ratingTo: 10,
  yearFrom: 1990,
  yearTo: new Date().getFullYear(),
};

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { movies, loading, error, hasMore, loadMovies, reset } = useMovies();
  const { compareList, toggleCompare, isInCompare, clearCompare } = useCompare();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const parseFiltersFromParams = (): FiltersState => ({
    genres: searchParams.getAll('genre'),
    ratingFrom: Number(searchParams.get('ratingFrom') ?? DEFAULT_FILTERS.ratingFrom),
    ratingTo: Number(searchParams.get('ratingTo') ?? DEFAULT_FILTERS.ratingTo),
    yearFrom: Number(searchParams.get('yearFrom') ?? DEFAULT_FILTERS.yearFrom),
    yearTo: Number(searchParams.get('yearTo') ?? DEFAULT_FILTERS.yearTo),
  });

  const [localFilters, setLocalFilters] = React.useState<FiltersState>(parseFiltersFromParams);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    localFilters.genres.forEach((g) => params.append('genre', g));
    params.set('ratingFrom', String(localFilters.ratingFrom));
    params.set('ratingTo', String(localFilters.ratingTo));
    params.set('yearFrom', String(localFilters.yearFrom));
    params.set('yearTo', String(localFilters.yearTo));
    setSearchParams(params);
    reset();
  }, [localFilters, setSearchParams, reset]);

  useEffect(() => {
    const filters = parseFiltersFromParams();
    loadMovies(filters, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore || loading) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMovies(parseFiltersFromParams());
        }
      },
      { threshold: 0.1 }
    );
    observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loading]);

  return (
    <div className="home-page">
      <FiltersPanel
        filters={localFilters}
        onChange={setLocalFilters}
        onApply={applyFilters}
      />
      <main className="home-page__main">
        <ComparePanel movies={compareList} onClear={clearCompare} />
        {error && <div className="error-msg">{error}</div>}
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onCompare={toggleCompare}
              isInCompare={isInCompare(movie.id)}
            />
          ))}
        </div>
        {loading && (
          <div className="loader-wrapper">
            <div className="loader" />
          </div>
        )}
        {!loading && !hasMore && movies.length > 0 && (
          <p className="end-msg">Больше фильмов нет</p>
        )}
        <div ref={sentinelRef} style={{ height: 1 }} />
      </main>
    </div>
  );
};

export default HomePage;
