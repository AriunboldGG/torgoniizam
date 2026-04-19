"use client"

import { useSearch } from "@/contexts/SearchContext"
import CategoryFilter from "./CategoryFilter"

export default function CategoryFilterConnector() {
  const { selectedCategory, selectedSubcategory, updateSelectedCategory, updateSelectedSubcategory } = useSearch()

  // Build category object shape that CategoryFilter expects for selectedCategory prop
  const categoryObj = selectedCategory ? { id: null, name: selectedCategory } : null

  return (
    <CategoryFilter
      selectedCategory={categoryObj}
      selectedSubcategory={selectedSubcategory}
      onCategorySelect={(cat) => updateSelectedCategory(cat?.name ?? "")}
      onSubcategorySelect={(sub) => updateSelectedSubcategory(sub)}
    />
  )
}
