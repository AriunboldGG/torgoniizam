"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MdCalendarToday, MdLocationOn, MdBarChart } from "react-icons/md";
import { getAssetUrl } from "@/lib/utils";

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('mn-MN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

      {/* Completed Auctions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedAuctions.map((auction) => (
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
                  <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <MdCalendarToday className="text-base" /> {formatDate(auction.endDate)}
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
                    <span className="text-gray-600 text-sm">Эцсийн үнэ:</span>
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
                  <Link href={`/auction/completed/${auction.id}`} target="_blank" rel="noopener noreferrer">
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
        {Math.ceil(totalCount / ITEMS_PER_PAGE) > 1 && (
          <div className="mt-12">
            <div className="text-center mb-6 text-gray-600">
              <span className="text-sm">Нийт {totalCount} бараа • {currentPage}/{Math.ceil(totalCount / ITEMS_PER_PAGE)} хуудас</span>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center space-x-0">
                {currentPage > 1 && (
                  <button
                    onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 hover:text-gray-700 transition-colors"
                  >
                    Өмнөх
                  </button>
                )}
                {Array.from({ length: Math.ceil(totalCount / ITEMS_PER_PAGE) }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === Math.ceil(totalCount / ITEMS_PER_PAGE) || Math.abs(p - currentPage) <= 2)
                  .map((p, idx, arr) => (
                    <>
                      {idx > 0 && arr[idx - 1] !== p - 1 && (
                        <span key={`ellipsis-${p}`} className="px-3 py-2 text-sm text-gray-400 border border-gray-300 bg-white">...</span>
                      )}
                      <button
                        key={p}
                        onClick={() => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`px-3 py-2 text-sm font-medium transition-colors ${
                          p === currentPage
                            ? 'text-white bg-green-500 border border-green-500'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                        }`}
                      >
                        {p}
                      </button>
                    </>
                  ))
                }
                {currentPage < Math.ceil(totalCount / ITEMS_PER_PAGE) && (
                  <button
                    onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 hover:text-gray-700 transition-colors"
                  >
                    Дараах
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
