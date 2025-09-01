"use client"

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"
import ImageZoom from "@/components/ui/image-zoom"

export default function PendingAuctionPage({ params }) {
  const unwrappedParams = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [auctionItem, setAuctionItem] = useState(null);

  // Mock data for pending auction
  useEffect(() => {
    const pendingAuctionData = {
      id: unwrappedParams.id,
      title: "BMW X5 2021",
      startingPrice: 35000000,
      startDate: "2024-02-01",
      endDate: "2024-02-15",
      images: [
        "/images/live1.png",
        "/images/live2.png", 
        "/images/live3.png",
        "/images/live4.png"
      ],
      category: "АВТОМАШИН",
      location: "Улаанбаатар",
      isPending: true,
      description: "BMW X5 2021 он, 3.0L турбо хөдөлгүүр, автомат дамжуулалт, xDrive систем, 45,000 км явсан, бүрэн тоноглогдсон, шинэ байдалтай."
    };
    
    setAuctionItem(pendingAuctionData);
  }, [unwrappedParams.id]);

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

  if (!auctionItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
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
              <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
              <h1 
                className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase font-tt-firs-neue-variable"
              >
                ХҮЛЭЭГДЭЖ БУЙ ДУУДЛАГА ХУДАЛДАА
              </h1>
            </div>
            <Link href="/auctions/pending">
              <Button variant="outline" className="font-tt-firs-neue-variable font-medium">
                ← Буцах
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs-mobile:gap-6 sm:gap-8 lg:gap-12">
          
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div 
              className="relative bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setShowImageZoom(true)}
            >
              <Image 
                src={auctionItem.images[selectedImage]} 
                alt={auctionItem.title}
                width={600}
                height={600}
                className="w-full h-64 sm:h-80 lg:h-[500px] object-cover"
              />
              
              {/* Zoom Icon Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
              
              {/* Pending Badge */}
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                ХҮЛЭЭГДЭЖ БУЙ
              </div>
              
              {/* Start Date */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-bold">
                📅 {formatDate(auctionItem.startDate)}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {auctionItem.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    index === selectedImage 
                      ? 'border-orange-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${auctionItem.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Category */}
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {auctionItem.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 font-tt-firs-neue-variable">
              {auctionItem.title}
            </h1>

            {/* Location */}
            <div className="flex items-center text-gray-600">
              <Image src="/svg/header/main-logo.svg" alt="Location" width={20} height={20} className="w-5 h-5 mr-2" />
              <span className="font-medium">{auctionItem.location}</span>
            </div>

            {/* Auction Info */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                  Дуудлага худалдааны мэдээлэл
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Эхлэх үнэ:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₮{formatPrice(auctionItem.startingPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Эхлэх огноо:</span>
                    <span className="text-lg font-medium text-gray-900">
                      {formatDate(auctionItem.startDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Дуусах огноо:</span>
                    <span className="text-lg font-medium text-gray-900">
                      {formatDate(auctionItem.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Төлөв:</span>
                    <span className="text-lg font-medium text-blue-600">
                      Хүлээгдэж буй
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                  Барааны дэлгэрэнгүй
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {auctionItem.description}
                </p>
              </CardContent>
            </Card>

            {/* Notice */}
            <Card className="border-0 shadow-lg bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2">Анхааруулга</h4>
                    <p className="text-blue-800 text-sm">
                      Энэ дуудлага худалдаа хараахан эхлээгүй байна. Дуудлага худалдаа эхлэхэд мэдэгдэх болно.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {showImageZoom && (
        <ImageZoom
          images={auctionItem.images}
          currentImage={auctionItem.images[selectedImage]}
          onClose={() => setShowImageZoom(false)}
        />
      )}
    </div>
  );
}