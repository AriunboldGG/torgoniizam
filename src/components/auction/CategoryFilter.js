"use client"

import { useState, useEffect } from "react"
import { FaCar, FaMobileAlt, FaLaptop, FaGem, FaBolt, FaPhone, FaTag } from "react-icons/fa"
import { MdTv, MdWatch, MdHomeWork, MdSportsBasketball, MdDirectionsBike } from "react-icons/md"
import { GiClothes, GiSofa, GiBookshelf } from "react-icons/gi"

// Map Mongolian category names → react-icon component
function getCategoryIcon(name = "") {
  const n = name.toLowerCase()
  if (n.includes("автомашин") || n.includes("машин") || n.includes("авто")) return FaCar
  if (n.includes("гар утас") || n.includes("утас") && n.includes("гар"))   return FaMobileAlt
  if (n.includes("компьютер") || n.includes("ноутбук") || n.includes("laptop")) return FaLaptop
  if (n.includes("үнэт") || n.includes("үнэт эдлэл") || n.includes("зүүлт")) return FaGem
  if (n.includes("цахилгаан") || n.includes("электрон"))                    return FaBolt
  if (n.includes("утасны дугаар") || n.includes("дугаар"))                  return FaPhone
  if (n.includes("телевиз") || n.includes("tv") || n.includes("дэлгэц"))    return MdTv
  if (n.includes("цаг") || n.includes("watch"))                             return MdWatch
  if (n.includes("хувцас") || n.includes("гутал"))                          return GiClothes
  if (n.includes("тавилга") || n.includes("гэр") || n.includes("орон"))     return GiSofa
  if (n.includes("номын") || n.includes("ном") || n.includes("дэвтэр"))     return GiBookshelf
  if (n.includes("спорт") || n.includes("тоглоом"))                         return MdSportsBasketball
  if (n.includes("дугуй") || n.includes("унадаг"))                          return MdDirectionsBike
  if (n.includes("байр") || n.includes("үл хөдлөх"))                       return MdHomeWork
  return FaTag
}

export default function CategoryFilter({ onCategorySelect, onSubcategorySelect, selectedCategory, selectedSubcategory }) {
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [loadingChildren, setLoadingChildren] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/lot/category`)
        const json = await response.json()
        const list = json?.data ?? json
        if (Array.isArray(list)) {
          setCategories(
            list.map((cat) => ({
              id: String(cat.key ?? cat.id),
              name: cat.value ?? cat.name ?? "",
              count: cat.count ?? cat.lot_count ?? 0,
            }))
          )
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [])

  const [localSelectedCategory, setLocalSelectedCategory] = useState(null)
  const currentSelectedCategory = selectedCategory || localSelectedCategory

  // Match by id first, fall back to name (connector passes id:null)
  const isSameCategory = (a, b) =>
    a && b && (a.id != null ? a.id === b.id : a.name === b.name)

  const handleCategoryClick = async (category) => {
    if (isSameCategory(currentSelectedCategory, category)) {
      if (onCategorySelect) onCategorySelect(null)
      else setLocalSelectedCategory(null)
      setSubcategories([])
      return
    }

    if (onCategorySelect) onCategorySelect(category)
    else setLocalSelectedCategory(category)

    // Fetch children for the clicked parent
    setLoadingChildren(true)
    try {
      const response = await fetch(`/api/lot/category/${category.id}?has_attribute=true`)
      const json = await response.json()
      const list = json?.data ?? json
      if (Array.isArray(list)) {
        setSubcategories(
          list.map((sub) => ({
            id: String(sub.key ?? sub.id),
            name: sub.value ?? sub.name ?? "",
            count: sub.count ?? sub.lot_count ?? 0,
          }))
        )
      } else {
        setSubcategories([])
      }
    } catch (error) {
      console.error("Failed to fetch subcategories:", error)
      setSubcategories([])
    } finally {
      setLoadingChildren(false)
    }
  }

  const handleSubcategoryClick = (subcategory) => {
    if (onSubcategorySelect) {
      onSubcategorySelect(subcategory)
    }
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">

        {/* Main Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-4 sm:mb-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
                isSameCategory(currentSelectedCategory, category) ? 'scale-105' : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <div
                className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isSameCategory(currentSelectedCategory, category)
                    ? 'bg-[#131316]'
                    : 'bg-[#F4F4F5] hover:bg-[#131316]'
                }`}
              >
              {(() => {
                const Icon = getCategoryIcon(category.name)
                return (
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition-all duration-200 ${
                    isSameCategory(currentSelectedCategory, category)
                      ? 'text-white'
                      : 'text-gray-600'
                  }`} />
                )
              })()}
                <div className={`absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isSameCategory(currentSelectedCategory, category)
                    ? 'bg-white text-[#131316]'
                    : 'bg-[#131316] text-white'
                }`}>
                  {category.count}
                </div>
              </div>
              <span className={`text-xs sm:text-sm font-medium mt-1 sm:mt-2 text-center transition-colors duration-200 ${
                isSameCategory(currentSelectedCategory, category)
                  ? 'text-[#131316]'
                  : 'text-gray-700'
              }`}>
                {category.name}
              </span>
            </div>
          ))}
        </div>

        {/* Subcategories */}
        {currentSelectedCategory && (
          <div className="border-t pt-3 sm:pt-4 md:pt-6">
            
            {loadingChildren ? (
              <div className="text-sm text-gray-400 py-2">Уншиж байна...</div>
            ) : subcategories.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2 md:gap-3">
                {subcategories.map((subcategory, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-1 sm:gap-2 cursor-pointer p-1.5 sm:p-2 md:p-3 rounded-lg transition-all duration-200 hover:text-[#FF4405] ${
                      selectedSubcategory?.id === subcategory.id ? 'bg-orange-50 border border-orange-200' : ''
                    }`}
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 ${
                      selectedSubcategory?.id === subcategory.id ? 'bg-orange-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-xs sm:text-sm font-medium break-words leading-tight ${
                        selectedSubcategory?.id === subcategory.id ? 'text-orange-600' : 'text-blue-600'
                      }`}>{subcategory.name}</span>
                      {subcategory.count > 0 && (
                        <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">{subcategory.count}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-400 py-2">Дэд ангилал олдсонгүй</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
