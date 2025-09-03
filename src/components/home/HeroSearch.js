"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearch } from "@/contexts/SearchContext";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function HeroSearch() {
  const { searchQuery, selectedCategory, updateSearchQuery, updateSelectedCategory } = useSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory);

  // Sync local state with context state
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocalSelectedCategory(selectedCategory);
  }, [selectedCategory]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);

  // Define the 5 main categories
  const categories = [
    { id: "car", name: "АВТОМАШИН" },
    { id: "phone", name: "ГАР УТАС & ТАБЛЕТ" },
    { id: "computer", name: "КОМПЬЮТЕР" },
    { id: "accessory", name: "ҮНЭТ ЭДЛЭЛ" },
    { id: "electric", name: "ЦАХИЛГААН БАРАА" }
  ];

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    updateSearchQuery(value);
  };

  const handleCategoryChange = (category) => {
    console.log('HeroSearch: Category changed to:', category);
    setLocalSelectedCategory(category);
    updateSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    if (!isDropdownOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left
      });
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = () => {
    // Search functionality is handled by the context
    // This can be used for additional search actions if needed
    console.log('Searching for:', localSearchQuery, 'in category:', localSelectedCategory);
  };

  const getCategoryDisplayName = () => {
    if (!localSelectedCategory) return "Бүх ангилал";
    const category = categories.find(cat => cat.id === localSelectedCategory);
    return category ? category.name : "Бүх ангилал";
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
      {/* Background with SVG pattern */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <Image 
            src="/svg/search-background.svg" 
            alt="Search Background Pattern" 
            width={1200}
            height={220}
            className="opacity-100 w-full object-cover rounded-2xl"
            style={{ height: '220px' }}
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="mb-6">
          <h1 
            className="text-white mb-6 leading-tight font-bold uppercase font-tt-firs-neue-variable"
          >
            <span className="text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile xl:text-xl-mobile 2xl:text-2xl-mobile 3xl:text-3xl-mobile 4xl:text-4xl-mobile 5xl:text-5xl-mobile">
              ХҮССЭН БҮХНЭЭ ДУУДЛАГА
            </span>
          </h1>
          <h2 
            className="text-white leading-tight font-bold uppercase font-tt-firs-neue-variable"
          >
            <span className="text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile xl:text-xl-mobile 2xl:text-2xl-mobile 3xl:text-3xl-mobile 4xl:text-4xl-mobile 5xl:text-5xl-mobile">
              ХУДАЛДААНААС
            </span>
          </h2>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          {/* Mobile Layout - Search Input Only */}
          <div className="sm:hidden">
            {/* Search Container */}
            <div className="w-full search-container" style={{ marginRight: '10px' }}>
              <div className="bg-white rounded-full shadow-lg flex items-center">
                {/* Search Input */}
                <div className="flex-1 px-4 py-3">
                  <input
                    type="text"
                    placeholder="Барааны нэрээр хайх ..."
                    value={localSearchQuery}
                    onChange={handleSearchInputChange}
                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none text-sm font-tt-firs-neue-variable font-medium"
                  />
                </div>
                
                {/* Separator */}
                <div className="w-px h-6 bg-gray-300"></div>
                
                {/* Category Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <div 
                    className="px-4 py-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-r-full transition-colors"
                    onClick={handleDropdownToggle}
                  >
                    <span 
                      className="text-gray-600 text-sm font-tt-firs-neue-variable font-medium"
                    >
                      {getCategoryDisplayName()}
                    </span>
                    <Image 
                      src="/svg/dropdown-search.svg" 
                      alt="Dropdown" 
                      width={14}
                      height={14}
                      className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen && createPortal(
                    <div 
                      className="fixed w-72 bg-white border-2 border-orange-500 rounded-xl shadow-2xl"
                      style={{
                        top: dropdownPosition.top,
                        left: dropdownPosition.left,
                        zIndex: 9999,
                        position: 'fixed'
                      }}
                    >
                      <div className="py-3">
                        <div 
                          className={`px-4 py-3 cursor-pointer hover:bg-orange-50 text-sm font-tt-firs-neue-variable font-medium transition-colors ${
                            !localSelectedCategory ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500' : 'text-gray-700'
                          }`}
                          onClick={() => {
                            console.log('Clicked: Бүх ангилал');
                            handleCategoryChange('');
                          }}
                        >
                          Бүх ангилал
                        </div>
                        {categories.map((category) => (
                          <div 
                            key={category.id}
                            className={`px-4 py-3 cursor-pointer hover:bg-orange-50 text-sm font-tt-firs-neue-variable font-medium transition-colors ${
                              localSelectedCategory === category.id ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500' : 'text-gray-700'
                            }`}
                            onClick={() => {
                              console.log('Clicked category:', category.id, category.name);
                              handleCategoryChange(category.id);
                            }}
                          >
                            {category.name}
                          </div>
                        ))}
                      </div>
                    </div>,
                    document.body
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Side by Side */}
          <div className="hidden sm:flex items-center justify-center">
            {/* Search Container */}
            <div className="flex-1 max-w-3xl">
              <div className="bg-white rounded-full shadow-lg flex items-center">
                {/* Search Input */}
                <div className="flex-1 px-6 py-4">
                  <input
                    type="text"
                    placeholder="Барааны нэрээр хайх ..."
                    value={localSearchQuery}
                    onChange={handleSearchInputChange}
                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile font-tt-firs-neue-variable font-medium"
                  />
                </div>
                
                {/* Separator */}
                <div className="w-px h-8 bg-gray-300"></div>
                
                {/* Category Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <div 
                    className="px-6 py-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-r-full transition-colors"
                    onClick={handleDropdownToggle}
                  >
                    <span 
                      className="text-gray-600 text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile font-tt-firs-neue-variable font-medium"
                    >
                      {getCategoryDisplayName()}
                    </span>
                    <Image 
                      src="/svg/dropdown-search.svg" 
                      alt="Dropdown" 
                      width={16}
                      height={16}
                      className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen && createPortal(
                    <div 
                      className="fixed w-72 bg-white border-2 border-orange-500 rounded-xl shadow-2xl"
                      style={{
                        top: dropdownPosition.top,
                        left: dropdownPosition.left,
                        zIndex: 9999,
                        position: 'fixed'
                      }}
                    >
                      <div className="py-3">
                        <div 
                          className={`px-4 py-3 cursor-pointer hover:bg-orange-50 text-sm font-tt-firs-neue-variable font-medium transition-colors ${
                            !localSelectedCategory ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500' : 'text-gray-700'
                          }`}
                          onClick={() => {
                            console.log('Clicked: Бүх ангилал');
                            handleCategoryChange('');
                          }}
                        >
                          Бүх ангилал
                        </div>
                        {categories.map((category) => (
                          <div 
                            key={category.id}
                            className={`px-4 py-3 cursor-pointer hover:bg-orange-50 text-sm font-tt-firs-neue-variable font-medium transition-colors ${
                              localSelectedCategory === category.id ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500' : 'text-gray-700'
                            }`}
                            onClick={() => {
                              console.log('Clicked category:', category.id, category.name);
                              handleCategoryChange(category.id);
                            }}
                          >
                            {category.name}
                          </div>
                        ))}
                      </div>
                    </div>,
                    document.body
                  )}
                </div>
              </div>
            </div>
            
            {/* Search Button */}
            <div className="ml-4">
              <Button 
                onClick={handleSearch}
                className="rounded-full shadow-lg flex items-center justify-center font-tt-firs-neue-variable font-bold"
                style={{ 
                  width: '56px', 
                  height: '56px',
                  backgroundColor: '#FF4405'
                }}
              >
                <Image 
                  src="/svg/search1.svg" 
                  alt="Search" 
                  width={21}
                  height={21}
                  className="w-[21px] h-[21px]"
                />
              </Button>
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
} 