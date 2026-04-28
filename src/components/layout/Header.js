"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { useRouter, usePathname } from "next/navigation";
import { MdPerson } from "react-icons/md";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  
  // Refs for dropdown elements
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns when navigating to a new page
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close auction dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      
      // Close user menu dropdown
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <div className="bg-white dark:bg-[#0e1117] shadow-sm border-b dark:border-[#2a2e4a] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <Link href="/">
                {/* Light mode logo */}
                <Image src="/svg/header/main-logo.svg" alt="Logo" width={100} height={64} className="w-[100px] h-[64px] cursor-pointer hover:opacity-80 transition-opacity dark:hidden" />
                {/* Dark mode logo */}
                <Image src="/svg/header/main-logo-light.svg" alt="Logo" width={100} height={64} className="w-[100px] h-[64px] cursor-pointer hover:opacity-80 transition-opacity hidden dark:block" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-10">
              {/* Home Page */}
              <Link href="/">
                <div 
                  className={`px-3 lg:px-4 xl:px-6 py-2 rounded-full font-bold transition-colors uppercase cursor-pointer font-tt-firs-neue-variable tracking-[2.4%] ${
                    isActivePage("/") 
                      ? "bg-[#FF4405] text-white" 
                      : "bg-white text-gray-700"
                  }`}
                >
                  <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                    ЭХЛЭЛ
                  </span>
                </div>
              </Link>

              {/* Auction Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center space-x-2 transition-colors font-bold uppercase px-3 lg:px-4 xl:px-6 py-2 xl:py-3 rounded-full font-tt-firs-neue-variable tracking-[2.4%] ${
                    isActivePage("/auctions/live-auctions") || isActivePage("/auctions/today") || isActivePage("/auctions/pending")
                      ? "bg-[#FF4405] text-white"
                      : "text-gray-900 hover:text-gray-700"
                  }`}
                >
                  <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">ДУУДЛАГА ХУДАЛДАА</span>
                  <Image 
                    src="/svg/header/dropdown-header.svg" 
                    alt="Dropdown" 
                    width={12}
                    height={12}
                    className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''} ${
                      isActivePage("/auctions/live-auctions") || isActivePage("/auctions/today") || isActivePage("/auctions/pending") ? "invert" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 w-72 bg-white dark:bg-[#1a1d2e] rounded-lg shadow-xl border border-gray-200 dark:border-[#2a2e4a] py-3 z-50">
                    <Link href="/auctions/live-auctions" onClick={() => setIsDropdownOpen(false)}>
                      <div className={`px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                        isActivePage("/auctions/live-auctions") ? "bg-orange-50" : ""
                      }`}>
                        <span 
                          className={`font-bold uppercase transition-colors font-tt-firs-neue-variable tracking-[2.4%] ${
                            isActivePage("/auctions/live-auctions") 
                              ? "text-[#FF4405]" 
                              : "text-gray-700 hover:text-[#FF4405]"
                          }`}
                        >
                          <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                            Одоо явагдаж буй дуудлага худалдаа
                          </span>
                        </span>
                      </div>
                    </Link>
                    <Link href="/auctions/today" onClick={() => setIsDropdownOpen(false)}>
                      <div className={`px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                        isActivePage("/auctions/today") ? "bg-orange-50" : ""
                      }`}>
                        <span 
                          className={`font-bold uppercase transition-colors font-tt-firs-neue-variable tracking-[2.4%] ${
                            isActivePage("/auctions/today") 
                              ? "text-[#FF4405]" 
                              : "text-gray-700 hover:text-[#FF4405]"
                          }`}
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
                          className={`font-bold uppercase transition-colors font-tt-firs-neue-variable tracking-[2.4%] ${
                            isActivePage("/auctions/pending") 
                              ? "text-[#FF4405]" 
                              : "text-gray-700 hover:text-[#FF4405]"
                          }`}
                        >
                          <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                            Хүлээгдэж буй дуудлага худалдаа
                          </span>
                        </span>
                      </div>
                    </Link>
                    <Link href="/auctions/completed" onClick={() => setIsDropdownOpen(false)}>
                      <div className={`px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                        isActivePage("/auctions/completed") ? "bg-green-50" : ""
                      }`}>
                        <span 
                          className={`font-bold uppercase transition-colors font-tt-firs-neue-variable tracking-[2.4%] ${
                            isActivePage("/auctions/completed") 
                              ? "text-green-600" 
                              : "text-gray-700 hover:text-green-600"
                          }`}
                        >
                          <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
                            Дууссан дуудлага худалдаа
                          </span>
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* My History - Only for logged in users */}
              {user && (
                <Link href="/auctions/my-auctions">
                  <div 
                    className={`px-3 lg:px-4 xl:px-5 py-2 rounded-full font-bold transition-colors uppercase cursor-pointer font-tt-firs-neue-variable tracking-[2.4%] ${
                      isActivePage("/auctions/my-auctions") 
                        ? "bg-[#FF4405] text-white" 
                        : "bg-white text-gray-700"
                    }`}
                  >
                    <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">МИНИЙ ТҮҮХ</span>
                  </div>
                </Link>
              )}

              {/* About Page */}
              <Link href="/about">
                <div 
                  className={`px-3 lg:px-4 xl:px-5 py-2 rounded-full font-bold transition-colors uppercase cursor-pointer font-tt-firs-neue-variable tracking-[2.4%] ${
                    isActivePage("/about") 
                      ? "bg-[#FF4405] text-white" 
                      : "bg-white text-gray-700"
                  }`}
                >
                  <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">ТАНИЛЦУУЛГА</span>
                </div>
              </Link>
            </nav>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center space-x-2 xl:space-x-4">
              {/* Dark / Light mode toggle */}
              <ThemeToggle />

     
              
              {user ? (
                /* Logged in user - show user menu */
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <MdPerson className="text-white text-xl" />
                    </div>
                    <span className="font-medium text-gray-900">{user.fullName}</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#1a1d2e] rounded-lg shadow-xl border border-gray-200 dark:border-[#2a2e4a] py-2 z-50">
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
                      className="bg-white text-[#FF4405] hover:bg-[#FF4405] hover:text-white px-3 lg:px-4 xl:px-6 py-2 xl:py-3 rounded-lg transition-all duration-200 font-bold uppercase font-tt-firs-neue-variable tracking-[2.4%]"
                    >
                      <Image src="/svg/header/signIn.svg" alt="Plus" width={16} height={16} className="w-4 h-4 mr-2" />
                      <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">БҮРТГҮҮЛЭХ</span>
                    </Button>
                  </Link>

                  {/* Login */}
                  <Link href="/auth/login">
                    <Button 
                      className="bg-gray-900 hover:bg-gray-800 text-white px-3 lg:px-4 xl:px-6 py-2 xl:py-3 rounded-lg flex items-center space-x-2 transition-colors font-bold uppercase font-tt-firs-neue-variable tracking-[2.4%]"
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
              <span className={`block w-6 h-0.5 bg-gray-900 dark:bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-900 dark:bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-900 dark:bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Menu - Full Screen Drawer */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-white dark:bg-[#0e1117] z-50 flex flex-col overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-[#2a2e4a] flex-shrink-0">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/svg/header/main-logo.svg" alt="Logo" width={72} height={46} className="w-[72px] h-[46px] dark:hidden" />
                  <Image src="/svg/header/main-logo-light.svg" alt="Logo" width={72} height={46} className="w-[72px] h-[46px] hidden dark:block" />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close mobile menu"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3">

                {/* Nav items */}
                <nav className="flex flex-col">
                  {[
                    { label: "ЭХЛЭЛ", href: "/" },
                    { label: "ОДОО ЯВАГДАЖ БУЙ ДУУДЛАГА ХУДАЛДАА", href: "/auctions/live-auctions" },
                    { label: "ӨНӨӨДӨР БОЛОХ ДУУДЛАГА ХУДАЛДАА", href: "/auctions/today" },
                    { label: "ХҮЛЭЭГДЭЖ БУЙ ДУУДЛАГА ХУДАЛДАА", href: "/auctions/pending" },
                    ...(user ? [{ label: "МИНИЙ ТҮҮХ", href: "/auctions/my-auctions" }] : []),
                    { label: "ТАНИЛЦУУЛГА", href: "/about" },
                  ].map(({ label, href }) => {
                    const active = isActivePage(href)
                    return (
                      <Link key={href} href={href} onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 last:border-b-0">
                        <div className={`w-full px-2 py-3.5 text-left font-bold uppercase font-tt-firs-neue-variable tracking-[2.4%] text-sm leading-6 transition-colors ${
                          active
                            ? "text-[#FF4405]"
                            : "text-gray-800 hover:text-[#FF4405]"
                        }`}>
                          {label}
                        </div>
                      </Link>
                    )
                  })}
                </nav>

                {/* Divider */}
                <div className="border-t border-gray-100 my-1" />

                {/* Theme + Notification row */}
                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* User section */}
                {user ? (
                  <div className="flex flex-col gap-3 pt-1">
                    {/* User row: avatar + name/email + theme toggle */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-base">{user.avatar}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm truncate">{user.fullName}</p>
                        {user.email && <p className="text-xs text-gray-400 truncate">{user.email}</p>}
                      </div>
                      <div className="flex-shrink-0">
                        <ThemeToggle />
                      </div>
                    </div>

                    <Link href="/my-account" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full py-3 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50">
                        Миний профайл
                      </Button>
                    </Link>

                    <Button
                      onClick={handleLogout}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-sm font-semibold"
                    >
                      Гарах
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 pt-1">
                    <div className="flex justify-end">
                      <ThemeToggle />
                    </div>
                    <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full py-3 rounded-xl font-bold uppercase text-sm border-2 border-[#FF4405] text-[#FF4405] hover:bg-[#FF4405] hover:text-white transition-all font-tt-firs-neue-variable tracking-[2.4%]">
                        <Image src="/svg/header/signIn.svg" alt="" width={16} height={16} className="w-4 h-4 mr-2" />
                        БҮРТГҮҮЛЭХ
                      </Button>
                    </Link>
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-bold uppercase text-sm font-tt-firs-neue-variable tracking-[2.4%] flex items-center justify-center gap-2">
                        <Image src="/svg/header/login.svg" alt="" width={16} height={16} className="w-4 h-4" />
                        НЭВТРЭХ
                      </Button>
                    </Link>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 