"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CategoryFilter from "./CategoryFilter";

export default function SearchFilters({ onSearch, onFilterChange, activeFilters = [] }) {
  const categories = [
    "All", "Luxury", "Antiques", "Art", "Electronics", "Sports", 
    "Collectibles", "Jewelry", "Vehicles", "Real Estate"
  ];

  const priceRanges = [
    "All Prices", "Under $100", "$100 - $500", "$500 - $1,000", 
    "$1,000 - $5,000", "$5,000+"
  ];

  const handleCategoryClick = (category) => {
    if (category === "All") {
      onFilterChange({ type: "category", value: null });
    } else {
      onFilterChange({ type: "category", value: category });
    }
  };

  const handlePriceRangeClick = (range) => {
    if (range === "All Prices") {
      onFilterChange({ type: "priceRange", value: null });
    } else {
      onFilterChange({ type: "priceRange", value: range });
    }
  };

  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
    // Handle category selection
  };

  const handleSubcategorySelect = (data) => {
    console.log("Selected subcategory:", data);
    // Handle subcategory selection
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 search">
      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex gap-2">
          <Input 
            placeholder="Search auctions, items, or categories..."
            className="flex-1"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Button>Search</Button>
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter 
        onCategorySelect={handleCategorySelect}
        onSubcategorySelect={handleSubcategorySelect}
      />

      {/* Additional Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={activeFilters.includes(category) ? "default" : "outline"}
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Price Ranges */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Price Range</h3>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <Badge
                key={range}
                variant={activeFilters.includes(range) ? "default" : "outline"}
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => handlePriceRangeClick(range)}
              >
                {range}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            🔴 Live Auctions
          </Button>
          <Button variant="outline" size="sm">
            ⏰ Ending Soon
          </Button>
          <Button variant="outline" size="sm">
            🆕 New Items
          </Button>
          <Button variant="outline" size="sm">
            💰 No Reserve
          </Button>
        </div>
      </div>
    </div>
  );
} 