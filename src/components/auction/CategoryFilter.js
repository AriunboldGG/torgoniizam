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
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        {/* Main Categories - horizontal scrollable row, full width */}
        <div className="flex justify-between w-full py-2 mb-2 border-b border-gray-100">
          {categories.map((category, idx) => {
            const Icon = getCategoryIcon(category.name)
            const selected = isSameCategory(currentSelectedCategory, category)
            return (
              <button
                key={category.id}
                className={`flex flex-col items-center px-3 py-2 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer active:scale-95 ${
                  selected
                    ? 'border-orange-500 bg-orange-50 shadow-md'
                    : 'border-transparent bg-transparent hover:bg-gray-50 hover:border-gray-200'
                }`}
                style={{ flex: '1 1 0', maxWidth: 220 }}
                onClick={() => handleCategoryClick(category)}
                aria-pressed={selected}
                tabIndex={0}
              >
                <span className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full mb-1 transition-all duration-200 ${
                  selected ? 'bg-orange-500' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200 ${
                    selected ? 'text-white' : 'text-gray-600'
                  }`} />
                  <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border border-white shadow-sm ${
                    selected ? 'bg-white text-orange-500' : 'bg-orange-500 text-white'
                  }`}>
                    {category.count}
                  </span>
                </span>
                <span className={`text-xs font-medium text-center transition-colors duration-200 whitespace-normal break-words ${
                  selected ? 'text-orange-600' : 'text-gray-700'
                }`} style={{ maxWidth: 200 }}>
                  {category.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Subcategories */}
        {currentSelectedCategory && (
          <div className="border-t pt-3 md:pt-3">
            {loadingChildren ? (
              <div className="text-sm text-gray-400 py-2">Уншиж байна...</div>
            ) : subcategories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {subcategories.map((subcategory, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer ${
                      selectedSubcategory?.id === subcategory.id
                        ? 'bg-orange-100 border-orange-400 text-orange-700'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    <span className={`w-2 h-2 rounded-full mr-1 ${
                      selectedSubcategory?.id === subcategory.id ? 'bg-orange-500' : 'bg-gray-300'
                    }`}></span>
                    {subcategory.name}
                    {subcategory.count > 0 && (
                      <span className="ml-1 text-[10px] text-gray-400">{subcategory.count}</span>
                    )}
                  </button>
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
