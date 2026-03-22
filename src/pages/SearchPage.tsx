import React, { useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { useCompare } from '../hooks/useCompare';
import MovieCard from '../components/MovieCard';
import ComparePanel from '../components/ComparePanel';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { movies, loading, error, hasMore, searchMoviesQuery, reset } = useMovies();
  const { compareList, toggleCompare, isInCompare, clearCompare } = useCompare();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!query) return;
    reset();
    searchMoviesQuery(query, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore || loading) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          searchMoviesQuery(query);
        }
      },
      { threshold: 0.1 }
    );
    observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loading, query]);

  return (
    <div className="search-page">
      <h1>Результаты поиска: «{query}»</h1>
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
      {loading && <div className="loader-wrapper"><div className="loader" /></div>}
      {!loading && !hasMore && movies.length > 0 && (
        <p className="end-msg">Больше результатов нет</p>
      )}
      {!loading && movies.length === 0 && !error && (
        <div className="empty-state"><p>По запросу «{query}» ничего не найдено</p></div>
      )}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
};

export default SearchPage;
