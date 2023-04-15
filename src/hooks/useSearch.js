import { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const useSearch = (searchTerm) => {
  const [results, setResults] = useState([]);

  const { localSearchPages } = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `);

  useEffect(() => {
    if (!searchTerm || !localSearchPages) {
      setResults([]);
      return;
    }
  
    const lunr = require('lunr');
    const searchIndex = lunr.Index.load(localSearchPages.index);
    const searchResults = searchIndex.search(searchTerm);
    const foundPages = searchResults.map(({ ref }) => localSearchPages.store[ref]);
    setResults(foundPages);
  }, [searchTerm, localSearchPages]);
  

  return results;
};

export default useSearch;
