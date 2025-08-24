"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CategoryFilter from "./CategoryFilter";
import Image from "next/image";

export default function SearchFilters({ onSearch, onFilterChange, activeFilters = [] }) {
  console.log("SearchFilters component rendered with props:", { onSearch, onFilterChange, activeFilters });
  
  // Test alert to see if component loads
  useEffect(() => {
    alert("SearchFilters component loaded!");
  }, []);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Бүх ангилал");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Main categories from CategoryFilter
  const mainCategories = [
    {
      id: "car",
      name: "АВТОМАШИН",
      icon: "/svg/filter/car.svg",
      count: 16
    },
    {
      id: "phone",
      name: "ГАР УТАС & ТАБЛЕТ",
      icon: "/svg/filter/phone.svg",
      count: 25
    },
    {
      id: "computer",
      name: "КОМПЬЮТЕР",
      icon: "/svg/filter/computer.svg",
      count: 34
    },
    {
      id: "accessory",
      name: "ҮНЭТ ЭДЛЭЛ",
      icon: "/svg/filter/accessory.svg",
      count: 62
    },
    {
      id: "electric",
      name: "ЦАХИЛГААН БАРАА",
      icon: "/svg/filter/electric.svg",
      count: 8
    }
  ];

  const priceRanges = [
    "All Prices", "Under $100", "$100 - $500", "$500 - $1,000", 
    "$1,000 - $5,000", "$5,000+"
  ];

  const handleSearch = (query) => {
    console.log("Search query:", query);
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSearchButtonClick = () => {
    console.log("Search button clicked with query:", searchQuery);
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        // Default search behavior if no callback provided
        console.log("Performing default search for:", searchQuery);
        // You can add default search logic here
        alert(`Хайлт хийж байна: ${searchQuery}`);
      }
    } else {
      alert("Хайх утга оруулна уу!");
    }
  };

  const handleCategorySelect = (category) => {
    console.log("Category selected:", category);
    setSelectedCategory(category.name);
    setIsCategoryDropdownOpen(false);
    if (onFilterChange) {
      onFilterChange({ type: "category", value: category.id });
    }
  };

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

  const handleSubcategorySelect = (data) => {
    console.log("Selected subcategory:", data);
    // Handle subcategory selection
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 search">
      {/* Simple Test */}
      <div className="bg-green-500 text-white p-8 text-center text-2xl font-bold rounded-lg mb-4">
        🎯 SEARCHFILTERS IS WORKING!
        <br />
        <button 
          onClick={() => alert("Button clicked!")}
          className="bg-white text-green-500 px-6 py-3 rounded-lg text-lg mt-4 hover:bg-gray-100"
        >
          CLICK ME TO TEST
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex gap-2">
          <Input 
            placeholder="Барааны нэрээр хайх ..."
            className="flex-1"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearchButtonClick();
              }
            }}
          />
          
          {/* Category Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="flex items-center space-x-3 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[200px]"
            >
              <span className="text-gray-700 font-medium">{selectedCategory}</span>
              <Image 
                src="/svg/dropdown-search.svg" 
                alt="Dropdown" 
                width={16}
                height={16}
                className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            {/* Dropdown Menu */}
            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {mainCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center space-x-3"
                  >
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <span className="text-gray-700 font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500 ml-auto">({category.count})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Button onClick={handleSearchButtonClick}>Хайх</Button>
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
          <h3 className="text-sm font-medium text-slate-700 mb-3">Ангилалууд</h3>
          <div className="flex flex-wrap gap-2">
            {mainCategories.map((category) => (
              <Badge
                key={category.id}
                variant={activeFilters.includes(category.id) ? "default" : "outline"}
                className="cursor-pointer hover:bg-slate-100 flex items-center space-x-2"
                onClick={() => handleCategoryClick(category.id)}
              >
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span>{category.name}</span>
                <span className="text-xs text-gray-500">({category.count})</span>
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