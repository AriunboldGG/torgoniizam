"use client"

import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  // lowercase subcategory names that belong to the selected parent category
  const [categorySubcategoryNames, setCategorySubcategoryNames] = useState([]);

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const updateSelectedCategory = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setCategorySubcategoryNames([]);
  };

  const updateCategorySubcategoryNames = (names) => {
    setCategorySubcategoryNames(names.map((n) => n.toLowerCase()));
  };

  const updateSelectedSubcategory = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedSubcategory(null);
    setCategorySubcategoryNames([]);
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      selectedCategory,
      selectedSubcategory,
      categorySubcategoryNames,
      updateSearchQuery,
      updateSelectedCategory,
      updateCategorySubcategoryNames,
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
