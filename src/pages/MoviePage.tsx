import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Movie } from '../types';
import { fetchMovieById } from '../api/kinopoisk';
import { addFavorite, removeFavorite, isFavorite } from '../store/favorites';
import ConfirmModal from '../components/ConfirmModal';
import { MdArrowBack, MdFavorite, MdFavoriteBorder, MdImageNotSupported } from 'react-icons/md';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorited, setFavorited] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchMovieById(Number(id))
      .then((data) => {
        setMovie(data);
        setFavorited(isFavorite(data.id));
      })
      .catch(() => setError('Не удалось загрузить фильм'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleFavoriteClick = () => {
    if (favorited) {
      removeFavorite(movie!.id);
      setFavorited(false);
    } else {
      setShowModal(true);
    }
  };

  const confirmAdd = () => {
    addFavorite(movie!);
    setFavorited(true);
    setShowModal(false);
  };

  if (loading) return <div className="loader-wrapper"><div className="loader" /></div>;
  if (error || !movie) return <div className="error-msg">{error || 'Фильм не найден'}</div>;

  const rating = movie.rating?.kp?.toFixed(1);
  const ratingColor = !rating || +rating < 5 ? '#e74c3c' : +rating < 7 ? '#f39c12' : '#2ecc71';

  return (
    <div className="movie-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <MdArrowBack size={18} /> Назад
      </button>
      <div className="movie-detail">
        <div className="movie-detail__poster">
          {movie.poster?.url ? (
            <img src={movie.poster.url} alt={movie.name} />
          ) : (
            <div className="movie-card__no-poster">
              <MdImageNotSupported size={48} />
              <span>Нет постера</span>
            </div>
          )}
        </div>
        <div className="movie-detail__info">
          <h1>{movie.name}</h1>
          {movie.alternativeName && (
            <p className="movie-detail__alt-name">{movie.alternativeName}</p>
          )}
          <div className="movie-detail__meta">
            <span className="rating-badge" style={{ background: ratingColor }}>
              КП: {rating || '—'}
            </span>
            <span>{movie.year}</span>
            {movie.movieLength && <span>{movie.movieLength} мин</span>}
          </div>
          <div className="movie-detail__genres">
            {movie.genres?.map((g) => (
              <span key={g.name} className="genre-badge">{g.name}</span>
            ))}
          </div>
          {movie.description && (
            <p className="movie-detail__desc">{movie.description}</p>
          )}
          <button
            className={`fav-btn ${favorited ? 'fav-btn--active' : ''}`}
            onClick={handleFavoriteClick}
          >
            {favorited
              ? <><MdFavorite size={18} /> В избранном</>
              : <><MdFavoriteBorder size={18} /> Добавить в избранное</>
            }
          </button>
        </div>
      </div>
      <ConfirmModal
        movie={showModal ? movie : null}
        onConfirm={confirmAdd}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default MoviePage;
