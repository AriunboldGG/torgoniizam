"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CompletedAuctionSection() {
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

  const completedAuctions = [
    {
      id: 1,
      image: "/images/end1.png",
      category: "Гар утас, таблет",
      title: "САМСУНГ ГАЛАКСИ S24 - ХАМГИЙН ШИНЭ МОДЕЛЬ",
      finalPrice: "1,400,000₮",
      status: "ДУУССАН"
    },
    {
      id: 2,
      image: "/images/end2.png",
      category: "Цахилгаан бараа",
      title: "СОНИ БРАВИЯ - 4K ХАМГИЙН САЙН КАЧЕСТЬТЭЙ",
      finalPrice: "480,000₮",
      status: "ДУУССАН"
    },
    {
      id: 3,
      image: "/images/end3.png",
      category: "Үнэт эдлэл",
      title: "ДАМАСКУС ГАН - ХУУЧИН АРТИЗАНЫ ГАРТ ХИЙСЭН",
      finalPrice: "1,280,000₮",
      status: "ДУУССАН"
    },
    {
      id: 4,
      image: "/images/end4.png",
      category: "Автомашин",
      title: "ФОРД БРОНКО - ХАМГИЙН ХҮЧИРХЭГ SUV",
      finalPrice: "820,000₮",
      status: "ДУУССАН"
    },
    {
      id: 5,
      image: "/images/end1.png",
      category: "Компьютер",
      title: "ЭППЛ МАКБУК ПРО M3 - ХҮЧИРХЭГ ПРОЦЕССОРТОЙ",
      finalPrice: "3,680,000₮",
      status: "ДУУССАН"
    },
    {
      id: 6,
      image: "/images/end2.png",
      category: "Үнэт эдлэл",
      title: "БРИЛЛИАНТ ЭРГЭНЭ - 5 КАРАТЫН ЧИСТЭЙ ТАЛСТ",
      finalPrice: "2,450,000₮",
      status: "ДУУССАН"
    },
    {
      id: 7,
      image: "/images/end3.png",
      category: "Автомашин",
      title: "ТОЙОТА ЛЭНД КРУЗЕР - Борлуулагчийн ХАМГИЙН САЙН СОНГОЛТ",
      finalPrice: "45,800,000₮",
      status: "ДУУССАН"
    },
    {
      id: 8,
      image: "/images/end4.png",
      category: "Цахилгаан бараа",
      title: "СОНИ ПЛЕЙСТЕЙШН 5 - ГЭМТЭЛГҮЙ БАЙГУУЛЛАГА",
      finalPrice: "1,750,000₮",
      status: "ДУУССАН"
    },
    {
      id: 9,
      image: "/images/end1.png",
      category: "Үнэт эдлэл",
      title: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
      finalPrice: "890,000₮",
      status: "ДУУССАН"
    },
    {
      id: 10,
      image: "/images/end2.png",
      category: "Компьютер",
      title: "ГЭЙМИНГ КОМПЬЮТЕР - RTX 4090 ГРАФИК КАРТТАЙ",
      finalPrice: "4,200,000₮",
      status: "ДУУССАН"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
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
                ДУУССАН ДУУДЛАГА ХУДАЛДАА
              </span>
            </h2>
          </div>
          
          <Link href="/auctions/completed" target="_blank" rel="noopener noreferrer">
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
            {completedAuctions.map((auction) => (
              <Card 
                key={auction.id} 
                className="min-w-[300px] max-w-[300px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 cursor-pointer"
                onClick={() => window.location.href = `/auction/${auction.id}`}
              >
                <CardContent className="p-0">
                  {/* Product Image with Status Badge */}
                  <div className="relative">
                    <Image 
                      src={auction.image} 
                      alt={auction.title}
                      width={300}
                      height={192}
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
                      <p className="text-gray-500 text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm mb-1">Сүүлийн үнэ:</p>
                      <p className="text-orange-500 font-bold text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile">{auction.finalPrice}</p>
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
