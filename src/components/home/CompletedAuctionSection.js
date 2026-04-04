"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "@/contexts/SearchContext";
import useSWR from "swr";
import { publicFetcher } from "@/lib/fetcher";

export default function CompletedAuctionSection() {
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { searchQuery, selectedCategory } = useSearch();

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

  // Two SWR keys — each is cached independently for 5 minutes.
  const { data: expData, isLoading: expLoading } = useSWR(
    "/api/lot/list?status=expired&limit=25&offset=0",
    publicFetcher,
    { dedupingInterval: 300_000, revalidateOnFocus: false }
  )
  const { data: soldData, isLoading: soldLoading } = useSWR(
    "/api/lot/list?status=sold&limit=25&offset=0",
    publicFetcher,
    { dedupingInterval: 300_000, revalidateOnFocus: false }
  )
  const swrLoading = expLoading || soldLoading

  const allCompletedAuctions = useMemo(() => {
    const expList =
      expData?.data?.results ??
      expData?.results ??
      (Array.isArray(expData?.data) ? expData.data : null) ??
      []
    const soldList =
      soldData?.data?.results ??
      soldData?.results ??
      (Array.isArray(soldData?.data) ? soldData.data : null) ??
      []
    return [...expList, ...soldList].map((lot) => ({
      id: lot.id,
      imageUrl: lot.thumbnail ?? (typeof lot.images?.[0] === "string" ? lot.images[0] : ""),
      category: lot.category?.value ?? "",
      title: lot.name ?? "",
      finalPrice:
        lot.final_price != null
          ? `${Number(lot.final_price).toLocaleString()}₮`
          : lot.current_bid != null
          ? `${Number(lot.current_bid).toLocaleString()}₮`
          : "",
      status: "ДУУССАН",
    }))
  }, [expData, soldData])

  // Filter auctions based on search query and category
  const completedAuctions = useMemo(() => {
    let filtered = allCompletedAuctions;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(auction => 
        auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        auction.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      // Map dropdown category IDs to actual category names
      const categoryMapping = {
        'car': 'Автомашин',
        'phone': 'Цахилгаан бараа', // Using electric category for phones
        'computer': 'Компьютер',
        'accessory': 'Үнэт эдлэл',
        'electric': 'Цахилгаан бараа'
      };
      
      const categoryName = categoryMapping[selectedCategory];
      if (categoryName) {
        filtered = filtered.filter(auction => 
          auction.category === categoryName
        );
      }
    }

    return filtered;
  }, [allCompletedAuctions, searchQuery, selectedCategory]);

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
                ДУУССАН ДУУДЛАГА ХУДАЛДАА
              </span>
            </h2>
          </div>
          
          <Link href="/auctions/completed" target="_blank" rel="noopener noreferrer">
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
          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {swrLoading ? (
              <div className="w-full text-center py-12">
                <div className="text-gray-400 text-lg">Уншиж байна...</div>
              </div>
            ) : completedAuctions.length > 0 ? (
              completedAuctions.map((auction) => (
              <Card 
                key={auction.id} 
                className="min-w-[300px] max-w-[300px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 cursor-pointer"
                onClick={() => window.location.href = `/auction/completed/${auction.id}`}
              >
                <CardContent className="p-0">
                  {/* Product Image with Status Badge */}
                  <div className="relative">
                    <img 
                      src={auction.imageUrl || "/images/end1.png"} 
                      alt={auction.title}
                      className="w-full h-48 object-cover"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded-lg">
                      <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm font-bold">{auction.status}</span>
                    </div>
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
                      <p className="text-gray-500 text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm mb-1">Сүүлийн үнэ:</p>
                      <p className="text-orange-500 font-bold text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile">{auction.finalPrice}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))
            ) : (
              <div className="w-full text-center py-12">
                <div className="text-gray-500 text-lg">
                  {searchQuery ? `"${searchQuery}" хайлтад тохирох дууссан дуудлага худалдаа олдсонгүй` : 'Дууссан дуудлага худалдаа олдсонгүй'}
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
