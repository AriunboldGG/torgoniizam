import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSearch() {
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
      {/* Background with SVG pattern */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <Image 
            src="/svg/search-background.svg" 
            alt="Search Background Pattern" 
            width={1200}
            height={320}
            className="opacity-100 w-full object-cover rounded-2xl"
            style={{ height: '320px' }}
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="mb-6">
          <h1 
            className="text-white mb-6 leading-tight font-bold uppercase"
            style={{
              fontFamily: 'TT Firs Neue Variable',
              fontWeight: 700,
            }}
          >
            <span className="text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile xl:text-xl-mobile 2xl:text-2xl-mobile 3xl:text-3xl-mobile 4xl:text-4xl-mobile 5xl:text-5xl-mobile">
              ХҮССЭН БҮХНЭЭ ДУУДЛАГА
            </span>
          </h1>
          <h2 
            className="text-white leading-tight font-bold uppercase"
            style={{
              fontFamily: 'TT Firs Neue Variable',
              fontWeight: 700,
            }}
          >
            <span className="text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile xl:text-xl-mobile 2xl:text-2xl-mobile 3xl:text-3xl-mobile 4xl:text-4xl-mobile 5xl:text-5xl-mobile">
              ХУДАЛДААНААС
            </span>
          </h2>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            {/* Search Container */}
            <div className="flex-1 max-w-3xl">
              <div className="bg-white rounded-full shadow-lg flex items-center">
                {/* Search Input */}
                <div className="flex-1 px-6 py-4">
                  <input
                    type="text"
                    placeholder="Барааны нэрээр хайх ..."
                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile"
                    style={{
                      fontFamily: 'TT Firs Neue Variable',
                      fontWeight: 500
                    }}
                  />
                </div>
                
                {/* Separator */}
                <div className="w-px h-8 bg-gray-300"></div>
                
                {/* Category Dropdown */}
                <div className="px-6 py-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-r-full transition-colors">
                  <span 
                    className="text-gray-600 text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile"
                    style={{
                      fontFamily: 'TT Firs Neue Variable',
                      fontWeight: 500
                    }}
                  >
                    Бүх ангилал
                  </span>
                  <Image 
                    src="/svg/dropdown-search.svg" 
                    alt="Dropdown" 
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>
            
            {/* Search Button */}
            <div className="ml-4">
              <Button 
                size="lg"
                className="w-16 h-16 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg flex items-center justify-center"
                style={{
                  fontFamily: 'TT Firs Neue Variable',
                  fontWeight: 700
                }}
              >
                <span className="text-white text-2xl">🔍</span>
              </Button>
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
} 