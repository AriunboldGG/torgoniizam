"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

// Countdown Timer Component
function CountdownTimer({ endTime, onEnd }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEnded, setIsEnded] = useState(false);

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
      <div className="absolute bottom-2 left-2 bg-red-600 text-white px-3 py-1 rounded-lg">
        <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm font-bold">
          Дууссан
        </span>
      </div>
    );
  }

  return (
    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg">
      <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm font-bold">
        {timeLeft.days} : {timeLeft.hours.toString().padStart(2, '0')} : {timeLeft.minutes.toString().padStart(2, '0')} : {timeLeft.seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}

export default function LiveAuctionSlider() {
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Generate auction data with real end times - memoized to prevent regeneration
  const liveAuctions = useMemo(() => {
    const now = new Date();
    const baseAuctions = [
      {
        id: 1,
        image: "/images/live1.png",
        category: "Автомашин",
        title: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
        lastPrice: "53,400,000₮",
        buttonColor: "bg-black"
      },
      {
        id: 2,
        image: "/images/live2.png",
        category: "Цахилгаан бараа",
        title: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
        lastPrice: "480,000₮",
        buttonColor: "bg-black"
      },
      {
        id: 3,
        image: "/images/live3.png",
        category: "Компьютер",
        title: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
        lastPrice: "820,000₮",
        buttonColor: "bg-black"
      },
      {
        id: 4,
        image: "/images/live4.png",
        category: "Үнэт эдлэл",
        title: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
        lastPrice: "1,280,000₮",
        buttonColor: "bg-black"
      },
      {
        id: 5,
        image: "/images/live1.png",
        category: "Автомашин",
        title: "ТОЙОТА ЛЭНД КРУЗЕР - Борлуулагчийн ХАМГИЙН САЙН СОНГОЛТ",
        lastPrice: "45,800,000₮",
        buttonColor: "bg-black"
      },
      {
        id: 6,
        image: "/images/live2.png",
        category: "Цахилгаан бараа",
        title: "САМСУНГ ГАЛАКСИ S24 - ХАМГИЙН ШИНЭ МОДЕЛЬ",
        lastPrice: "2,450,000₮",
        buttonColor: "bg-black"
      },
      {
        id: 7,
        image: "/images/live3.png",
        category: "Компьютер",
        title: "ЭППЛ МАКБУК ПРО M3 - ХҮЧИРХЭГ ПРОЦЕССОРТОЙ",
        lastPrice: "3,680,000₮",
        buttonColor: "bg-black"
      },
      {
        id: 8,
        image: "/images/live4.png",
        category: "Үнэт эдлэл",
        title: "ДАМАСКУС ГАН - ХУУЧИН АРТИЗАНЫ ГАРТ ХИЙСЭН",
        lastPrice: "890,000₮",
        buttonColor: "bg-black"
      },
      {
        id: 9,
        image: "/images/live1.png",
        category: "Автомашин",
        title: "ХОНДА ЦИВИК - ЭДИЙН ЗАСГИЙН ХЭМНЭЛТТЭЙ",
        lastPrice: "28,900,000₮",
        buttonColor: "bg-black"
      },
      {
        id: 10,
        image: "/images/live2.png",
        category: "Цахилгаан бараа",
        title: "СОНИ ПЛЕЙСТЕЙШН 5 - ГЭМТЭЛГҮЙ БАЙГУУЛЛАГА",
        lastPrice: "1,750,000₮",
        buttonColor: "bg-black"
      }
    ];

    // Add end times (varying from 1 hour to 2+ days from now for better visibility)
    return baseAuctions.map((auction, index) => {
      const endTime = new Date(now.getTime() + (60 + index * 30) * 60 * 1000); // 1 hour to 5+ hours
      console.log(`Auction ${auction.id} ends at:`, endTime.toLocaleString());
      return {
        ...auction,
        endTime: endTime.toISOString()
      };
    });
  }, []); // Empty dependency array means this only runs once

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
            <h2 
              className="text-gray-900 font-bold uppercase font-tt-firs-neue-variable"
            >
              <span className="text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile xl:text-xl-mobile 2xl:text-2xl-mobile 3xl:text-3xl-mobile 4xl:text-4xl-mobile 5xl:text-5xl-mobile">
                ЯВАГДАЖ БУЙ ДУУДЛАГА ХУДАЛДАА
              </span>
            </h2>
          </div>
          
          <Link href="/auctions/live-auctions" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline"
              className="bg-white text-gray-600 hover:bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 font-tt-firs-neue-variable font-medium text-base leading-6"
            >
              <Image src="/svg/see-all.svg" alt="See All" width={16} height={16} className="w-4 h-4 mr-2" />
              <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                Бүгдийг үзэх
              </span>
            </Button>
          </Link>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Desktop Navigation Arrows */}
          <button onClick={scrollLeft} className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex" style={{ width: '44px', height: '44px', left: '-70px' }}>
            <Image src="/svg/left.svg" alt="Previous" width={6} height={12} style={{ width: '6px', height: '12px' }} />
          </button>
          
          <button onClick={scrollRight} className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex" style={{ width: '44px', height: '44px', right: '-70px' }}>
            <Image src="/svg/right.svg" alt="Next" width={6} height={12} style={{ width: '6px', height: '12px' }} />
          </button>

          {/* Horizontal Scrollable Cards Row */}
          <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {liveAuctions.map((auction) => (
              <Card 
                key={auction.id} 
                className="min-w-[300px] max-w-[300px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 cursor-pointer"
                onClick={() => window.location.href = `/auction/${auction.id}`}
              >
                <CardContent className="p-0">
                  {/* Product Image with Timer Overlay */}
                  <div className="relative">
                    <Image 
                      src={auction.image} 
                      alt={auction.title}
                      width={300}
                      height={192}
                      className="w-full h-48 object-cover"
                    />
                    {/* Timer Overlay */}
                    <CountdownTimer 
                      endTime={auction.endTime} 
                      onEnd={() => {
                        console.log(`Auction ${auction.id} has ended`);
                        // You can add additional logic here when an auction ends
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Category */}
                    <p className="text-gray-500 text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm mb-2">{auction.category}</p>
                    
                    {/* Title */}
                    <h3 
                      className="text-gray-900 font-bold mb-3 leading-tight font-tt-firs-neue-variable"
                    >
                      <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                        {auction.title}
                      </span>
                    </h3>
                    
                    {/* Price Section */}
                    <div className="mb-4">
                      <p className="text-gray-500 text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm mb-1">Сүүлийн үнэ</p>
                      <p className="text-red-600 font-bold text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile">{auction.lastPrice}</p>
                    </div>
                    
                    {/* Bid Button */}
                    <div className="flex justify-end">
                      <button 
                        className={`${auction.buttonColor} w-10 h-10 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-200`}
                      >
                        <Image 
                          src="/svg/bid.svg" 
                          alt="Bid" 
                          width={18}
                          height={18}
                          className="w-[18px] h-[18px]"
                        />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Scroll Indicator Line */}
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-gray-300 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full transition-all duration-300" 
                   style={{ 
                     width: `${scrollProgress}%` 
                   }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 