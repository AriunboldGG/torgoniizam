"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function TodayAuctions() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Mock data for today's auctions with proper structure (100 items for pagination demo)
  const allTodaysAuctions = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    image: `/images/${index % 8 === 0 ? 'live1' : index % 8 === 1 ? 'live2' : index % 8 === 2 ? 'live3' : index % 8 === 3 ? 'live4' : index % 8 === 4 ? 'end1' : index % 8 === 5 ? 'end2' : index % 8 === 6 ? 'end3' : 'end4'}.png`,
    badge: "ТУН УДАХГҮЙ",
    countdown: `${Math.floor(Math.random() * 24)} ${Math.floor(Math.random() * 60)} ${Math.floor(Math.random() * 60)} ${Math.floor(Math.random() * 60)}`,
    category: ["Үнэт эдлэл", "Цахилгаан бараа", "Компьютер", "Автомашин", "Гар утас, таблет"][index % 5],
    title: `Дуудлага худалдааны бараа ${index + 1} - ${["ЛУУТ АЛТАН ШАРМАЛ", "Том ухаалаг телевизор", "Цагаан тоглоомын консол", "Хар хүрэн SUV", "Ухаалаг гар утас", "Хар laptop", "Угаалгын машин", "Үнэт эдлэл"][index % 8]}`,
    price: `${(Math.random() * 50000000 + 100000).toLocaleString('en-US', { maximumFractionDigits: 0 })}₮`
  }));

  // Calculate pagination
  const totalPages = Math.ceil(allTodaysAuctions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const todaysAuctions = allTodaysAuctions.slice(startIndex, endIndex);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-5xl font-bold text-[#FF4405] mb-6"
            style={{
              fontFamily: 'TT Firs Neue Variable',
              fontWeight: 700,
              lineHeight: '1.2',
              letterSpacing: '2.4%',
              textTransform: 'uppercase'
            }}
          >
            Өнөөдөр болох дуудлага худалдаа
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Өнөөдрийн онцгой дуудлага худалдаануудыг үзээрэй.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              Нийт: {allTodaysAuctions.length} дуудлага
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-lg">
              Идэвхтэй: {allTodaysAuctions.filter(a => a.isLive).length}
            </Badge>
          </div>
        </div>
      </section>

      {/* Auctions Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <h2 
                className="text-2xl font-bold text-gray-900"
                style={{
                  fontFamily: 'TT Firs Neue Variable',
                  fontWeight: 700,
                  letterSpacing: '2.4%',
                  textTransform: 'uppercase'
                }}
              >
                Дуудлага худалдаанууд
              </h2>
              <Separator orientation="vertical" className="h-8" />
              <span className="text-gray-600">
                {startIndex + 1}-{Math.min(endIndex, allTodaysAuctions.length)} / {allTodaysAuctions.length} үр дүн
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
              <Link key={auction.id} href={`/auction/${auction.id}`} className="block">
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
              Хуудас {currentPage} / {totalPages} • Нийт {allTodaysAuctions.length} бараа
            </span>
          </div>
        </div>
      </section>
    </div>
  );
} 