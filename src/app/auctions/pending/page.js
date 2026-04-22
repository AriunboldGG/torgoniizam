"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import CategoryFilter from "@/components/auction/CategoryFilter"
import FilterSection from "@/components/auction/FilterSection"
import { getAssetUrl } from "@/lib/utils"

function computeStartCountdown(startDate) {
  if (!startDate) return 'Удахгүй'
  const diff = new Date(startDate).getTime() - Date.now()
  if (diff <= 0) return 'Эхэлсэн'
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return d > 0 ? `${d}өдөр ${h}ц` : `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

function mapPendingLot(lot) {
  const rawImages = Array.isArray(lot.images) ? lot.images : []
  const image = rawImages.length > 0
    ? getAssetUrl(typeof rawImages[0] === 'string' ? rawImages[0] : rawImages[0]?.url ?? rawImages[0]?.image ?? '/images/pending1.png')
    : getAssetUrl(lot.thumbnail ?? '/images/pending1.png')
  const price = lot.starting_price != null ? Number(lot.starting_price) : 0
  return {
    id: lot.id,
    image,
    badge: 'ХҮЛЭЭГДЭЖ БУЙ',
    countdown: computeStartCountdown(lot.start_date),
    category: lot.category?.value ?? lot.category?.name ?? '',
    subcategory: lot.subcategory?.value ?? lot.subcategory?.name ?? '',
    title: lot.name ?? '',
    price: `${price.toLocaleString('mn-MN')}₮`,
    currentBid: price,
    date: lot.start_date ? new Date(lot.start_date) : new Date(),
  }
}

export default function PendingAuctions() {
  const [allPendingAuctions, setAllPendingAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [categorySubcategoryNames, setCategorySubcategoryNames] = useState([]);
  const childrenCacheRef = useRef(new Map());
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
        const list = json?.data?.results ?? json?.results ?? json?.data ?? (Array.isArray(json) ? json : [])

        setAllPendingAuctions(list.map(mapPendingLot))
      } catch (err) {
        console.error('Failed to fetch pending lots:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchLots()
  }, []);

  // Filter auctions based on selected filters
  let filteredAuctions = [...allPendingAuctions].filter(auction => {
    // Search filtering
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      if (!auction.title.toLowerCase().includes(query) &&
          !auction.category.toLowerCase().includes(query) &&
          !auction.subcategory.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Subcategory filter
    if (selectedSubcategory) {
      const subName = (typeof selectedSubcategory === 'string' ? selectedSubcategory : selectedSubcategory.name).toLowerCase();
      return auction.subcategory.toLowerCase() === subName || auction.category.toLowerCase() === subName;
    }

    // Parent category filter — match any lot whose category is one of the children
    if (selectedCategory) {
      if (categorySubcategoryNames.length > 0) {
        return categorySubcategoryNames.includes(auction.category.toLowerCase()) ||
               categorySubcategoryNames.includes(auction.subcategory.toLowerCase());
      } else {
        return auction.category.toLowerCase() === selectedCategory.name.toLowerCase();
      }
    }

    return true;
  });

  // Date filtering
  if (selectedDateFilter !== 'all') {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const thisWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const nextWeek = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 1);

    filteredAuctions = filteredAuctions.filter(auction => {
      const auctionDate = new Date(auction.date);
      switch (selectedDateFilter) {
        case 'today':
          return auctionDate >= today && auctionDate < tomorrow;
        case 'tomorrow':
          return auctionDate >= tomorrow && auctionDate < new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000);
        case 'this-week':
          return auctionDate >= today && auctionDate < thisWeek;
        case 'next-week':
          return auctionDate >= thisWeek && auctionDate < nextWeek;
        case 'this-month':
          return auctionDate >= today && auctionDate < thisMonth;
        case 'next-month':
          return auctionDate >= thisMonth && auctionDate < nextMonth;
        default:
          return true;
      }
    });
  }

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
  const pendingAuctions = filteredAuctions.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setCurrentPage(1);
    const children = category ? (childrenCacheRef.current.get(category.id) ?? []) : [];
    setCategorySubcategoryNames(children.map((s) => s.name.toLowerCase()));
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
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-[#FF4405] rounded-full"></div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#FF4405] uppercase font-tt-firs-neue-variable">
              Хүлээгдэж буй дуудлага худалдаа
            </h1>
          </div>
        </div>
      </div>

      {/* Category Filter Section */}
      <div className="py-8">
        <CategoryFilter 
          onCategorySelect={handleCategorySelect}
          onSubcategorySelect={handleSubcategorySelect}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onChildrenCacheReady={(cache) => { childrenCacheRef.current = cache }}
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
                Хүлээгдэж буй дуудлага худалдаанууд
              </h2>
              <Separator orientation="vertical" className="h-8" />
              <span className="text-gray-600">
                {startIndex + 1}-{Math.min(endIndex, allPendingAuctions.length)} / {allPendingAuctions.length} үр дүн
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={selectedDateFilter}
                onChange={(e) => handleDateFilterChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4405] focus:border-transparent"
              >
                <option value="all">Бүгд</option>
                <option value="this-week">Энэ долоо хоног</option>
                <option value="this-month">Энэ сар</option>
                <option value="next-month">Дараагийн сар</option>
              </select>
              <select
                value={selectedPriceFilter}
                onChange={(e) => handlePriceFilterChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4405] focus:border-transparent"
              >
                <option value="all">Эхлэх хугацаа</option>
                <option value="low-to-high">Үнэ өсөх</option>
                <option value="high-to-low">Үнэ буурах</option>
              </select>
            </div>
          </div>

          {/* Auctions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pendingAuctions.map((auction) => (
              <Link key={auction.id} href={`/auction/pending/${auction.id}`} target="_blank" rel="noopener noreferrer" className="block">
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
              Хуудас {currentPage} / {totalPages} • Нийт {allPendingAuctions.length} бараа
            </span>
          </div>
        </div>
      </section>
    </div>
  );
} 