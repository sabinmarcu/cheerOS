import React, {
  createContext, useState, useMemo, ChangeEvent, useCallback,
} from 'react';

type SearchContextType = {
  searching: boolean,
  term: string,
  toggle: () => void,
  handler: (event: ChangeEvent) => void,
}

const defaultSearch = {
  searching: false,
  term: '',
  toggle: () => {},
  handler: () => {},
};

export const SearchContext = createContext<SearchContextType>(defaultSearch);

export const SearchProvider: React.FC = ({ children }) => {
  const [searching, setSearching] = useState(false);
  const [term, setTerm] = useState('');
  const toggle = useCallback(
    () => setSearching(s => !s),
    [setSearching]
  );
  const handler = useCallback(
    ({ target: { value }}) => setTerm(value),
    [setTerm]
  )
  const ctx = useMemo(
    () => ({
      searching,
      term,
      toggle,
      handler,
    }),
    [handler, searching, term, toggle]
  );

  return (
    <SearchContext.Provider value={ctx}>
      {children}
    </SearchContext.Provider>
  )
}

export const Search: React.FC = () => (<h1>Search</h1>);

export default Search;
