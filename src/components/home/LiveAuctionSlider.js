"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "@/contexts/SearchContext";
import useSWR from "swr";
import { publicFetcher } from "@/lib/fetcher";import { getAssetUrl } from "@/lib/utils"
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
      <div className="absolute bottom-2 left-2 bg-red-600 text-white px-2 xs-mobile:px-3 py-1 rounded-lg">
        <span className="text-xs xs-mobile:text-sm font-bold">
          Дууссан
        </span>
      </div>
    );
  }

  return (
    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 xs-mobile:px-3 py-1 rounded-lg">
      <span className="text-xs xs-mobile:text-sm font-bold">
        {timeLeft.days} : {timeLeft.hours.toString().padStart(2, '0')} : {timeLeft.minutes.toString().padStart(2, '0')} : {timeLeft.seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}

export default function LiveAuctionSlider() {
  const scrollContainerRef = useRef(null);
  const autoPlayRef = useRef(null);
  const isHoveredRef = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { searchQuery, selectedCategory, selectedSubcategory, categorySubcategoryNames } = useSearch();
  

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

  // SWR caches the response — re-navigating to this page within 5 min
  // skips the network request entirely.
  const { data: rawData, isLoading: swrLoading } = useSWR(
    "/api/lot/list?status=active&limit=25&offset=0",
    publicFetcher,
    { dedupingInterval: 300_000, revalidateOnFocus: false }
  )

  // useMemo is the right tool here: transform raw API data only when it changes.
  const allLiveAuctions_ = useMemo(() => {
    const list =
      rawData?.data?.results ??
      rawData?.results ??
      (Array.isArray(rawData?.data) ? rawData.data : null) ??
      []
    return list.map((lot) => ({
      id: lot.id,
      imageUrl: getAssetUrl(lot.thumbnail ?? (typeof lot.images?.[0] === "string" ? lot.images[0] : "")),
      category: lot.category?.value ?? "",
      title: lot.name ?? "",
      lastPrice:
        lot.current_bid != null
          ? `${Number(lot.current_bid).toLocaleString()}₮`
          : lot.starting_price != null
          ? `${Number(lot.starting_price).toLocaleString()}₮`
          : "",
      endTime: lot.end_date ?? null,
    }))
  }, [rawData])

  // Filter auctions based on search query, category and subcategory
  const liveAuctions = useMemo(() => {
    let filtered = allLiveAuctions_;

    if (searchQuery.trim()) {
      filtered = filtered.filter(auction =>
        auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        auction.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(auction =>
        auction.category.toLowerCase() === selectedSubcategory.name.toLowerCase()
      );
    } else if (selectedCategory) {
      if (categorySubcategoryNames.length > 0) {
        filtered = filtered.filter(auction =>
          categorySubcategoryNames.includes(auction.category.toLowerCase())
        );
      } else {
        filtered = filtered.filter(auction =>
          auction.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
    }

    return filtered;
  }, [allLiveAuctions_, searchQuery, selectedCategory, selectedSubcategory, categorySubcategoryNames]);

  // Autoplay: only when more than 4 items
  useEffect(() => {
    if (liveAuctions.length <= 4) return;

    autoPlayRef.current = setInterval(() => {
      if (isHoveredRef.current) return;
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 16;

      if (atEnd) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }, 3000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [liveAuctions.length]);

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
              className="bg-white text-gray-600 hover:bg-gray-50 px-6 py-3 rounded-full border border-gray-200 font-tt-firs-neue-variable font-medium text-base leading-6"
            >
              <Image src="/svg/see-all.svg" alt="See All" width={16} height={16} className="w-4 h-4 mr-2" />
              <span className="text-base font-medium leading-6 tracking-normal">
                Бүгдийг үзэх
              </span>
            </Button>
          </Link>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Desktop Navigation Arrows */}
          <button onClick={scrollLeft} className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden 2xl:flex" style={{ width: '44px', height: '44px', left: '-70px' }}>
            <Image src="/svg/left.svg" alt="Previous" width={6} height={12} style={{ width: '6px', height: '12px' }} />
          </button>
          
          <button onClick={scrollRight} className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden 2xl:flex" style={{ width: '44px', height: '44px', right: '-70px' }}>
            <Image src="/svg/right.svg" alt="Next" width={6} height={12} style={{ width: '6px', height: '12px' }} />
          </button>

          {/* Horizontal Scrollable Cards Row */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
            onTouchStart={() => { isHoveredRef.current = true; }}
            onTouchEnd={() => { isHoveredRef.current = false; }}
          >
            {swrLoading ? (
              <div className="w-full text-center py-12 text-gray-400">Уншиж байна...</div>
            ) : liveAuctions.length > 0 ? (
              liveAuctions.map((auction) => (
              <Card 
                key={auction.id} 
                className="min-w-[300px] max-w-[300px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 cursor-pointer"
                onClick={() => window.location.href = `/auction/${auction.id}`}
              >
                <CardContent className="p-0">
                  {/* Product Image with Timer Overlay */}
                  <div className="relative">
                    <img
                      src={auction.imageUrl || "/images/live1.png"}
                      alt={auction.title}
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
                        className="bg-[#FF4405] hover:bg-[#E63D04] w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
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
              ))
            ) : (
              <div className="w-full text-center py-12">
                <div className="text-gray-500 text-lg">
                  {searchQuery ? `"${searchQuery}" хайлтад тохирох дуудлага худалдаа олдсонгүй` : 'Дуудлага худалдаа олдсонгүй'}
                </div>
                <div className="text-gray-400 text-sm mt-2">
                  Өөр хайлтын үг эсвэл ангилал сонгоно уу
                </div>
              </div>
            )}
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