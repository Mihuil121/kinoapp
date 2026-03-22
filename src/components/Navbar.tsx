import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLocalMovies } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <MdLocalMovies size={26} />
        <span>КиноВселенная</span>
      </Link>
      <form className="navbar__search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Поиск фильмов..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit"><FiSearch size={18} /></button>
      </form>
      <div className="navbar__links">
        <Link to="/">Фильмы</Link>
        <Link to="/favorites">Избранное</Link>
      </div>
    </nav>
  );
};

export default Navbar;
