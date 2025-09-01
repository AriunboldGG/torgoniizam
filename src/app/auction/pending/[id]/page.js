"use client"

import { useState, use } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"

export default function PendingAuctionItemPage({ params }) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Unwrap params using React.use() as recommended by Next.js
  const unwrappedParams = use(params);
  
  // Function to get pending auction data based on ID
  const getPendingAuctionData = (id) => {
    // Mock pending auction database
    const pendingAuctionDatabase = {
      "1": {
        id: "1",
        category: "Үнэт эдлэл",
        title: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
        startingPrice: "53,400,000₮",
        lastPrice: "58,200,000₮",
        mainImage: "/images/pending1.png",
        countdown: { days: 2, hours: 32, minutes: 58, seconds: 14 },
        description: "Хуучин артизаны гарт хийсэн, их гарт мөнгөн тоногтой эмээл. Нарийн хийцтэй, уран дархны урлагийн бүтээл.",
        specifications: [
          { label: "Материал", value: "Алт, мөнгө" },
          { label: "Хэмжээ", value: "Стандарт" },
          { label: "Хийц", value: "Гараар хийсэн" },
          { label: "Төрөл", value: "Эмээл" },
          { label: "Нас", value: "100+ жил" },
          { label: "Төлөв", value: "Сайн" }
        ],
        images: [
          "/images/pending1.png",
          "/images/pending2.png",
          "/images/pending3.png",
          "/images/pending4.png",
          "/images/pending1.png"
        ],
        bids: [
          { id: 7, email: "faisal........@outlook.com", date: "2025.02.24", amount: "58,200,000₮" },
          { id: 6, email: "1bes........@ymail.com", date: "2025.02.24", amount: "57,800,000₮" },
          { id: 5, email: "john........@gmail.com", date: "2025.02.24", amount: "57,200,000₮" }
        ]
      },
      "2": {
        id: "2",
        category: "Цахилгаан бараа",
        title: "САМСУНГ ГАЛАКСИ S24 - ХАМГИЙН ШИНЭ МОДЕЛЬ",
        startingPrice: "480,000₮",
        lastPrice: "520,000₮",
        mainImage: "/images/pending2.png",
        countdown: { days: 2, hours: 18, minutes: 52, seconds: 14 },
        description: "Самсунгийн хамгийн шинэ загвар, дээд зэргийн камертай, хурдтай процессортой ухаалаг утас.",
        specifications: [
          { label: "Загвар", value: "Galaxy S24" },
          { label: "Процессор", value: "Snapdragon 8 Gen 3" },
          { label: "RAM", value: "8GB" },
          { label: "Хадгалах", value: "256GB" },
          { label: "Камер", value: "200MP" },
          { label: "Батарей", value: "5000mAh" }
        ],
        images: [
          "/images/pending2.png",
          "/images/pending3.png",
          "/images/pending4.png",
          "/images/pending1.png",
          "/images/pending2.png"
        ],
        bids: [
          { id: 6, email: "1bes........@ymail.com", date: "2025.02.24", amount: "520,000₮" },
          { id: 5, email: "john........@gmail.com", date: "2025.02.24", amount: "510,000₮" },
          { id: 4, email: "user........@hotmail.com", date: "2025.02.24", amount: "500,000₮" }
        ]
      }
    };

    // Return auction data or default data if not found
    return pendingAuctionDatabase[id] || {
      id: id,
      category: "Үнэт эдлэл",
      title: "ДАМАСКУС ГАН - ХУУЧИН АРТИЗАНЫ ГАРТ ХИЙСЭН",
      startingPrice: "820,000₮",
      lastPrice: "890,000₮",
      mainImage: "/images/pending3.png",
      countdown: { days: 0, hours: 4, minutes: 16, seconds: 2 },
      description: "Дамаскус гангаар хийсэн, хуучин артизаны гарт бүтсэн цэвэрхэн хутга. Уран дархны урлагийн бүтээл.",
      specifications: [
        { label: "Материал", value: "Дамаскус ган" },
        { label: "Урт", value: "25см" },
        { label: "Хийц", value: "Гараар хийсэн" },
        { label: "Төрөл", value: "Хутга" },
        { label: "Нас", value: "150+ жил" },
        { label: "Төлөв", value: "Сайн" }
      ],
      images: [
        "/images/pending3.png",
        "/images/pending4.png",
        "/images/pending1.png",
        "/images/pending2.png",
        "/images/pending3.png"
      ],
      bids: [
        { id: 5, email: "john........@gmail.com", date: "2025.02.24", amount: "890,000₮" },
        { id: 4, email: "user........@hotmail.com", date: "2025.02.24", amount: "870,000₮" },
        { id: 3, email: "bidder........@yahoo.com", date: "2025.02.24", amount: "850,000₮" }
      ]
    };
  };

  // Get auction data based on the ID from URL
  const auctionItem = getPendingAuctionData(unwrappedParams.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-4 xs-mobile:py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-4 xs-mobile:mb-6">
            <nav className="flex items-center space-x-1 xs-mobile:space-x-2 text-xs xs-mobile:text-sm text-gray-500 overflow-x-auto">
              <Link href="/" className="hover:text-blue-600 whitespace-nowrap">Эхлэл</Link>
              <span>/</span>
              <Link href="/auctions/pending" className="hover:text-blue-600 whitespace-nowrap">Хүлээгдэж буй дуудлага</Link>
              <span>/</span>
              <span className="text-gray-900 truncate max-w-[120px] xs-mobile:max-w-[200px] sm:max-w-none">{auctionItem.title}</span>
            </nav>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs-mobile:gap-6 sm:gap-8 lg:gap-12">
            
            {/* Left Column - Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-white rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src={auctionItem.images[selectedImage]} 
                  alt={auctionItem.title}
                  width={600}
                  height={600}
                  className="w-full h-64 sm:h-80 lg:h-[500px] object-cover"
                />
                
                {/* Blue Badge for Pending */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                  ХҮЛЭЭГДЭЖ БУЙ
                </div>
                
                
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {auctionItem.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${
                      selectedImage === index ? 'border-blue-600 scale-105' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image 
                      src={image} 
                      alt={`${auctionItem.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-6">
              {/* Category and Title */}
              <div>
                <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {auctionItem.category}
                </div>
                                 <h1 
                   className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 font-tt-firs-neue-variable tracking-[2.4%]"
                >
                  {auctionItem.title}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {auctionItem.description}
                </p>
              </div>

              {/* Pricing Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Эхлэх үнэ</p>
                    <p className="text-gray-700 font-bold text-xl sm:text-2xl">{auctionItem.startingPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Сүүлийн үнэ</p>
                    <p className="text-blue-600 font-bold text-xl sm:text-2xl">{auctionItem.lastPrice}</p>
                  </div>
                </div>
              </div>

              

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-bold transition-all duration-200">
                  <Image src="/svg/bid.svg" alt="Bid" width={20} height={20} className="w-5 h-5 mr-3" />
                  ҮНИЙН САНАЛ ИЛГЭЭХ
                </Button>
                <Button variant="outline" className="bg-white text-gray-700 hover:bg-gray-50 py-4 rounded-xl text-lg font-bold border-2 border-gray-200 transition-all duration-200">
                  ДЭНЧИН БАЙРШУУЛАХ
                </Button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{auctionItem.bids.length}</div>
                  <div className="text-sm text-gray-600">Санал</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{auctionItem.specifications.length}</div>
                  <div className="text-sm text-gray-600">Техникийн үзүүлэлт</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Specifications and Bids */}
      <div className="py-8 xs-mobile:py-10 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs-mobile:gap-8">
            
            {/* Specifications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-tt-firs-neue-variable tracking-[2.4%]">
                Техникийн үзүүлэлтүүд
              </h3>
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {auctionItem.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-600 font-medium">{spec.label}</span>
                        <span className="font-bold text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bids */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-tt-firs-neue-variable tracking-[2.4%]">
                Оролцогчдын үнийн саналууд
              </h3>
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {auctionItem.bids.map((bid) => (
                      <div key={bid.id} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-bold">{bid.id}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{bid.email}</p>
                          <p className="text-sm text-gray-500">{bid.date}</p>
                        </div>
                        <span className="font-bold text-lg text-blue-600 flex-shrink-0">{bid.amount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
