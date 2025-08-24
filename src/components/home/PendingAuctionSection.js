"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PendingAuctionSection() {
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

  const pendingAuctions = [
    {
      id: 1,
      image: "/images/pending1.png",
      category: "Үнэт эдлэл",
      title: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
      startingPrice: "53,400,000₮",
      timer: "2 : 32 : 58 : 14",
      status: "ТУН УДАХГҮЙ"
    },
    {
      id: 2,
      image: "/images/pending2.png",
      category: "Цахилгаан бараа",
      title: "САМСУНГ ГАЛАКСИ S24 - ХАМГИЙН ШИНЭ МОДЕЛЬ",
      startingPrice: "480,000₮",
      timer: "2 : 18 : 52 : 14",
      status: "ТУН УДАХГҮЙ"
    },
    {
      id: 3,
      image: "/images/pending3.png",
      category: "Үнэт эдлэл",
      title: "ДАМАСКУС ГАН - ХУУЧИН АРТИЗАНЫ ГАРТ ХИЙСЭН",
      startingPrice: "820,000₮",
      timer: "0 : 04 : 16 : 02",
      status: "ТУН УДАХГҮЙ"
    },
    {
      id: 4,
      image: "/images/pending4.png",
      category: "Компьютер",
      title: "ЭППЛ МАКБУК ПРО M3 - ХҮЧИРХЭГ ПРОЦЕССОРТОЙ",
      startingPrice: "1,280,000₮",
      timer: "1 : 20 : 49 : 72",
      status: "ТУН УДАХГҮЙ"
    },
    {
      id: 5,
      image: "/images/pending1.png",
      category: "Автомашин",
      title: "ТОЙОТА ЛЭНД КРУЗЕР - ДЭЛГҮҮРИЙН ХАМГИЙН САЙН СОНГОЛТ",
      startingPrice: "45,800,000₮",
      timer: "3 : 15 : 42 : 30",
      status: "ТУН УДАХГҮЙ"
    },
    {
      id: 6,
      image: "/images/pending2.png",
      category: "Цахилгаан бараа",
      title: "СОНИ ПЛЕЙСТЕЙШН 5 - ГЭМТЭЛГҮЙ БАЙГУУЛЛАГА",
      startingPrice: "1,750,000₮",
      timer: "1 : 45 : 23 : 18",
      status: "ТУН УДАХГҮЙ"
    },
    {
      id: 7,
      image: "/images/pending3.png",
      category: "Компьютер",
      title: "ГЭЙМИНГ КОМПЬЮТЕР - RTX 4090 ГРАФИК КАРТТАЙ",
      startingPrice: "3,680,000₮",
      timer: "0 : 52 : 18 : 45",
      status: "ТУН УДАХГҮЙ"
    },
    {
      id: 8,
      image: "/images/pending4.png",
      category: "Үнэт эдлэл",
      title: "БРИЛЛИАНТ ЭРГЭНЭ - 5 КАРАТЫН ЧИСТЭЙ ТАЛСТ",
      startingPrice: "890,000₮",
      timer: "4 : 12 : 35 : 22",
      status: "ТУН УДАХГҮЙ"
    },
    {
      id: 9,
      image: "/images/pending1.png",
      category: "Автомашин",
      title: "ХОНДА ЦИВИК - ЭДИЙН ЗАСГИЙН ХЭМНЭЛТТЭЙ",
      startingPrice: "28,900,000₮",
      timer: "2 : 08 : 15 : 40",
      status: "ТУН УДАХГҮЙ"
    },
    {
      id: 10,
      image: "/images/pending2.png",
      category: "Цахилгаан бараа",
      title: "ЭППЛ АЙПЭД ПРО - М2 ЧИПТЭЙ ТАБЛЕТ",
      startingPrice: "2,450,000₮",
      timer: "0 : 38 : 52 : 15",
      status: "ТУН УДАХГҮЙ"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
            <h2 
              className="text-gray-900 font-bold uppercase"
              style={{
                fontFamily: 'TT Firs Neue Variable',
                fontWeight: 700,
              }}
            >
              <span className="text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile xl:text-xl-mobile 2xl:text-2xl-mobile 3xl:text-3xl-mobile 4xl:text-4xl-mobile 5xl:text-5xl-mobile">
                ХҮЛЭЭГДЭЖ БУЙ ДУУДЛАГА ХУДАЛДАА
              </span>
            </h2>
          </div>
          
          <Link href="/auctions/pending" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline"
              className="bg-white text-gray-900 hover:bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 uppercase"
              style={{
                fontFamily: 'TT Firs Neue Variable',
                fontWeight: 700,
                letterSpacing: '2.4%',
              }}
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
          {/* Navigation Arrows */}
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Image src="/svg/left.svg" alt="Previous" width={24} height={24} className="w-6 h-6" />
          </button>
          
          <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Image src="/svg/right.svg" alt="Next" width={24} height={24} className="w-6 h-6" />
          </button>

          {/* Horizontal Scrollable Cards Row */}
          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {pendingAuctions.map((auction) => (
              <Card 
                key={auction.id} 
                className="min-w-[300px] max-w-[300px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 cursor-pointer"
                onClick={() => window.location.href = `/auction/${auction.id}`}
              >
                <CardContent className="p-0">
                  {/* Product Image with Timer Overlay and Status Badge */}
                  <div className="relative">
                    <Image 
                      src={auction.image} 
                      alt={auction.title}
                      width={300}
                      height={192}
                      className="w-full h-48 object-cover"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-lg">
                      <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm font-bold">{auction.status}</span>
                    </div>
                    {/* Timer Overlay */}
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg">
                      <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm font-bold">{auction.timer}</span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Category */}
                    <p className="text-gray-500 text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm mb-2">{auction.category}</p>
                    
                    {/* Title */}
                    <h3 
                      className="text-gray-900 font-bold mb-3 leading-tight"
                      style={{
                        fontFamily: 'TT Firs Neue Variable',
                        fontWeight: 700,
                      }}
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
