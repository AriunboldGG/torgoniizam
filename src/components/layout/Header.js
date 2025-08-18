"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative">
      {/* Top Orange Strip */}
      <div className="h-1 bg-[#FF4405] w-full"></div>
      
      {/* Main Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <Image src="/svg/header/main-logo.svg" alt="Logo" width={100} height={64} className="w-[100px] h-[64px]" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              {/* Home Page */}
              <Link href="/">
                <Button 
                  className="bg-[#FF4405] hover:bg-[#E63D04] text-white px-8 py-3 rounded-lg font-bold transition-colors uppercase"
                  style={{
                    fontFamily: 'TT Firs Neue Variable',
                    fontWeight: 700,
                    letterSpacing: '2.4%',
                  }}
                >
                  <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                    ЭХЛЭЛ
                  </span>
                </Button>
              </Link>

              {/* Auction Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors font-bold uppercase"
                  style={{
                    fontFamily: 'TT Firs Neue Variable',
                    fontWeight: 700,
                    letterSpacing: '2.4%',
                  }}
                >
                  <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">ДУУДЛАГА ХУДАЛДАА</span>
                  <Image 
                    src="/svg/header/dropdown-header.svg" 
                    alt="Dropdown" 
                    width={12}
                    height={12}
                    className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-50">
                    <Link href="/auctions/today">
                      <div className="px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <span 
                          className="font-bold uppercase"
                          style={{
                            fontFamily: 'TT Firs Neue Variable',
                            fontWeight: 700,
                            letterSpacing: '2.4%',
                            color: '#FF4405'
                          }}
                        >
                          <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                            Өнөөдөр болох дуудлага худалдаа
                          </span>
                        </span>
                      </div>
                    </Link>
                    <Link href="/auctions/pending">
                      <div className="px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <span 
                          className="font-bold uppercase"
                          style={{
                            fontFamily: 'TT Firs Neue Variable',
                            fontWeight: 700,
                            letterSpacing: '2.4%',
                            color: '#111827'
                          }}
                        >
                          <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                            Хүлээгдэж буй дуудлага худалдаа
                          </span>
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* About Page */}
              <Link href="/about">
                <span 
                  className="text-gray-900 hover:text-gray-700 transition-colors cursor-pointer font-bold uppercase"
                  style={{
                    fontFamily: 'TT Firs Neue Variable',
                    fontWeight: 700,
                    letterSpacing: '2.4%',
                  }}
                >
                  <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">ТАНИЛЦУУЛГА</span>
                </span>
              </Link>
            </nav>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Registration */}
              <Link href="/auth/signup">
                <Button 
                  variant="outline"
                  className="bg-white text-[#FF4405] hover:bg-[#FF4405] hover:text-white px-6 py-3 rounded-lg transition-all duration-200 font-bold uppercase"
                  style={{
                    fontFamily: 'TT Firs Neue Variable',
                    fontWeight: 700,
                    letterSpacing: '2.4%',
                  }}
                >
                  <Image src="/svg/header/signIn.svg" alt="Plus" width={16} height={16} className="w-4 h-4 mr-2" />
                  <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">БҮРТГҮҮЛЭХ</span>
                </Button>
              </Link>

              {/* Login */}
              <Link href="/auth/login">
                <Button 
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors font-bold uppercase"
                  style={{
                    fontFamily: 'TT Firs Neue Variable',
                    fontWeight: 700,
                    letterSpacing: '2.4%',
                  }}
                >
                  <Image src="/svg/header/login.svg" alt="Arrow" width={16} height={16} className="w-4 h-4" />
                  <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">НЭВТРЭХ</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col space-y-1 p-2"
              aria-label="Toggle mobile menu"
            >
              <span className={`block w-6 h-0.5 bg-gray-900 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-900 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-900 transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-4">
                {/* Home Page */}
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="px-4 py-3 bg-[#FF4405] text-white rounded-lg text-center font-bold transition-colors uppercase"
                    style={{
                      fontFamily: 'TT Firs Neue Variable',
                      fontWeight: 700,
                      letterSpacing: '2.4%',
                    }}
                  >
                    <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">ЭХЛЭЛ</span>
                  </div>
                </Link>

                {/* Auction Links */}
                <div className="space-y-2">
                  <Link href="/auctions/today" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors rounded-lg">
                      <span 
                        className="font-bold uppercase"
                        style={{
                          fontFamily: 'TT Firs Neue Variable',
                          fontWeight: 700,
                          letterSpacing: '2.4%',
                          color: '#FF4405'
                        }}
                      >
                        <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                          Өнөөдөр болох дуудлага худалдаа
                        </span>
                      </span>
                    </div>
                  </Link>
                  <Link href="/auctions/pending" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors rounded-lg">
                      <span 
                        className="font-bold uppercase"
                        style={{
                          fontFamily: 'TT Firs Neue Variable',
                          fontWeight: 700,
                          letterSpacing: '2.4%',
                          color: '#111827'
                        }}
                      >
                        <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                          Хүлээгдэж буй дуудлага худалдаа
                        </span>
                      </span>
                    </div>
                  </Link>
                </div>

                {/* About Page */}
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors rounded-lg">
                    <span 
                      className="font-bold uppercase"
                      style={{
                        fontFamily: 'TT Firs Neue Variable',
                        fontWeight: 700,
                        letterSpacing: '2.4%',
                      }}
                    >
                      <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">ТАНИЛЦУУЛГА</span>
                    </span>
                  </div>
                </Link>
              </nav>

              {/* Mobile User Actions */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                {/* Registration */}
                <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button 
                    variant="outline"
                    className="w-full bg-white text-[#FF4405] hover:bg-[#FF4405] hover:text-white py-3 rounded-lg transition-all duration-200 font-bold uppercase"
                    style={{
                      fontFamily: 'TT Firs Neue Variable',
                      fontWeight: 700,
                      letterSpacing: '2.4%',
                    }}
                  >
                    <Image src="/svg/header/signIn.svg" alt="Plus" width={16} height={16} className="w-4 h-4 mr-2" />
                    <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">БҮРТГҮҮЛЭХ</span>
                  </Button>
                </Link>

                {/* Login */}
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button 
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors font-bold uppercase"
                    style={{
                      fontFamily: 'TT Firs Neue Variable',
                      fontWeight: 700,
                      letterSpacing: '2.4%',
                    }}
                  >
                    <Image src="/svg/header/login.svg" alt="Arrow" width={16} height={16} className="w-4 h-4" />
                    <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">НЭВТРЭХ</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 