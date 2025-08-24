"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CompletedAuctionsPage() {
  const [completedAuctions, setCompletedAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for completed auctions
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCompletedAuctions([
        {
          id: 1,
          title: "Toyota Land Cruiser 2020",
          finalPrice: 52000000,
          startingPrice: 40000000,
          endDate: "2024-01-15",
          bidders: 15,
          image: "/images/completed-section.png",
          category: "АВТОМАШИН",
          location: "Улаанбаатар",
          winner: "Бат-Эрдэнэ",
          isCompleted: true
        },
        {
          id: 2,
          title: "iPhone 15 Pro Max 256GB",
          finalPrice: 3200000,
          startingPrice: 2500000,
          endDate: "2024-01-14",
          bidders: 12,
          image: "/images/completed-section.png",
          category: "ГАР УТАС & ТАБЛЕТ",
          location: "Улаанбаатар",
          winner: "Сүхээ",
          isCompleted: true
        },
        {
          id: 3,
          title: "MacBook Pro M3 14-inch",
          finalPrice: 9500000,
          startingPrice: 8000000,
          endDate: "2024-01-13",
          bidders: 18,
          image: "/images/completed-section.png",
          category: "КОМПЬЮТЕР",
          location: "Улаанбаатар",
          winner: "Төгс",
          isCompleted: true
        },
        {
          id: 4,
          title: "Diamond Ring 2.5 Carat",
          finalPrice: 13800000,
          startingPrice: 12000000,
          endDate: "2024-01-12",
          bidders: 8,
          image: "/images/completed-section.png",
          category: "ҮНЭТ ЭДЛЭЛ",
          location: "Улаанбаатар",
          winner: "Алтанцэцэг",
          isCompleted: true
        },
        {
          id: 5,
          title: "Samsung 65\" QLED TV",
          finalPrice: 3800000,
          startingPrice: 3000000,
          endDate: "2024-01-11",
          bidders: 11,
          image: "/images/completed-section.png",
          category: "ЦАХИЛГААН БАРАА",
          location: "Улаанбаатар",
          winner: "Болд",
          isCompleted: true
        },
        {
          id: 6,
          title: "Mercedes-Benz S-Class 2021",
          finalPrice: 72000000,
          startingPrice: 65000000,
          endDate: "2024-01-10",
          bidders: 22,
          image: "/images/completed-section.png",
          category: "АВТОМАШИН",
          location: "Улаанбаатар",
          winner: "Мөнх-Эрдэнэ",
          isCompleted: true
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

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
                className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase"
                style={{
                  fontFamily: 'TT Firs Neue Variable',
                  fontWeight: 700,
                }}
              >
                ДУУССАН ДУУДЛАГА ХУДАЛДАА
              </h1>
            </div>
           
          </div>
          <p className="text-gray-600 mt-2">
            Нийт {completedAuctions.length} дуудлага худалдаа дууссан
          </p>
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
                  <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold">
                    📅 {formatDate(auction.endDate)}
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
                  <Image src="/svg/header/main-logo.svg" alt="Location" width={16} height={16} className="w-4 h-4 mr-2" />
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
                    <span className="text-gray-600 text-sm">Саналчид:</span>
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
                  <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                    📊 Дэлгэрэнгүй
                  </Button>
                  <Button variant="outline" className="px-4">
                    📋 Гэрээ
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 py-3">
            Дэлгэрэнгүй үзэх
          </Button>
        </div>
      </div>
    </div>
  );
}
