"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdowns when navigating to a new page
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  // Check if current page is active
  const isActivePage = (path) => {
    return pathname === path;
  };

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
                <div 
                  className={`px-6 py-2 rounded-full font-bold transition-colors uppercase cursor-pointer ${
                    isActivePage("/") 
                      ? "bg-[#FF4405] text-white" 
                      : "bg-white text-gray-700"
                  }`}
                  style={{
                    fontFamily: 'TT Firs Neue Variable',
                    fontWeight: 700,
                    letterSpacing: '2.4%',
                  }}
                >
                  <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                    ЭХЛЭЛ
                  </span>
                </div>
              </Link>

              {/* Auction Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center space-x-2 transition-colors font-bold uppercase px-6 py-3 rounded-full ${
                    isActivePage("/auctions/today") || isActivePage("/auctions/pending")
                      ? "bg-[#FF4405] text-white"
                      : "text-gray-900 hover:text-gray-700"
                  }`}
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
                    className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''} ${
                      isActivePage("/auctions/today") || isActivePage("/auctions/pending") ? "invert" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-50">
                    <Link href="/auctions/today" onClick={() => setIsDropdownOpen(false)}>
                      <div className={`px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                        isActivePage("/auctions/today") ? "bg-orange-50" : ""
                      }`}>
                        <span 
                          className={`font-bold uppercase transition-colors ${
                            isActivePage("/auctions/today") 
                              ? "text-[#FF4405]" 
                              : "text-gray-700 hover:text-[#FF4405]"
                          }`}
                          style={{
                            fontFamily: 'TT Firs Neue Variable',
                            fontWeight: 700,
                            letterSpacing: '2.4%',
                          }}
                        >
                          <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                            Өнөөдөр болох дуудлага худалдаа
                          </span>
                        </span>
                      </div>
                    </Link>
                    <Link href="/auctions/pending" onClick={() => setIsDropdownOpen(false)}>
                      <div className={`px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                        isActivePage("/auctions/pending") ? "bg-orange-50" : ""
                      }`}>
                        <span 
                          className={`font-bold uppercase transition-colors ${
                            isActivePage("/auctions/pending") 
                              ? "text-[#FF4405]" 
                              : "text-gray-700 hover:text-[#FF4405]"
                          }`}
                          style={{
                            fontFamily: 'TT Firs Neue Variable',
                            fontWeight: 700,
                            letterSpacing: '2.4%',
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
                <div 
                  className={`px-5 py-2 rounded-full font-bold transition-colors uppercase cursor-pointer ${
                    isActivePage("/about") 
                      ? "bg-[#FF4405] text-white" 
                      : "bg-white text-gray-700"
                  }`}
                  style={{
                    fontFamily: 'TT Firs Neue Variable',
                    fontWeight: 700,
                    letterSpacing: '2.4%',
                  }}
                >
                  <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">ТАНИЛЦУУЛГА</span>
                </div>
              </Link>
            </nav>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                /* Logged in user - show user menu */
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{user.avatar}</span>
                    </div>
                    <span className="font-medium text-gray-900">{user.fullName}</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <Link href="/my-account">
                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors">
                          <span className="text-sm font-medium text-gray-700">Миний профайл</span>
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-700">Гарах</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Not logged in - show auth buttons */
                <>
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
                </>
              )}
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

          {/* Mobile Menu - Full Screen */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <Image src="/svg/header/main-logo.svg" alt="Logo" width={80} height={50} className="w-[80px] h-[50px]" />
                  <span className="text-lg font-bold text-gray-900">Цэс</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close mobile menu"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="px-4 py-6 space-y-6">
                {/* Mobile Navigation */}
                <nav className="space-y-4">
                  {/* Home Page */}
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className={`px-6 py-4 rounded-full text-center font-bold transition-colors uppercase cursor-pointer ${
                      isActivePage("/") 
                        ? "bg-[#FF4405] text-white" 
                        : "bg-white text-gray-700 border border-gray-200"
                    }`}
                      style={{
                        fontFamily: 'TT Firs Neue Variable',
                        fontWeight: 700,
                        letterSpacing: '2.4%',
                      }}
                    >
                      <span className="text-sm">ЭХЛЭЛ</span>
                    </div>
                  </Link>

                  {/* Auction Links */}
                  <div className="space-y-3">
                    <Link href="/auctions/today" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors rounded-full border ${
                        isActivePage("/auctions/today") ? "bg-orange-50 border-orange-200" : "border-gray-200"
                      }`}>
                        <span 
                          className={`font-bold uppercase ${
                            isActivePage("/auctions/today") 
                              ? "text-[#FF4405]" 
                              : "text-gray-700"
                          }`}
                          style={{
                            fontFamily: 'TT Firs Neue Variable',
                            fontWeight: 700,
                            letterSpacing: '2.4%',
                          }}
                        >
                          <span className="text-sm">
                            Өнөөдөр болох дуудлага худалдаа
                          </span>
                        </span>
                      </div>
                    </Link>
                    <Link href="/auctions/pending" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors rounded-full border ${
                        isActivePage("/auctions/pending") ? "bg-orange-50 border-orange-200" : "border-gray-200"
                      }`}>
                        <span 
                          className={`font-bold uppercase ${
                            isActivePage("/auctions/pending") 
                              ? "text-[#FF4405]" 
                              : "text-gray-700"
                          }`}
                          style={{
                            fontFamily: 'TT Firs Neue Variable',
                            fontWeight: 700,
                            letterSpacing: '2.4%',
                          }}
                        >
                          <span className="text-sm">
                            Хүлээгдэж буй дуудлага худалдаа
                          </span>
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* About Page */}
                  <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className={`px-6 py-4 rounded-full text-center font-bold transition-colors uppercase cursor-pointer ${
                      isActivePage("/about") 
                        ? "bg-[#FF4405] text-white" 
                        : "bg-white text-gray-700 border border-gray-200"
                    }`}
                      style={{
                        fontFamily: 'TT Firs Neue Variable',
                        fontWeight: 700,
                        letterSpacing: '2.4%',
                      }}
                    >
                      <span className="text-sm">ТАНИЛЦУУЛГА</span>
                    </div>
                  </Link>
                </nav>

                {/* Mobile User Actions */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  {user ? (
                    /* Logged in user - show user info and logout */
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 px-6 py-4 bg-gray-50 rounded-full">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{user.avatar}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">{user.fullName}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      
                      <Link href="/my-account" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button 
                          variant="outline"
                          className="w-full bg-white text-gray-700 hover:bg-gray-50 py-4 rounded-full transition-colors font-medium text-base border-2"
                        >
                          Миний профайл
                        </Button>
                      </Link>

                      <Button 
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-full transition-colors font-medium text-base"
                      >
                        Гарах
                      </Button>
                    </div>
                  ) : (
                    /* Not logged in - show auth buttons */
                    <>
                      {/* Registration */}
                      <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button 
                          variant="outline"
                          className="w-full bg-white text-[#FF4405] hover:bg-[#FF4405] hover:text-white py-4 rounded-full transition-all duration-200 font-bold uppercase border-2 border-[#FF4405]"
                          style={{
                            fontFamily: 'TT Firs Neue Variable',
                            fontWeight: 700,
                            letterSpacing: '2.4%',
                          }}
                        >
                          <Image src="/svg/header/signIn.svg" alt="Plus" width={20} height={20} className="w-5 h-5 mr-3" />
                          <span className="text-base">БҮРТГҮҮЛЭХ</span>
                        </Button>
                      </Link>

                      {/* Login */}
                      <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button 
                          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-full flex items-center justify-center space-x-3 transition-colors font-bold uppercase text-base"
                          style={{
                            fontFamily: 'TT Firs Neue Variable',
                            fontWeight: 700,
                            letterSpacing: '2.4%',
                          }}
                        >
                          <Image src="/svg/header/login.svg" alt="Arrow" width={20} height={20} className="w-5 h-5" />
                          <span>НЭВТРЭХ</span>
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 