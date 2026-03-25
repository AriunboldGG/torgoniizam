"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearch } from "@/contexts/SearchContext";
import { useState, useEffect } from "react";

export default function HeroSearch() {
  const { searchQuery, selectedCategory, updateSearchQuery } = useSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory);

  // Sync local state with context state
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocalSelectedCategory(selectedCategory);
  }, [selectedCategory]);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    updateSearchQuery(value);
  };

  const handleSearch = () => {
    // Search functionality is handled by the context
    // This can be used for additional search actions if needed
    console.log('Searching for:', localSearchQuery, 'in category:', localSelectedCategory);
  };

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