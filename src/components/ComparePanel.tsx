import React from 'react';
import { Movie } from '../types';
import { MdClose } from 'react-icons/md';

interface Props {
  movies: Movie[];
  onClear: () => void;
}

const ComparePanel: React.FC<Props> = ({ movies, onClear }) => {
  if (movies.length === 0) return null;

  const [a, b] = movies;

  const rows = [
    { label: 'Название', a: a?.name, b: b?.name },
    { label: 'Год', a: a?.year, b: b?.year },
    { label: 'Рейтинг КП', a: a?.rating?.kp?.toFixed(1), b: b?.rating?.kp?.toFixed(1) },
    { label: 'Жанры', a: a?.genres?.map((g) => g.name).join(', '), b: b?.genres?.map((g) => g.name).join(', ') },
    { label: 'Длительность', a: a?.movieLength ? `${a.movieLength} мин` : '—', b: b?.movieLength ? `${b.movieLength} мин` : '—' },
  ];

  return (
    <div className="compare-panel">
      <div className="compare-panel__header">
        <h2>Сравнение фильмов</h2>
        <button className="compare-panel__clear" onClick={onClear}>
          <MdClose size={16} /> Очистить
        </button>
      </div>
      <table className="compare-table">
        <thead>
          <tr>
            <th>Параметр</th>
            <th>{a?.name || '—'}</th>
            {b && <th>{b?.name || '—'}</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="compare-table__label">{row.label}</td>
              <td>{String(row.a ?? '—')}</td>
              {b && <td>{String(row.b ?? '—')}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparePanel;
