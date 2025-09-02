"use client"

import { useState, useEffect, use, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"
import PledgeDialog from "@/components/ui/pledge-dialog"
import BidDialog from "@/components/ui/bid-dialog"
import ImageZoom from "@/components/ui/image-zoom"
import { useUser } from "@/contexts/UserContext"

// Countdown Timer Component
function CountdownTimer({ endTime, onEnd }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEnded, setIsEnded] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsEnded(false);
        
        // Hide timer if more than 3 days remaining
        setShowTimer(days < 3);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsEnded(true);
        if (onEnd) onEnd();
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime, onEnd]);

  if (isEnded) {
    return (
      <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
        Дууссан
      </div>
    );
  }

  // Don't show timer if more than 3 days remaining
  if (!showTimer) {
    return null;
  }

  return (
    <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-bold">
      {timeLeft.days}д {timeLeft.hours}ц {timeLeft.minutes}м {timeLeft.seconds}с
    </div>
  );
}

// Detailed Countdown Timer Component for main section
function DetailedCountdownTimer({ endTime, onEnd }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEnded, setIsEnded] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsEnded(false);
        
        // Hide timer if more than 3 days remaining
        setShowTimer(days < 3);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsEnded(true);
        if (onEnd) onEnd();
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime, onEnd]);

  if (isEnded) {
    return (
      <div className="text-center">
        <div className="text-2xl font-bold text-red-600">ДУУССАН</div>
      </div>
    );
  }

  // Don't show timer if more than 3 days remaining
  if (!showTimer) {
    return (
      <div className="text-center">
        <div className="text-gray-600 text-lg">Дуудлага худалдаа эхлэхэд 3 хоногоос илүү үлдсэн байна</div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-black">{timeLeft.days}</div>
        <div className="text-sm text-gray-600">ӨДӨР</div>
      </div>
      <div className="text-2xl font-bold text-black">:</div>
      <div className="text-center">
        <div className="text-2xl font-bold text-black">{timeLeft.hours.toString().padStart(2, '0')}</div>
        <div className="text-sm text-gray-600">ЦАГ</div>
      </div>
      <div className="text-2xl font-bold text-black">:</div>
      <div className="text-center">
        <div className="text-2xl font-bold text-black">{timeLeft.minutes.toString().padStart(2, '0')}</div>
        <div className="text-sm text-gray-600">МИНУТ</div>
      </div>
      <div className="text-2xl font-bold text-black">:</div>
      <div className="text-center">
        <div className="text-2xl font-bold text-black">{timeLeft.seconds.toString().padStart(2, '0')}</div>
        <div className="text-sm text-gray-600">СЕКУНД</div>
      </div>
    </div>
  );
}

// Get real user authentication state from UserContext

// Mock pledge status - in real app this would come from user's pledge data
// const hasUserPledged = false; // Set to false to simulate user hasn't made pledge yet



