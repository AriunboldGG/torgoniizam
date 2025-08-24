"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LiveAuctionsPage() {
  const [liveAuctions, setLiveAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Show 12 items per page for better grid layout

  // Mock data for live auctions - Generate 50 items
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const generateLiveAuctions = () => {
        const auctions = [];
        const categories = ["АВТОМАШИН", "ГАР УТАС & ТАБЛЕТ", "КОМПЬЮТЕР", "ҮНЭТ ЭДЛЭЛ", "ЦАХИЛГААН БАРАА"];
        const images = ["/images/live1.png", "/images/live2.png", "/images/live3.png", "/images/live4.png"];
        const titles = [
          "Toyota Land Cruiser 2020", "iPhone 15 Pro Max 256GB", "MacBook Pro M3 14-inch", "Diamond Ring 2.5 Carat",
          "Samsung 65\" QLED TV", "Mercedes-Benz S-Class 2021", "Sony PlayStation 5", "Gaming Computer RTX 4090",
          "Honda Civic 2022", "iPad Pro M2", "Canon EOS R5", "Rolex Submariner", "Tesla Model 3", "MacBook Air M2",
          "Samsung Galaxy S24", "Nike Air Jordan", "Louis Vuitton Bag", "Apple Watch Series 9", "Dell XPS 15",
          "BMW X5 2023", "Sony WH-1000XM5", "Gaming Monitor 27\"", "Wireless Earbuds", "Smart Home Hub",
          "Electric Scooter", "Fitness Tracker", "Bluetooth Speaker", "Portable Charger", "USB-C Cable",
          "Wireless Mouse", "Mechanical Keyboard", "Gaming Headset", "Webcam 4K", "Microphone USB",
          "Tablet Stand", "Phone Mount", "Car Charger", "Power Bank", "Cable Organizer", "Desk Lamp",
          "Office Chair", "Standing Desk", "Monitor Arm", "Laptop Stand", "Keyboard Tray", "Mouse Pad"
        ];

        for (let i = 1; i <= 50; i++) {
          const category = categories[i % categories.length];
          const image = images[i % images.length];
          const title = titles[i % titles.length];
          const currentBid = Math.floor(Math.random() * 50000000) + 1000000;
          const startingPrice = Math.floor(currentBid * 0.8);
          const timeLeft = `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`;
          const bidders = Math.floor(Math.random() * 20) + 5;

          auctions.push({
            id: i,
            title: `${title} ${i}`,
            currentBid,
            startingPrice,
            timeLeft,
            bidders,
            image,
            category,
            location: "Улаанбаатар",
            isLive: true
          });
        }
        return auctions;
      };

      setLiveAuctions(generateLiveAuctions());
      setLoading(false);
    }, 1000);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price);
  };

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Pagination logic
  const totalPages = Math.ceil(liveAuctions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAuctions = liveAuctions.slice(startIndex, endIndex);

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
                className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase"
                style={{
                  fontFamily: 'TT Firs Neue Variable',
                  fontWeight: 700,
                }}
              >
                ЯВАГДАЖ БУЙ ДУУДЛАГА ХУДАЛДАА
              </h1>
            </div>
           
          </div>
          <p className="text-gray-600 mt-2">
            Одоо {liveAuctions.length} дуудлага худалдаа явагдаж байна • Хуудас {currentPage} / {totalPages}
          </p>
        </div>
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
                  <div className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ⏰ {formatTime(auction.timeLeft)}
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
                  <Image src="/svg/header/main-logo.svg" alt="Location" width={16} height={16} className="w-4 h-4 mr-2" />
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
                    <span className="text-gray-600 text-sm">Саналчид:</span>
                    <span className="text-blue-600 font-medium">
                      {auction.bidders} хүн
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                    🎯 Санал өгөх
                  </Button>
                  <Button variant="outline" className="px-4">
                    👁️ Дэлгэрэнгүй
                  </Button>
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
                Хуудас {currentPage} / {totalPages} • Нийт {liveAuctions.length} бараа
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
