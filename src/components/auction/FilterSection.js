"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FilterSection({ 
  onDateFilterChange, 
  onPriceFilterChange, 
  onMinPriceChange, 
  onMaxPriceChange,
  onSearchChange,
  selectedDateFilter,
  selectedPriceFilter,
  minPrice,
  maxPrice,
  searchQuery
}) {
  const [showPriceRange, setShowPriceRange] = useState(false)

  const handlePriceFilterChange = (value) => {
    onPriceFilterChange(value)
    setShowPriceRange(value === 'range')
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search Filter */}
          <div className="flex-1">
            <Label htmlFor="search-filter" className="text-sm font-medium text-gray-700 mb-2 block">
              Хайх
            </Label>
            <Input
              type="text"
              placeholder="Барааны нэр, ангилал, дэд ангилал..."
              value={searchQuery || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Date Filter */}
          <div className="flex-1">
            <Label htmlFor="date-filter" className="text-sm font-medium text-gray-700 mb-2 block">
              Огноогоор шүүх
            </Label>
            <Select value={selectedDateFilter} onValueChange={onDateFilterChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Огноо сонгох" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Бүх огноо</SelectItem>
                <SelectItem value="today">Өнөөдөр</SelectItem>
                <SelectItem value="tomorrow">Маргааш</SelectItem>
                <SelectItem value="this-week">Энэ долоо хоног</SelectItem>
                <SelectItem value="next-week">Дараа долоо хоног</SelectItem>
                <SelectItem value="this-month">Энэ сар</SelectItem>
                <SelectItem value="next-month">Дараа сар</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Filter */}
          <div className="flex-1">
            <Label htmlFor="price-filter" className="text-sm font-medium text-gray-700 mb-2 block">
              Үнээр эрэмбэлэх
            </Label>
            <Select value={selectedPriceFilter} onValueChange={handlePriceFilterChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Үнэ сонгох" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Бүх үнэ</SelectItem>
                <SelectItem value="low-to-high">Багаас өндөр</SelectItem>
                <SelectItem value="high-to-low">Өндрөөс бага</SelectItem>
                <SelectItem value="range">Үнийн хязгаар</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Inputs */}
          {showPriceRange && (
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Үнийн хязгаар (₮)
              </Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Хамгийн бага"
                    value={minPrice || ''}
                    onChange={(e) => onMinPriceChange(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Хамгийн өндөр"
                    value={maxPrice || ''}
                    onChange={(e) => onMaxPriceChange(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                onDateFilterChange('all')
                onPriceFilterChange('all')
                onMinPriceChange('')
                onMaxPriceChange('')
                onSearchChange('')
                setShowPriceRange(false)
              }}
              className="whitespace-nowrap"
            >
              Цэвэрлэх
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