export default function AuctionItemPage({ params }) {
  const unwrappedParams = use(params);
  const { user, isLoggedIn, isLoading } = useUser(); // Get real authentication state
  
  // Debug logging
  console.log('Auction Page - User:', user);
  console.log('Auction Page - isLoggedIn:', isLoggedIn);
  console.log('Auction Page - isLoading:', isLoading);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [showPledgeDialog, setShowPledgeDialog] = useState(false);
  const [showBidDialog, setShowBidDialog] = useState(false);
  const [hasUserPledged, setHasUserPledged] = useState(false); // State to track pledge status
  const [auctionItem, setAuctionItem] = useState(null); // State to track auction item
  const [showImageZoom, setShowImageZoom] = useState(false); // State to control image zoom modal
  
  const handlePledgeConfirm = (pledgeAmount) => {
    // Handle pledge confirmation here
    console.log('Pledge confirmed:', pledgeAmount);
    // Update pledge status to enable bid button
    setHasUserPledged(true);
    // You can update user state, call API, etc.
  };

  const handleBidConfirm = (bidAmount) => {
    // Handle bid confirmation here
    console.log('Bid confirmed:', bidAmount);
    
    // Add new bid to the auction item's bids array
    const newBid = {
      id: Math.max(...auctionItem.bids.map(bid => bid.id)) + 1,
      email: "user@example.com", // In real app, this would be the logged-in user's email
      date: new Date().toLocaleDateString('mn-MN'),
      amount: bidAmount + '₮'
    };
    
    // Update the auction item with new bid and new last price
    auctionItem.bids.unshift(newBid); // Add to beginning of array
    auctionItem.lastPrice = bidAmount + '₮';
    
    // Force re-render by updating state
    setAuctionItem({ ...auctionItem });
  };
  
  // Function to get auction data based on ID - memoized to prevent regeneration
  const auctionData = useMemo(() => {
    const now = new Date();
    // Mock auction database - in real app this would come from API/database
    const auctionDatabase = {
      "1": {
        id: "1",
        category: "Үнэт эдлэл",
        title: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
        startingPrice: "53,400,000₮",
        lastPrice: "58,200,000₮",
        mainImage: "/images/pending1.png",
        endTime: new Date(now.getTime() + (2 * 24 + 12) * 60 * 60 * 1000).toISOString(), // 2 days 12 hours from now
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
        endTime: new Date(now.getTime() + (1 * 24 + 18) * 60 * 60 * 1000).toISOString(), // 1 day 18 hours from now
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
        endTime: new Date(now.getTime() + (4 * 60 + 16) * 60 * 1000).toISOString(), // 4 hours 16 minutes from now
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
        endTime: new Date(now.getTime() + (1 * 24 + 20) * 60 * 60 * 1000).toISOString(), // 1 day 20 hours from now
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
        title: "ТОЙОТА ЛЭНД КРУЗЕР - Борлуулагчийн ХАМГИЙН САЙН СОНГОЛТ",
        startingPrice: "45,800,000₮",
        lastPrice: "48,200,000₮",
        mainImage: "/images/pending1.png",
        endTime: new Date(now.getTime() + (3 * 24 + 15) * 60 * 60 * 1000).toISOString(), // 3 days 15 hours from now
        description: "Тойота Лэнд Крузер, Борлуулагчийн хамгийн сайн сонголт. Хүчирхэг, найдвартай, тохилог SUV.",
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
    return auctionDatabase[unwrappedParams.id] || {
      id: unwrappedParams.id,
      category: "Автомашин",
      title: "TOYOTA LAND CRUISER 250",
      startingPrice: "48,200,000₮",
      lastPrice: "53,400,000₮",
      mainImage: "/images/end4.png",
      endTime: new Date(now.getTime() + (12 * 24 + 4) * 60 * 60 * 1000).toISOString(), // 12 days 4 hours from now
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
  }, [unwrappedParams.id]); // Include id in dependency array

  // Get auction data based on the ID from URL
  const initialAuctionItem = auctionData;
  
  // Initialize auction item state
  useEffect(() => {
    if (!auctionItem) {
      setAuctionItem(initialAuctionItem);
    }
  }, [auctionItem, initialAuctionItem]);

  // Close dialogs if user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setShowPledgeDialog(false);
      setShowBidDialog(false);
    }
  }, [isLoggedIn]);

  // Show loading if auction item is not loaded yet or authentication is loading
  if (!auctionItem || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4405] mx-auto mb-4"></div>
          <p className="text-gray-600">Уншиж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-4 xs-mobile:py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-4 xs-mobile:mb-6">
            <nav className="flex items-center space-x-1 xs-mobile:space-x-2 text-xs xs-mobile:text-sm text-gray-500 overflow-x-auto">
              <Link href="/" className="hover:text-[#FF4405] whitespace-nowrap">Эхлэл</Link>
              <span>/</span>
              <Link href="/auctions/today" className="hover:text-[#FF4405] whitespace-nowrap">Дуудлага худалдаа</Link>
              <span>/</span>
              <span className="text-gray-900 truncate max-w-[120px] xs-mobile:max-w-[200px] sm:max-w-none">{auctionItem.title}</span>
            </nav>
          </div>

          {/* Main Content Grid */}
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
                
                {/* Orange Badge */}
                <div className="absolute top-4 right-4 bg-[#FF4405] text-white px-3 py-1 rounded-lg text-sm font-bold">
                  ТУН УДАХГҮЙ
                </div>
                
                {/* Countdown Timer Overlay */}
                <div className="absolute bottom-4 left-4">
                  <CountdownTimer 
                    endTime={auctionItem.endTime} 
                    onEnd={() => {
                      console.log(`Auction ${auctionItem.id} has ended`);
                      // You can add additional logic here when an auction ends
                    }}
                  />
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {auctionItem.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${
                      selectedImage === index ? 'border-[#FF4405] scale-105' : 'border-gray-200 hover:border-gray-300'
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
               <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
                 <div className="grid grid-cols-2 gap-6">
                  <div>
                     <p className="text-gray-600 text-sm mb-2">Эхлэх үнэ</p>
                     <p className="text-gray-700 font-bold text-xl sm:text-2xl">{auctionItem.startingPrice}</p>
                  </div>
                  <div>
                     <p className="text-gray-600 text-sm mb-2">Сүүлийн үнэ</p>
                     <p className="text-[#FF4405] font-bold text-xl sm:text-2xl">{auctionItem.lastPrice}</p>
                   </div>
                 </div>
               </div>

               {/* Countdown Timer Component */}
               <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                     <Image src="/svg/live-time.svg" alt="Timer" width={24} height={24} className="w-6 h-6" />
                     <span className="text-gray-700 font-medium">Дуудлага худалдаа дуусах хугацаа</span>
                   </div>
                   <div className="flex items-center space-x-4">
                     <DetailedCountdownTimer 
                       endTime={auctionItem.endTime} 
                       onEnd={() => {
                         console.log(`Auction ${auctionItem.id} has ended`);
                         // You can add additional logic here when an auction ends
                       }}
                     />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
                <div className="space-y-4">
                  {!isLoggedIn && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-yellow-800 text-sm font-bold">!</span>
                        </div>
                        <div>
                          <p className="text-yellow-800 font-medium text-sm">
                            Нэвтрэх шаардлагатай
                          </p>
                          <p className="text-yellow-700 text-xs mt-1">
                            Үнийн санал илгээх болон дэнчин байршуулахын тулд эхлээд нэвтэрнэ үү
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {isLoggedIn && !hasUserPledged && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-800 text-sm font-bold">!</span>
                        </div>
                        <div>
                          <p className="text-blue-800 font-medium text-sm">
                            Дэнчин байршуулах шаардлагатай
                          </p>
                          <p className="text-blue-700 text-xs mt-1">
                            Үнийн санал илгээхийн тулд эхлээд дэнчин байршуулна уу (үнийн 10%)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                                     <div className="grid grid-cols-2 gap-3">
                     <Button 
                       className={`py-4 rounded-xl transition-all duration-200 font-tt-firs-neue-variable font-bold text-sm leading-6 tracking-[2.4%] uppercase ${
                         isLoggedIn && hasUserPledged
                           ? 'bg-[#FF4405] hover:bg-[#E63D04] text-white' 
                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                       }`}
                       disabled={!isLoggedIn || !hasUserPledged}
                       onClick={() => setShowBidDialog(true)}
                     >
                       <Image src="/svg/bid.svg" alt="Bid" width={20} height={20} className="w-5 h-5 mr-3" />
                  ҮНИЙН САНАЛ ИЛГЭЭХ
                </Button>
                    
                                                              <Button 
                       variant="outline" 
                       className={`py-4 rounded-xl border-2 transition-all duration-200 font-tt-firs-neue-variable font-bold text-sm leading-6 tracking-[2.4%] uppercase ${
                         isLoggedIn 
                           ? 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200' 
                           : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-60'
                       }`}
                       disabled={!isLoggedIn}
                       onClick={() => {
                         if (isLoggedIn) {
                           setShowPledgeDialog(true);
                         } else {
                           // Prevent dialog from opening for non-logged users
                           setShowPledgeDialog(false);
                         }
                       }}
                     >
                  {!isLoggedIn ? 'НЭВТРЭХ ШААРДЛАГАТАЙ' : 'ДЭНЧИН БАЙРШУУЛАХ'}
                </Button>
                     
                                           <PledgeDialog
                        isOpen={showPledgeDialog && isLoggedIn}
                        onOpenChange={setShowPledgeDialog}
                        auctionItem={auctionItem}
                        isLoggedIn={isLoggedIn}
                        onPledgeConfirm={handlePledgeConfirm}
                      />
                      
                      <BidDialog
                        isOpen={showBidDialog}
                        onOpenChange={setShowBidDialog}
                        auctionItem={auctionItem}
                        isLoggedIn={isLoggedIn}
                        onBidConfirm={handleBidConfirm}
                      />
              </div>

                  {!isLoggedIn && (
                    <div className="text-center">
                      <Link href={`/auth/login?redirect=${encodeURIComponent(`/auction/${unwrappedParams.id}`)}`} className="text-[#FF4405] hover:text-[#E63D04] font-medium text-sm underline">
                        Нэвтрэх эсвэл бүртгүүлэх
                      </Link>
                    </div>
                  )}

                                                          {isLoggedIn && !hasUserPledged && (
                       <div className="text-center">
                         <p className="text-gray-600 text-sm mb-2">
                           Дэнчин: {auctionItem.startingPrice} × 10% = {(parseInt(auctionItem.startingPrice.replace(/[^\d]/g, '')) * 0.1).toLocaleString() + '₮'}
                         </p>
                         <p className="text-blue-600 text-xs">
                           Дэнчин байршуулсны дараа үнийн санал илгээх боломжтой болно
                         </p>
                       </div>
                     )}
                </div>

              {/* Warning Text */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Image src="/svg/warning.svg" alt="Warning" width={20} height={20} className="w-5 h-5 text-red-500" />
                  <span className="text-red-500 text-sm font-medium">
                    Ялагч болсон тохиолдолд таны аккаунт хаяг руу мэдэгдэл илгээх болно.
                  </span>
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
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-2xl font-bold text-gray-900 font-tt-firs-neue-variable tracking-[2.4%]">
                Оролцогчдын үнийн саналууд
              </h3>
                 <div className="flex items-center space-x-2">
                   <div className="w-3 h-3 bg-[#FF4405] rounded-full animate-pulse"></div>
                   <span className="text-sm text-gray-500 font-medium">Идэвхтэй</span>
                 </div>
               </div>
               <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50">
                 <CardContent className="p-0">
                   <div className="bg-gradient-to-r from-[#FF4405] to-[#E63D04] px-6 py-4">
                     <div className="flex items-center justify-between text-white">
                       <h4 className="font-bold text-lg font-tt-firs-neue-variable">Нийт {auctionItem.bids.length} оролцогч</h4>
                       <div className="flex items-center space-x-2">
                         <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                         <span className="text-sm font-medium">Шинэчлэгдэж байна</span>
                       </div>
                     </div>
                   </div>
                   <div className="p-6">
                     <div className="space-y-3">
                       {auctionItem.bids.map((bid, index) => (
                         <div 
                           key={bid.id} 
                           className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:shadow-md ${
                             index === 0 
                               ? 'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200' 
                               : 'bg-white border border-gray-100 hover:border-gray-200'
                           }`}
                         >
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                             index === 0 
                               ? 'bg-gradient-to-r from-[#FF4405] to-[#E63D04] shadow-lg' 
                               : 'bg-gray-100'
                           }`}>
                             <span className={`text-sm font-bold ${
                               index === 0 ? 'text-white' : 'text-gray-600'
                             }`}>
                               {bid.id}
                             </span>
                        </div>
                        <div className="flex-1 min-w-0">
                             <p className={`font-medium truncate ${
                               index === 0 ? 'text-gray-900' : 'text-gray-700'
                             }`}>
                               {bid.email}
                             </p>
                             <p className="text-sm text-gray-500 flex items-center space-x-2">
                               <span>{bid.date}</span>
                               {index === 0 && (
                                 <>
                                   <span className="w-1 h-1 bg-[#FF4405] rounded-full"></span>
                                   <span className="text-[#FF4405] font-medium text-xs">Хамгийн өндөр үнэ</span>
                                 </>
                               )}
                             </p>
                           </div>
                           <div className="text-right flex-shrink-0">
                             <span className={`font-bold text-lg ${
                               index === 0 ? 'text-[#FF4405]' : 'text-gray-700'
                             }`}>
                               {bid.amount}
                             </span>
                             {index === 0 && (
                               <div className="mt-1">
                                 <span className="text-xs text-[#FF4405] font-medium bg-orange-100 px-2 py-1 rounded-full">
                                   🏆 Тэргүүлэгч
                                 </span>
                               </div>
                             )}
                        </div>
                      </div>
                    ))}
                     </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
