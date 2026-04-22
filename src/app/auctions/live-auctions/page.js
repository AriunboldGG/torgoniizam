"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import CategoryFilter from "@/components/auction/CategoryFilter";
import FilterSection from "@/components/auction/FilterSection";
import { MdAlarm, MdVisibility, MdLocationOn } from "react-icons/md";
import { getAssetUrl } from "@/lib/utils";

function computeTimeLeft(endDate) {
  if (!endDate) return '0:0:0'
  const diff = new Date(endDate).getTime() - Date.now()
  if (diff <= 0) return '0:0:0'
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return `${h}:${m}:${s}`
}

function mapActiveLot(lot) {
  const rawImages = Array.isArray(lot.images) ? lot.images : []
  const image = rawImages.length > 0
    ? getAssetUrl(typeof rawImages[0] === 'string' ? rawImages[0] : rawImages[0]?.url ?? rawImages[0]?.image ?? '/images/live1.png')
    : getAssetUrl(lot.thumbnail ?? '/images/live1.png')
  return {
    id: lot.id,
    title: lot.name ?? '',
    image,
    currentBid: lot.current_bid != null ? Number(lot.current_bid) : 0,
    startingPrice: lot.starting_price != null ? Number(lot.starting_price) : 0,
    timeLeft: computeTimeLeft(lot.end_date),
    bidders: lot.bid_count ??  0,
    category: lot.category?.value ?? lot.category?.name ?? '',
    subcategory: lot.subcategory?.value ?? lot.subcategory?.name ?? '',
    location: lot.city?.value ?? 'Улаанбаатар',
    isLive: true,
    date: lot.end_date ? new Date(lot.end_date) : new Date(),
    
  }
}

export default function LiveAuctionsPage() {
  const [liveAuctions, setLiveAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [categorySubcategoryNames, setCategorySubcategoryNames] = useState([]);
  const childrenCacheRef = useRef(new Map());
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const ITEMS_PER_PAGE = 25;

  useEffect(() => {
    const fetchLots = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const res = await fetch(`/api/lot/list?status=active&limit=${ITEMS_PER_PAGE}&offset=${offset}`)
        const json = await res.json()
        const raw = json?.results ?? json?.data?.results ?? json?.data ?? (Array.isArray(json) ? json : [])
        const count = json?.count ?? json?.data?.count ?? 0
        const list = Array.isArray(raw)
          ? raw.filter(lot => {
              const s = lot.status?.key ?? lot.status ?? ''
              return s === '' || s === 'active'
            })
          : []
        const mapped = list.map(mapActiveLot)
        setLiveAuctions(mapped)
        setFilteredAuctions(mapped)
        setTotalCount(count)
      } catch (err) {
        console.error('Failed to fetch live lots:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchLots()
  }, [currentPage]);

  // Filter auctions based on selected filters
  useEffect(() => {
    let filtered = [...liveAuctions]; // Create a copy to avoid mutating original array

    // Search filtering
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(auction => 
        auction.title.toLowerCase().includes(query) ||
        auction.category.toLowerCase().includes(query) ||
        auction.subcategory.toLowerCase().includes(query)
      );
    }

    // Category and subcategory filtering
    if (selectedSubcategory) {
      const subName = selectedSubcategory.name.toLowerCase();
      filtered = filtered.filter(auction =>
        auction.subcategory.toLowerCase() === subName ||
        auction.category.toLowerCase() === subName
      );
    } else if (selectedCategory) {
      if (categorySubcategoryNames.length > 0) {
        filtered = filtered.filter(auction =>
          categorySubcategoryNames.includes(auction.category.toLowerCase()) ||
          categorySubcategoryNames.includes(auction.subcategory.toLowerCase())
        );
      } else {
        filtered = filtered.filter(auction =>
          auction.category.toLowerCase() === selectedCategory.name.toLowerCase()
        );
      }
    }

    // Date filtering
    if (selectedDateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      const thisWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const nextWeek = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
      const thisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 1);

      filtered = filtered.filter(auction => {
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
          filtered = filtered.filter(auction => auction.currentBid >= parseInt(minPrice));
        }
        if (maxPrice) {
          filtered = filtered.filter(auction => auction.currentBid <= parseInt(maxPrice));
        }
      } else {
        // Sort the filtered array
        filtered = [...filtered].sort((a, b) => {
          if (selectedPriceFilter === 'low-to-high') {
            return a.currentBid - b.currentBid;
          } else if (selectedPriceFilter === 'high-to-low') {
            return b.currentBid - a.currentBid;
          }
          return 0;
        });
      }
    }

    setFilteredAuctions(filtered);
  }, [liveAuctions, selectedCategory, selectedSubcategory, categorySubcategoryNames, selectedDateFilter, selectedPriceFilter, minPrice, maxPrice, searchQuery]);

  // Reset to page 1 when any filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubcategory, selectedDateFilter, selectedPriceFilter, minPrice, maxPrice, searchQuery]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    const children = category ? (childrenCacheRef.current.get(category.id) ?? []) : [];
    setCategorySubcategoryNames(children.map((s) => s.name.toLowerCase()));
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleDateFilterChange = (value) => {
    setSelectedDateFilter(value);
  };

  const handlePriceFilterChange = (value) => {
    setSelectedPriceFilter(value);
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price);
  };

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Pagination logic — driven by backend total count
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const currentAuctions = filteredAuctions;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              ? 'text-white bg-orange-500 border border-orange-500'
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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
              <h1 
                className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase font-tt-firs-neue-variable"
              >
                ЯВАГДАЖ БУЙ ДУУДЛАГА ХУДАЛДАА
              </h1>
            </div>
           
          </div>
          <p className="text-gray-600 mt-2">
            Одоо {filteredAuctions.length} дуудлага худалдаа явагдаж байна
            {selectedCategory && (
              <span className="ml-2 text-orange-600">
                • {selectedCategory.name}
                {selectedSubcategory && ` • ${selectedSubcategory.name}`}
              </span>
            )}
          </p>
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

      {/* Live Auctions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAuctions.map((auction) => (
            <div key={auction.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Live Badge */}
              <div className="relative">
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                </div>
                
                {/* Timer */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <MdAlarm className="text-base" /> {formatTime(auction.timeLeft)}
                  </div>
                </div>

                {/* Image */}
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src={auction.image}
                    alt={auction.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="mb-3">
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {auction.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {auction.title}
                </h3>

                {/* Location */}
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MdLocationOn className="w-4 h-4 mr-1 text-orange-500" />
                  {auction.location}
                </div>

                {/* Bidding Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Одоогийн санал:</span>
                    <span className="text-xl font-bold text-green-600">
                      ₮{formatPrice(auction.currentBid)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Эхлэх үнэ:</span>
                    <span className="text-gray-900 font-medium">
                      ₮{formatPrice(auction.startingPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Оролцож буй:</span>
                    <span className="text-blue-600 font-medium">
                      {auction.bidders} хүн
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link href={`/auction/${auction.id}`}  rel="noopener noreferrer">
                    <Button variant="outline" className="px-4 font-tt-firs-neue-variable font-medium text-base leading-6 text-gray-600 hover:bg-gray-50 flex items-center gap-1.5">
                      <MdVisibility className="text-lg" /> Дэлгэрэнгүй
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            {/* Pagination Info */}
            <div className="text-center mb-6 text-gray-600">
              <span className="text-sm">
                Нийт {totalCount} бараа • {currentPage}/{totalPages} хуудас
              </span>
            </div>
            
            {/* Pagination Buttons */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-0">
                {renderPaginationButtons()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
