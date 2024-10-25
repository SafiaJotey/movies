'use client'
import { useState } from 'react';
import { fetchSearchResults } from '../lib/api';

const Search = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (query) {
      const results = await fetchSearchResults(query);
      onSearchResults(results);
    } else {
      onSearchResults([]); // Clear results if the query is empty
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="border rounded px-4 py-2 w-full"
      />
      <button
        onClick={handleSearch}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
