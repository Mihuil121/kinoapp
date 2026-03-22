import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { getFavorites, removeFavorite } from '../store/favorites';
import { useNavigate } from 'react-router-dom';
import { MdFavorite, MdImageNotSupported } from 'react-icons/md';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  return (
    <div className="favorites-page">
      <h1>Избранные фильмы</h1>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>У вас пока нет избранных фильмов</p>
          <button onClick={() => navigate('/')}>Перейти к каталогу</button>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => {
            const rating = movie.rating?.kp?.toFixed(1);
            const ratingColor = !rating || +rating < 5 ? '#e74c3c' : +rating < 7 ? '#f39c12' : '#2ecc71';
            return (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <div className="movie-card__poster">
                  {movie.poster?.previewUrl ? (
                    <img src={movie.poster.previewUrl} alt={movie.name} />
                  ) : (
                    <div className="movie-card__no-poster">
                      <MdImageNotSupported size={32} />
                      <span>Нет постера</span>
                    </div>
                  )}
                  <div className="movie-card__rating" style={{ background: ratingColor }}>
                    {rating || '—'}
                  </div>
                </div>
                <div className="movie-card__info">
                  <h3 className="movie-card__title">{movie.name}</h3>
                  <p className="movie-card__year">{movie.year}</p>
                </div>
                <button
                  className="movie-card__remove-fav"
                  onClick={(e) => handleRemove(movie.id, e)}
                  title="Убрать из избранного"
                >
                  <MdFavorite size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
