"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";

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

  const liveAuctions = [
    {
      id: 1,
      image: "/images/live1.png",
      category: "Автомашин",
      title: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
      lastPrice: "53,400,000₮",
      timer: "2 : 32 : 58 : 14",
      buttonColor: "bg-black"
    },
    {
      id: 2,
      image: "/images/live2.png",
      category: "Цахилгаан бараа",
      title: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
      lastPrice: "480,000₮",
      timer: "2 : 18 : 52 : 14",
      buttonColor: "bg-orange-500"
    },
    {
      id: 3,
      image: "/images/live3.png",
      category: "Компьютер",
      title: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
      lastPrice: "820,000₮",
      timer: "0 : 04 : 16 : 02",
      buttonColor: "bg-black"
    },
    {
      id: 4,
      image: "/images/live4.png",
      category: "Үнэт эдлэл",
      title: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
      lastPrice: "1,280,000₮",
      timer: "1 : 20 : 49 : 72",
      buttonColor: "bg-black"
    },
    {
      id: 5,
      image: "/images/live1.png",
      category: "Автомашин",
      title: "ТОЙОТА ЛЭНД КРУЗЕР - ДЭЛГҮҮРИЙН ХАМГИЙН САЙН СОНГОЛТ",
      lastPrice: "45,800,000₮",
      timer: "3 : 15 : 42 : 30",
      buttonColor: "bg-black"
    },
    {
      id: 6,
      image: "/images/live2.png",
      category: "Цахилгаан бараа",
      title: "САМСУНГ ГАЛАКСИ S24 - ХАМГИЙН ШИНЭ МОДЕЛЬ",
      lastPrice: "2,450,000₮",
      timer: "1 : 45 : 23 : 18",
      buttonColor: "bg-orange-500"
    },
    {
      id: 7,
      image: "/images/live3.png",
      category: "Компьютер",
      title: "ЭППЛ МАКБУК ПРО M3 - ХҮЧИРХЭГ ПРОЦЕССОРТОЙ",
      lastPrice: "3,680,000₮",
      timer: "0 : 52 : 18 : 45",
      buttonColor: "bg-black"
    },
    {
      id: 8,
      image: "/images/live4.png",
      category: "Үнэт эдлэл",
      title: "ДАМАСКУС ГАН - ХУУЧИН АРТИЗАНЫ ГАРТ ХИЙСЭН",
      lastPrice: "890,000₮",
      timer: "4 : 12 : 35 : 22",
      buttonColor: "bg-black"
    },
    {
      id: 9,
      image: "/images/live1.png",
      category: "Автомашин",
      title: "ХОНДА ЦИВИК - ЭДИЙН ЗАСГИЙН ХЭМНЭЛТТЭЙ",
      lastPrice: "28,900,000₮",
      timer: "2 : 08 : 15 : 40",
      buttonColor: "bg-orange-500"
    },
    {
      id: 10,
      image: "/images/live2.png",
      category: "Цахилгаан бараа",
      title: "СОНИ ПЛЕЙСТЕЙШН 5 - ГЭМТЭЛГҮЙ БАЙГУУЛЛАГА",
      lastPrice: "1,750,000₮",
      timer: "0 : 38 : 52 : 15",
      buttonColor: "bg-black"
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
                ЯВАГДАЖ БУЙ ДУУДЛАГА ХУДАЛДАА
              </span>
            </h2>
          </div>
          
          <Button 
            variant="outline"
            className="bg-white text-gray-900 hover:bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 uppercase"
            style={{
              fontFamily: 'TT Firs Neue Variable',
              fontWeight: 700,
              letterSpacing: '2.4%',
            }}
          >
            <img src="/svg/see-all.svg" alt="See All" className="w-4 h-4 mr-2" />
            <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
              Бүгдийг үзэх
            </span>
          </Button>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <img src="/svg/left.svg" alt="Previous" className="w-6 h-6" />
          </button>
          
          <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <img src="/svg/right.svg" alt="Next" className="w-6 h-6" />
          </button>

          {/* Horizontal Scrollable Cards Row */}
          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {liveAuctions.map((auction) => (
              <Card key={auction.id} className="min-w-[300px] max-w-[300px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex-shrink-0">
                <CardContent className="p-0">
                  {/* Product Image with Timer Overlay */}
                  <div className="relative">
                    <img 
                      src={auction.image} 
                      alt={auction.title}
                      className="w-full h-48 object-cover"
                    />
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
                      <p className="text-gray-500 text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm mb-1">Сүүлийн үнэ</p>
                      <p className="text-red-600 font-bold text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile">{auction.lastPrice}</p>
                    </div>
                    
                    {/* Bid Button */}
                    <div className="flex justify-end">
                      <button 
                        className={`${auction.buttonColor} w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`}
                      >
                        <img 
                          src="/svg/bid.svg" 
                          alt="Bid" 
                          className={`w-5 h-5 ${auction.buttonColor === 'bg-black' ? 'filter invert' : ''}`}
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