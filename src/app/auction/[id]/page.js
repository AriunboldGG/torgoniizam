"use client"

import { useState, use } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AuctionItemPage({ params }) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Unwrap params using React.use() as recommended by Next.js
  const unwrappedParams = use(params);
  
  // Function to get auction data based on ID
  const getAuctionData = (id) => {
    // Mock auction database - in real app this would come from API/database
    const auctionDatabase = {
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
      },
      "3": {
        id: "3",
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
      },
      "4": {
        id: "4",
        category: "Компьютер",
        title: "ЭППЛ МАКБУК ПРО M3 - ХҮЧИРХЭГ ПРОЦЕССОРТОЙ",
        startingPrice: "1,280,000₮",
        lastPrice: "1,450,000₮",
        mainImage: "/images/pending4.png",
        countdown: { days: 1, hours: 20, minutes: 49, seconds: 72 },
        description: "Apple M3 процессортой, хамгийн хүчирхэг MacBook Pro. График дизайн, видео засварт зориулсан.",
        specifications: [
          { label: "Загвар", value: "MacBook Pro M3" },
          { label: "Процессор", value: "Apple M3" },
          { label: "RAM", value: "16GB" },
          { label: "SSD", value: "512GB" },
          { label: "Дэлгэц", value: "14 inch" },
          { label: "Үйлдлийн систем", value: "macOS Sonoma" }
        ],
        images: [
          "/images/pending4.png",
          "/images/pending1.png",
          "/images/pending2.png",
          "/images/pending3.png",
          "/images/pending4.png"
        ],
        bids: [
          { id: 4, email: "user........@hotmail.com", date: "2025.02.24", amount: "1,450,000₮" },
          { id: 5, email: "john........@gmail.com", date: "2025.02.24", amount: "1,420,000₮" },
          { id: 6, email: "1bes........@ymail.com", date: "2025.02.24", amount: "1,400,000₮" }
        ]
      },
      "5": {
        id: "5",
        category: "Автомашин",
        title: "ТОЙОТА ЛЭНД КРУЗЕР - ДЭЛГҮҮРИЙН ХАМГИЙН САЙН СОНГОЛТ",
        startingPrice: "45,800,000₮",
        lastPrice: "48,200,000₮",
        mainImage: "/images/pending1.png",
        countdown: { days: 3, hours: 15, minutes: 42, seconds: 30 },
        description: "Тойота Лэнд Крузер, дэлгүүрийн хамгийн сайн сонголт. Хүчирхэг, найдвартай, тохилог SUV.",
        specifications: [
          { label: "Үйлдвэрлэсэн он", value: "2024" },
          { label: "Импортлогдсон он", value: "2025" },
          { label: "Хөдөлгүүр", value: "Бензин" },
          { label: "Өнгө", value: "Цэнхэр" },
          { label: "Моторын багтаамж", value: "3500CC" },
          { label: "Хурдны хайрцаг", value: "Автомат" },
          { label: "Хүрд", value: "Зөв" },
          { label: "Хөтөлгч", value: "Бүх дугуй 4WD" },
          { label: "Гүйлт", value: "8'000км" }
        ],
        images: [
          "/images/pending1.png",
          "/images/pending2.png",
          "/images/pending3.png",
          "/images/pending4.png",
          "/images/pending1.png"
        ],
        bids: [
          { id: 3, email: "bidder........@yahoo.com", date: "2025.02.24", amount: "48,200,000₮" },
          { id: 2, email: "auction........@outlook.com", date: "2025.02.24", amount: "47,500,000₮" },
          { id: 1, email: "faisal........@outlook.com", date: "2025.02.24", amount: "47,000,000₮" }
        ]
      }
    };

    // Return auction data or default data if not found
    return auctionDatabase[id] || {
      id: id,
      category: "Автомашин",
      title: "TOYOTA LAND CRUISER 250",
      startingPrice: "48,200,000₮",
      lastPrice: "53,400,000₮",
      mainImage: "/images/end4.png",
      countdown: { days: 12, hours: 4, minutes: 16, seconds: 2 },
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      specifications: [
        { label: "Үйлдвэрлэсэн он", value: "2024" },
        { label: "Импортлогдсон он", value: "2025" },
        { label: "Хөдөлгүүр", value: "Бензин" },
        { label: "Өнгө", value: "Цэнхэр" },
        { label: "Моторын багтаамж", value: "3500CC" },
        { label: "Гадна талын ашиглалт", value: "Хэвийн" },
        { label: "Хурдны хайрцаг", value: "Автомат" },
        { label: "Салоны ашиглалт", value: "Хэвийн" },
        { label: "Хүрд", value: "Зөв" },
        { label: "Байршил", value: "Улаанбаатар" },
        { label: "Хөтөлгч", value: "Бүх дугуй 4WD" },
        { label: "Эд ангиудын ашиглалт", value: "Хэвийн" },
        { label: "Гүйлт", value: "8'000км" }
      ],
      images: [
        "/images/end4.png",
        "/images/end1.png",
        "/images/end2.png",
        "/images/end3.png",
        "/images/end4.png"
      ],
      bids: [
        { id: 7, email: "faisal........@outlook.com", date: "2025.02.24", amount: "48,200,000₮" },
        { id: 6, email: "1bes........@ymail.com", date: "2025.02.24", amount: "48,200,000₮" },
        { id: 5, email: "john........@gmail.com", date: "2025.02.24", amount: "48,200,000₮" },
        { id: 4, email: "user........@hotmail.com", date: "2025.02.24", amount: "48,200,000₮" },
        { id: 3, email: "bidder........@yahoo.com", date: "2025.02.24", amount: "48,200,000₮" },
        { id: 1, email: "auction........@outlook.com", date: "2025.02.24", amount: "48,200,000₮" }
      ]
    };
  };

  // Get auction data based on the ID from URL
  const auctionItem = getAuctionData(unwrappedParams.id);

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Left Column - Image Gallery */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div className="relative">
              <Image 
                src={auctionItem.images[selectedImage]} 
                alt={auctionItem.title}
                width={600}
                height={400}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
              />
              {/* Play Button Overlay */}
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[6px] sm:border-l-[8px] border-l-black border-t-[4px] sm:border-t-[6px] border-t-transparent border-b-[4px] sm:border-b-[6px] border-b-transparent ml-0.5 sm:ml-1"></div>
              </div>
              {/* Fullscreen Button */}
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-80 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {auctionItem.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                    selectedImage === index ? 'border-orange-500' : 'border-gray-200'
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
          <div className="space-y-4 sm:space-y-6">
            {/* Category and Title */}
            <div>
              <p className="text-gray-500 text-xs sm:text-sm mb-2">{auctionItem.category}</p>
              <h1 
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight"
                style={{
                  fontFamily: 'TT Firs Neue Variable',
                  fontWeight: 700,
                }}
              >
                {auctionItem.title}
              </h1>
            </div>

            {/* Pricing */}
            <div className="space-y-2 sm:space-y-3">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Эхлэх үнэ</p>
                <p className="text-orange-500 font-bold text-lg sm:text-xl lg:text-2xl">{auctionItem.startingPrice}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Сүүлийн үнэ</p>
                <p className="text-orange-500 font-bold text-lg sm:text-xl lg:text-2xl">{auctionItem.lastPrice}</p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div>
              <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">Дуудлага худалдаа дуусах хугацаа</p>
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{auctionItem.countdown.days}</p>
                    <p className="text-xs text-gray-500">ӨДӨР</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{auctionItem.countdown.hours}</p>
                    <p className="text-xs text-gray-500">ЦАГ</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{auctionItem.countdown.minutes}</p>
                    <p className="text-xs text-gray-500">МИНУТ</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{auctionItem.countdown.seconds}</p>
                    <p className="text-xs text-gray-500">СЕКУНД</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Тайлбар</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{auctionItem.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg uppercase font-bold text-sm sm:text-base">
                <Image src="/svg/timer.svg" alt="Timer" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                ҮНИЙН САНАЛ ИЛГЭЭХ
              </Button>
              <Button variant="outline" className="bg-black text-white hover:bg-gray-800 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg uppercase font-bold text-sm sm:text-base">
                ДЭНЧИН БАЙРШУУЛАХ
              </Button>
            </div>

            {/* Notification */}
            <div className="bg-gray-100 rounded-lg p-3 sm:p-4 flex items-start space-x-2 sm:space-x-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
              <p className="text-xs sm:text-sm text-gray-600">
                Ялагч болсон тохиолдолд таны аккаунт хаяг руу мэдэгдэл илгээх болно.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Specifications and Bids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
          
          {/* Specifications Table */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Техникийн үзүүлэлтүүд</h3>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-2 sm:space-y-3">
                  {auctionItem.specifications.map((spec, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-0">{spec.label}</span>
                      <span className="font-medium text-gray-900 text-xs sm:text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Participants' Bids */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Оролцогчдын үнийн саналууд</h3>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-2 sm:space-y-3">
                  {auctionItem.bids.map((bid) => (
                    <div key={bid.id} className="flex items-center space-x-2 sm:space-x-3 py-2 border-b border-gray-100 last:border-b-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{bid.id}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-900 truncate">{bid.email}</p>
                        <p className="text-xs text-gray-500">{bid.date}</p>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-900 flex-shrink-0">{bid.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
