"use client"

import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const updateSelectedCategory = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const updateSelectedSubcategory = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedSubcategory(null);
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      selectedCategory,
      selectedSubcategory,
      updateSearchQuery,
      updateSelectedCategory,
      updateSelectedSubcategory,
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
