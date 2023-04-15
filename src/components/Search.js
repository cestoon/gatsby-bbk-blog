// src/components/Search.js
import React, { useState } from 'react';
import useSearch from '../hooks/useSearch';
import { Link } from 'gatsby';

const Search = () => {
  const [query, setQuery] = useState('');
  const results = useSearch('pages', query);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="搜索框暂时还不能用...开发中"
      />
      <ul>
        {results.map(({ id, path, title }) => (
          <li key={id}>
            <Link to={path}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
