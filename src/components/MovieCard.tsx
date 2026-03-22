import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';
import { MdCompareArrows, MdCheck, MdImageNotSupported } from 'react-icons/md';

interface Props {
  movie: Movie;
  onCompare?: (movie: Movie) => void;
  isInCompare?: boolean;
}

const MovieCard: React.FC<Props> = ({ movie, onCompare, isInCompare }) => {
  const navigate = useNavigate();
  const rating = movie.rating?.kp?.toFixed(1);
  const ratingColor = !rating || +rating < 5 ? '#e74c3c' : +rating < 7 ? '#f39c12' : '#2ecc71';

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className="movie-card__poster">
        {movie.poster?.previewUrl ? (
          <img src={movie.poster.previewUrl} alt={movie.name} loading="lazy" />
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
        <p className="movie-card__genres">
          {movie.genres?.slice(0, 2).map((g) => g.name).join(', ')}
        </p>
      </div>
      {onCompare && (
        <button
          className={`movie-card__compare-btn ${isInCompare ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onCompare(movie); }}
          title={isInCompare ? 'Убрать из сравнения' : 'Добавить в сравнение'}
        >
          {isInCompare
            ? <><MdCheck size={14} /> Сравнить</>
            : <><MdCompareArrows size={14} /> Сравнить</>
          }
        </button>
      )}
    </div>
  );
};

export default MovieCard;
