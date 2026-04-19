"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CategoryFilter from "@/components/auction/CategoryFilter";
import FilterSection from "@/components/auction/FilterSection";
import { getAssetUrl } from "@/lib/utils";

function computeCountdown(startDate) {
  if (!startDate) return 'Удахгүй'
  const diff = new Date(startDate).getTime() - Date.now()
  if (diff <= 0) return 'Эхэлсэн'
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

function mapLot(lot) {
  const rawImages = Array.isArray(lot.images) ? lot.images : []
  const image = rawImages.length > 0
    ? getAssetUrl(typeof rawImages[0] === 'string' ? rawImages[0] : rawImages[0]?.url ?? rawImages[0]?.image ?? '/images/live1.png')
    : getAssetUrl(lot.thumbnail ?? '/images/live1.png')
  const price = lot.starting_price != null ? Number(lot.starting_price) : 0
  return {
    id: lot.id,
    image,
    badge: 'ТУН УДАХГҮЙ',
    countdown: computeCountdown(lot.start_date),
    category: lot.category?.value ?? lot.category?.name ?? '',
    subcategory: lot.subcategory?.value ?? lot.subcategory?.name ?? '',
    title: lot.name ?? '',
    price: `${price.toLocaleString('mn-MN')}₮`,
    currentBid: price,
    startDate: lot.start_date ? new Date(lot.start_date) : null,
  }
}

export default function TodayAuctions() {
  const [allTodaysAuctions, setAllTodaysAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const res = await fetch('/api/lot/list?status=pending&limit=100&offset=0')
        const json = await res.json()
        const list = json?.results ?? json?.data ?? (Array.isArray(json) ? json : [])

        // Keep only lots whose start_date is within the next 24 hours
        const now = Date.now()
        const in24h = now + 24 * 60 * 60 * 1000
        const today = list.filter(lot => {
          if (!lot.start_date) return false
          const t = new Date(lot.start_date).getTime()
          return t >= now && t <= in24h
        })

        setAllTodaysAuctions(today.map(mapLot))
      } catch (err) {
        console.error('Failed to fetch today lots:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchLots()
  }, []);

  // Filter auctions based on selected filters
  let filteredAuctions = [...allTodaysAuctions].filter(auction => {
    // Search filtering
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      if (!auction.title.toLowerCase().includes(query) &&
          !auction.category.toLowerCase().includes(query) &&
          !auction.subcategory.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Category and subcategory filtering
    if (selectedCategory && auction.category !== selectedCategory.name) {
      return false;
    }
    if (selectedSubcategory && auction.subcategory !== selectedSubcategory.name) {
      return false;
    }
    return true;
  });

  // Price filtering and sorting
  if (selectedPriceFilter !== 'all') {
    if (selectedPriceFilter === 'range') {
      if (minPrice) {
        filteredAuctions = filteredAuctions.filter(auction => auction.currentBid >= parseInt(minPrice));
      }
      if (maxPrice) {
        filteredAuctions = filteredAuctions.filter(auction => auction.currentBid <= parseInt(maxPrice));
      }
    } else {
      // Sort the filtered array
      filteredAuctions = [...filteredAuctions].sort((a, b) => {
        if (selectedPriceFilter === 'low-to-high') {
          return a.currentBid - b.currentBid;
        } else if (selectedPriceFilter === 'high-to-low') {
          return b.currentBid - a.currentBid;
        }
        return 0;
      });
    }
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const todaysAuctions = filteredAuctions.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); // Reset subcategory when category changes
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleDateFilterChange = (value) => {
    setSelectedDateFilter(value);
    setCurrentPage(1);
  };

  const handlePriceFilterChange = (value) => {
    setSelectedPriceFilter(value);
    setCurrentPage(1);
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          Өмнөх
        </button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            i === currentPage
              ? 'text-white bg-[#FF4405] border border-[#FF4405]'
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          Дараах
        </button>
      );
    }

    return buttons;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Уншиж байна...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-5xl font-bold text-[#FF4405] mb-6 font-tt-firs-neue-variable tracking-[2.4%] uppercase"
          >
            Өнөөдөр болох дуудлага худалдаа
          </h1>
        
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              Нийт: {filteredAuctions.length} дуудлага
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-lg">
              Идэвхтэй: {filteredAuctions.filter(a => a.isLive).length}
            </Badge>
            {selectedCategory && (
              <Badge variant="default" className="px-4 py-2 text-lg bg-orange-500">
                {selectedCategory.name}
                {selectedSubcategory && ` • ${selectedSubcategory.name}`}
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <div className="py-8">
        <CategoryFilter 
          onCategorySelect={handleCategorySelect}
          onSubcategorySelect={handleSubcategorySelect}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
        />
      </div>

      {/* Additional Filters Section */}
      <div className="pb-8">
        <FilterSection 
          onDateFilterChange={handleDateFilterChange}
          onPriceFilterChange={handlePriceFilterChange}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
          onSearchChange={handleSearchChange}
          selectedDateFilter={selectedDateFilter}
          selectedPriceFilter={selectedPriceFilter}
          minPrice={minPrice}
          maxPrice={maxPrice}
          searchQuery={searchQuery}
        />
      </div>

      {/* Auctions Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <h2 
                className="text-2xl font-bold text-gray-900 font-tt-firs-neue-variable tracking-[2.4%] uppercase"
              >
                Дуудлага худалдаанууд
              </h2>
              <Separator orientation="vertical" className="h-8" />
              <span className="text-gray-600">
                {startIndex + 1}-{Math.min(endIndex, filteredAuctions.length)} / {filteredAuctions.length} үр дүн
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4405] focus:border-transparent">
                <option>Бүгд</option>
                <option>Идэвхтэй</option>
                <option>Дууссан</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4405] focus:border-transparent">
                <option>Хамгийн сүүлд</option>
                <option>Үнэ өсөх</option>
                <option>Үнэ буурах</option>
              </select>
            </div>
          </div>

          {/* Auctions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {todaysAuctions.map((auction) => (
              <Link key={auction.id} href={`/auction/${auction.id}`} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white border border-gray-200 cursor-pointer group">
                  {/* Image Section with Badge and Countdown */}
                  <div className="relative aspect-square bg-white overflow-hidden">
                    <Image
                      src={auction.image}
                      alt={auction.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Orange Badge */}
                    <div className="absolute top-2 right-2 bg-[#FF4405] text-white px-3 py-1 rounded-lg text-xs font-bold">
                      {auction.badge}
                    </div>
                    
                    {/* Countdown Timer Overlay */}
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-xs font-bold">
                      {auction.countdown}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    {/* Category */}
                    <div className="mb-2">
                      <span className="text-sm text-gray-600 font-medium">
                        {auction.category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <CardTitle className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-[#FF4405] transition-colors duration-200">
                      {auction.title}
                    </CardTitle>
                    
                    {/* Price */}
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-[#FF4405]">
                        {auction.price}
                      </span>
                      {/* View Details Arrow */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-5 h-5 text-[#FF4405]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-0">
                {renderPaginationButtons()}
              </div>
            </div>
          )}

          {/* Page Info */}
          <div className="text-center mt-6 text-gray-600">
            <span className="text-sm">
               Нийт {filteredAuctions.length} бараа
            </span>
          </div>
        </div>
      </section>
    </div>
  );
} 