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
function CountdownTimer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      
      // Hide timer if more than 3 days remaining
      setShowTimer(days < 3);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (!showTimer) {
    return null; // Don't show timer if more than 3 days
  }

  return (
    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 xs-mobile:px-3 py-1 rounded-lg">
      <span className="text-xs xs-mobile:text-sm font-bold">
        {timeLeft.days} : {timeLeft.hours.toString().padStart(2, '0')} : {timeLeft.minutes.toString().padStart(2, '0')} : {timeLeft.seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}

export default function PendingAuctionSection() {
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

  const { data: rawData, isLoading: swrLoading } = useSWR(
    "/api/lot/list?status=pending&limit=25&offset=0",
    publicFetcher,
    { dedupingInterval: 300_000, revalidateOnFocus: false }
  )

  const allPendingAuctions = useMemo(() => {
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
      startingPrice:
        lot.starting_price != null ? `${Number(lot.starting_price).toLocaleString()}₮` : "",
      endTime: new Date(lot.end_date ?? Date.now()).getTime(),
      status: "ТУН УДАХГҮЙ",
    }))
  }, [rawData])

  // Filter auctions based on search query, category and subcategory
  const pendingAuctions = useMemo(() => {
    let filtered = allPendingAuctions;

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
  }, [allPendingAuctions, searchQuery, selectedCategory, selectedSubcategory, categorySubcategoryNames]);

  // Autoplay: only when more than 4 items
  useEffect(() => {
    if (pendingAuctions.length <= 4) return;

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
  }, [pendingAuctions.length]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
            <h2 
              className="text-gray-900 font-bold uppercase font-tt-firs-neue-variable"
            >
              <span className="text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile xl:text-xl-mobile 2xl:text-2xl-mobile 3xl:text-3xl-mobile 4xl:text-4xl-mobile 5xl:text-5xl-mobile">
                ХҮЛЭЭГДЭЖ БУЙ ДУУДЛАГА ХУДАЛДАА
              </span>
            </h2>
          </div>
          
          <Link href="/auctions/pending" target="_blank" rel="noopener noreferrer">
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
          <button onClick={scrollLeft} className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex" style={{ width: '44px', height: '44px', left: '-70px' }}>
            <Image src="/svg/left.svg" alt="Previous" width={6} height={12} style={{ width: '6px', height: '12px' }} />
          </button>
          
          <button onClick={scrollRight} className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex" style={{ width: '44px', height: '44px', right: '-70px' }}>
            <Image src="/svg/right.svg" alt="Next" width={6} height={12} style={{ width: '6px', height: '12px' }} />
          </button>

          {/* Horizontal Scrollable Cards Row */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
            onTouchStart={() => { isHoveredRef.current = true; }}
            onTouchEnd={() => { isHoveredRef.current = false; }}
          >
            {swrLoading ? (
              <div className="w-full text-center py-12">
                <div className="text-gray-400 text-lg">Уншиж байна...</div>
              </div>
            ) : pendingAuctions.length > 0 ? (
              pendingAuctions.map((auction) => (
              <Card 
                key={auction.id} 
                className="min-w-[300px] max-w-[300px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 cursor-pointer"
                onClick={() => window.location.href = `/auction/pending/${auction.id}`}
              >
                <CardContent className="p-0">
                  {/* Product Image with Timer Overlay and Status Badge */}
                  <div className="relative">
                    <img 
                      src={auction.imageUrl || "/images/pending1.png"} 
                      alt={auction.title}
                      className="w-full h-48 object-cover"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 xs-mobile:px-3 py-1 rounded-lg">
                      <span className="text-xs xs-mobile:text-sm font-bold">{auction.status}</span>
                    </div>
                    {/* Timer Overlay */}
                    <CountdownTimer endTime={auction.endTime} />
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
                       <p className="text-gray-500 text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm mb-1">Эхлэх үнэ</p>
                       <p className="text-orange-500 font-bold text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile">{auction.startingPrice}</p>
                     </div>
                  </div>
                </CardContent>
              </Card>
              ))
            ) : (
              <div className="w-full text-center py-12">
                <div className="text-gray-500 text-lg">
                  {searchQuery ? `"${searchQuery}" хайлтад тохирох хүлээгдэж буй дуудлага худалдаа олдсонгүй` : 'Хүлээгдэж буй дуудлага худалдаа олдсонгүй'}
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
