"use client"

import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const updateSelectedCategory = (category) => {
    console.log('SearchContext: updateSelectedCategory called with:', category);
    setSelectedCategory(category);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      selectedCategory,
      updateSearchQuery,
      updateSelectedCategory,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
