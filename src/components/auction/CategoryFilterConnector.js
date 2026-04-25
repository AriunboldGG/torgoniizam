"use client"

import { useRef } from "react"
import { useSearch } from "@/contexts/SearchContext"
import CategoryFilter from "./CategoryFilter"

export default function CategoryFilterConnector() {
  const { selectedCategory, selectedSubcategory, updateSelectedCategory, updateSelectedSubcategory, updateCategorySubcategoryNames } = useSearch()
  const childrenCacheRef = useRef(new Map())

  const categoryObj = selectedCategory ? { id: null, name: selectedCategory } : null

  const handleChildrenCacheReady = (cache) => {
    childrenCacheRef.current = cache
  }

  const scrollToProducts = (delay = 80) => {
    setTimeout(() => {
      document.getElementById("products-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, delay)
  }

  const handleCategorySelect = (cat) => {
    updateSelectedCategory(cat?.name ?? "")
    if (cat?.id) {
      const children = childrenCacheRef.current.get(cat.id) ?? []
      updateCategorySubcategoryNames(children.map((s) => s.name))
    } else {
      updateCategorySubcategoryNames([])
    }

    if (cat) scrollToProducts(720)
  }

  const handleSubcategorySelect = (sub) => {
    updateSelectedSubcategory(sub)
    if (sub) scrollToProducts(720)
  }

  return (
    <CategoryFilter
      selectedCategory={categoryObj}
      selectedSubcategory={selectedSubcategory}
      onCategorySelect={handleCategorySelect}
      onSubcategorySelect={handleSubcategorySelect}
      onChildrenCacheReady={handleChildrenCacheReady}
    />
  )
}
