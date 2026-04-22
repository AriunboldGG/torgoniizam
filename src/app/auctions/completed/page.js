"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MdCalendarToday, MdLocationOn, MdBarChart } from "react-icons/md";
import { getAssetUrl } from "@/lib/utils";
import CategoryFilter from "@/components/auction/CategoryFilter";

function mapCompletedLot(lot) {
  console.log('Mapping lot:', lot);
  const rawImages = Array.isArray(lot.images) ? lot.images : []
  const image = rawImages.length > 0
    ? getAssetUrl(typeof rawImages[0] === 'string' ? rawImages[0] : rawImages[0]?.url ?? rawImages[0]?.image ?? '/images/completed-section.png')
    : getAssetUrl(lot.thumbnail ?? '/images/completed-section.png')
  return {
    id: lot.id,
    title: lot.name ?? '',
    finalPrice: lot.final_price != null ? Number(lot.final_price) : (lot.current_bid != null ? Number(lot.current_bid) : 0),
    startingPrice: lot.starting_price != null ? Number(lot.starting_price) : 0,
    endDate: lot.end_date ?? '',
    bidders: lot.bidder_count ?? 0,
    image,
    category: lot.category?.value ?? lot.category?.name ?? '',
    location: lot.address ?? '',
    winner: lot.winner?.value ?? lot.winner?.name ?? '',
    isCompleted: true,
  }
}

export default function CompletedAuctionsPage() {
  const [completedAuctions, setCompletedAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [categorySubcategoryNames, setCategorySubcategoryNames] = useState([]);
  const childrenCacheRef = useRef(new Map());
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('all');
  const ITEMS_PER_PAGE = 25;

  useEffect(() => {
    const fetchLots = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const res = await fetch(`/api/lot/list?status=expired&limit=${ITEMS_PER_PAGE}&offset=${offset}`)
        const json = await res.json()
        const raw = json?.results ?? json?.data?.results ?? json?.data ?? (Array.isArray(json) ? json : [])
        const count = json?.count ?? json?.data?.count ?? 0
        const list = Array.isArray(raw)
          ? raw.filter(lot => {
              const s = lot.status?.key ?? lot.status ?? ''
              return s === '' || s === 'expired'
            })
          : []
        setCompletedAuctions(list.map(mapCompletedLot))
        setTotalCount(count)
      } catch (err) {
        console.error('Failed to fetch completed lots:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchLots()
  }, [currentPage]);

  // Category/subcategory filter logic (client-side)
  let filteredAuctions = completedAuctions;
  if (selectedSubcategory) {
    const subName = (typeof selectedSubcategory === 'string' ? selectedSubcategory : selectedSubcategory.name).toLowerCase();
    filteredAuctions = filteredAuctions.filter(a =>
      a.category.toLowerCase() === subName
    );
  } else if (selectedCategory) {
    if (categorySubcategoryNames.length > 0) {
      filteredAuctions = filteredAuctions.filter(a =>
        categorySubcategoryNames.includes(a.category.toLowerCase())
      );
    } else {
      filteredAuctions = filteredAuctions.filter(a =>
        a.category.toLowerCase() === selectedCategory.name.toLowerCase()
      );
    }
  }

  // Date filtering
  if (selectedDateFilter !== 'all') {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 1);
    filteredAuctions = filteredAuctions.filter(auction => {
      const d = new Date(auction.endDate);
      switch (selectedDateFilter) {
        case 'this-week': return d >= today && d < thisWeek;
        case 'this-month': return d >= today && d < thisMonth;
        case 'next-month': return d >= thisMonth && d < nextMonth;
        default: return true;
      }
    });
  }

  // Price sorting
  if (selectedPriceFilter === 'low-to-high') {
    filteredAuctions = [...filteredAuctions].sort((a, b) => a.finalPrice - b.finalPrice);
  } else if (selectedPriceFilter === 'high-to-low') {
    filteredAuctions = [...filteredAuctions].sort((a, b) => b.finalPrice - a.finalPrice);
  }

  // Handlers for CategoryFilter
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setCurrentPage(1);
    const children = category ? (childrenCacheRef.current.get(category.id) ?? []) : [];
    setCategorySubcategoryNames(children.map((s) => s.name.toLowerCase()));
  };
  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    if (currentPage > 1) {
      buttons.push(
        <button key="prev" onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 hover:text-gray-700 transition-colors">
          Өмнөх
        </button>
      );
    }
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button key={i} onClick={() => { setCurrentPage(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`px-3 py-2 text-sm font-medium transition-colors ${
          i === currentPage ? 'text-white bg-[#FF4405] border border-[#FF4405]' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
        }`}>
          {i}
        </button>
      );
    }
    if (currentPage < totalPages) {
      buttons.push(
        <button key="next" onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 hover:text-gray-700 transition-colors">
          Дараах
        </button>
      );
    }
    return buttons;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['1-р сар','2-р сар','3-р сар','4-р сар','5-р сар','6-р сар','7-р сар','8-р сар','9-р сар','10-р сар','11-р сар','12-р сар'];
    return `${date.getFullYear()} оны ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
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
              <div className="w-1 h-8 bg-green-500 rounded-full"></div>
              <h1 
                className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase font-tt-firs-neue-variable"
              >
                ДУУССАН ДУУДЛАГА ХУДАЛДАА
              </h1>
            </div>
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

      {/* Completed Auctions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Row */}
        <div className="flex items-center justify-end gap-3 mb-6">
          <select
            value={selectedDateFilter}
            onChange={(e) => { setSelectedDateFilter(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">Бүгд</option>
            <option value="this-week">Энэ долоо хоног</option>
            <option value="this-month">Энэ сар</option>
            <option value="next-month">Дараагийн сар</option>
          </select>
          <select
            value={selectedPriceFilter}
            onChange={(e) => { setSelectedPriceFilter(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">Сонгох</option>
            <option value="low-to-high">Үнэ өсөх</option>
            <option value="high-to-low">Үнэ буурах</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => (
            <div key={auction.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Completed Badge */}
              <div className="relative">
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>ДУУССАН</span>
                  </div>
                </div>
                {/* End Date */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-gray-800 text-white px-3 py-1 rounded-xl text-xs font-bold flex flex-col items-end gap-0.5">
                    <span className="flex items-center gap-1"><MdCalendarToday className="text-sm" /> {formatDate(auction.endDate)}</span>
                    <span className="text-gray-300 text-[11px]">{formatTime(auction.endDate)}</span>
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
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
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
                {/* Auction Results */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Сонгох:</span>
                    <span className="text-xl font-bold text-green-600">
                      ₮{formatPrice(auction.finalPrice)}
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
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Ялагч:</span>
                    <span className="text-purple-600 font-medium">
                      {auction.winner}
                    </span>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link href={`/auction/completed/${auction.id}`}  rel="noopener noreferrer">
                    <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white flex items-center gap-1.5">
                      <MdBarChart className="text-lg" /> Дэлгэрэнгүй
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
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
            Хуудас {currentPage} / {totalPages} • Нийт {totalCount} бараа
          </span>
        </div>
      </div>
    </div>
  );
}
