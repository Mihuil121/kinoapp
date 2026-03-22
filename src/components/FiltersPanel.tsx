import React from 'react';
import { FiltersState } from '../types';
import { AVAILABLE_GENRES } from '../api/kinopoisk';

interface Props {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  onApply: () => void;
}

const FiltersPanel: React.FC<Props> = ({ filters, onChange, onApply }) => {
  const currentYear = new Date().getFullYear();

  const toggleGenre = (genre: string) => {
    const genres = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    onChange({ ...filters, genres });
  };

  return (
    <aside className="filters-panel">
      <h2 className="filters-panel__title">Фильтры</h2>

      <div className="filters-section">
        <h3>Жанры</h3>
        <div className="genres-grid">
          {AVAILABLE_GENRES.map((genre) => (
            <button
              key={genre}
              className={`genre-tag ${filters.genres.includes(genre) ? 'active' : ''}`}
              onClick={() => toggleGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <h3>Рейтинг: {filters.ratingFrom} — {filters.ratingTo}</h3>
        <div className="range-row">
          <input
            type="range" min="0" max="10" step="0.5"
            value={filters.ratingFrom}
            onChange={(e) => onChange({ ...filters, ratingFrom: +e.target.value })}
          />
          <input
            type="range" min="0" max="10" step="0.5"
            value={filters.ratingTo}
            onChange={(e) => onChange({ ...filters, ratingTo: +e.target.value })}
          />
        </div>
      </div>

      <div className="filters-section">
        <h3>Год: {filters.yearFrom} — {filters.yearTo}</h3>
        <div className="range-row">
          <input
            type="range" min="1990" max={currentYear}
            value={filters.yearFrom}
            onChange={(e) => onChange({ ...filters, yearFrom: +e.target.value })}
          />
          <input
            type="range" min="1990" max={currentYear}
            value={filters.yearTo}
            onChange={(e) => onChange({ ...filters, yearTo: +e.target.value })}
          />
        </div>
      </div>

      <button className="apply-btn" onClick={onApply}>
        Применить
      </button>
    </aside>
  );
};

export default FiltersPanel;
