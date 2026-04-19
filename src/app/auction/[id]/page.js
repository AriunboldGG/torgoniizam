"use client"

import { useState, useEffect, useRef, use } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"
import PledgeDialog from "@/components/ui/pledge-dialog"
import BidDialog from "@/components/ui/bid-dialog"
import ImageZoom from "@/components/ui/image-zoom"
import { useUser } from "@/contexts/UserContext"
import { useSearchParams } from "next/navigation"
import { FaAward } from "react-icons/fa"
import { getAssetUrl } from "@/lib/utils"

// Countdown Timer Component
function CountdownTimer({ endTime, onEnd }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEnded, setIsEnded] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

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

        // Hide timer if more than 3 days remaining
        setShowTimer(days < 3);
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
      <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
        Дууссан
      </div>
    );
  }

  // Don't show timer if more than 3 days remaining
  if (!showTimer) {
    return null;
  }

  return (
    <div className="bg-black bg-opacity-70 text-white px-2 xs-mobile:px-3 py-1 rounded-lg text-xs xs-mobile:text-sm font-bold">
      {timeLeft.days}д {timeLeft.hours}ц {timeLeft.minutes}м {timeLeft.seconds}с
    </div>
  );
}

// Detailed Countdown Timer Component for main section
function DetailedCountdownTimer({ endTime, onEnd }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEnded, setIsEnded] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

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

        // Hide timer if more than 3 days remaining
        setShowTimer(days < 3);
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
      <div className="text-center">
        <div className="text-2xl font-bold text-red-600">ДУУССАН</div>
      </div>
    );
  }

  // Don't show timer if more than 3 days remaining
  if (!showTimer) {
    return (
      <div className="text-center">
        <div className="text-gray-600 text-lg">Дуудлага худалдаа эхлэхэд 3 хоногоос илүү үлдсэн байна</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-1 xs-mobile:space-x-2 sm:space-x-3 lg:space-x-4">
      <div className="text-center">
        <div className="text-lg xs-mobile:text-xl sm:text-2xl font-bold text-black">{timeLeft.days}</div>
        <div className="text-xs xs-mobile:text-sm text-gray-600">ӨДӨР</div>
      </div>
      <div className="text-lg xs-mobile:text-xl sm:text-2xl font-bold text-black">:</div>
      <div className="text-center">
        <div className="text-lg xs-mobile:text-xl sm:text-2xl font-bold text-black">{timeLeft.hours.toString().padStart(2, '0')}</div>
        <div className="text-xs xs-mobile:text-sm text-gray-600">ЦАГ</div>
      </div>
      <div className="text-lg xs-mobile:text-xl sm:text-2xl font-bold text-black">:</div>
      <div className="text-center">
        <div className="text-lg xs-mobile:text-xl sm:text-2xl font-bold text-black">{timeLeft.minutes.toString().padStart(2, '0')}</div>
        <div className="text-xs xs-mobile:text-sm text-gray-600">МИНУТ</div>
      </div>
      <div className="text-lg xs-mobile:text-xl sm:text-2xl font-bold text-black">:</div>
      <div className="text-center">
        <div className="text-lg xs-mobile:text-xl sm:text-2xl font-bold text-black">{timeLeft.seconds.toString().padStart(2, '0')}</div>
        <div className="text-xs xs-mobile:text-sm text-gray-600">СЕКУНД</div>
      </div>
    </div>
  );
}

// Get real user authentication state from UserContext

export default function AuctionItemPage({ params }) {
  const unwrappedParams = use(params);
  const { isLoggedIn, isLoading } = useUser();
  const searchParams = useSearchParams();
  const fromHistory = searchParams.get('from') === 'history';

  const [selectedImage, setSelectedImage] = useState(0);
  const [showPledgeDialog, setShowPledgeDialog] = useState(false);
  const [showBidDialog, setShowBidDialog] = useState(false);
  const [hasUserPledged, setHasUserPledged] = useState(false);
  const [pledgeStatusLoading, setPledgeStatusLoading] = useState(true);
  const [auctionItem, setAuctionItem] = useState(null);
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [bidderCount, setBidderCount] = useState(0);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const wsRef = useRef(null);
  const reconnectTimerRef = useRef(null);

  const handlePledgeConfirm = () => {
    setHasUserPledged(true);
  };

  const handleBidConfirm = () => {
    // Real-time update is handled by the WebSocket bid_updated message.
    // No local mutation needed.
  };

  // Single effect: wait for auth to settle, then fetch lot + check pledge in sequence.
  // This avoids the two-effect race where the pledge check fires before auth or lot are ready.
  useEffect(() => {
    if (isLoading) return; // auth not settled yet — wait for the next run

    let cancelled = false;
    setPledgeStatusLoading(true);

    const init = async () => {
      try {
        // ── Step 1: Fetch lot detail (public, no token needed) ──
        const response = await fetch(`/api/lot/detail/${unwrappedParams.id}`)
        const json = await response.json()
        const lot = json?.data ?? json
        console.log('lot data==>'. lot);
        

        if (cancelled) return;

        const rawImages = Array.isArray(lot.images) ? lot.images : []
        const images = rawImages.length > 0
          ? rawImages.map((img) => getAssetUrl(typeof img === "string" ? img : img.url ?? img.image ?? ""))
          : [getAssetUrl(lot.thumbnail ?? "/images/end4.png")]

        const specs = lot.attributes && typeof lot.attributes === "object" && !Array.isArray(lot.attributes)
          ? Object.entries(lot.attributes).map(([label, value]) => ({ label, value: String(value) }))
          : []

        const rawBids = Array.isArray(lot.last_bids) ? lot.last_bids : (Array.isArray(lot.bids) ? lot.bids : [])
        const bids = rawBids.map((b, i) => ({
            id: b.id ?? i,
            email: b.user?.email ?? b.email ?? "user@example.com",
            date: b.created_at ? new Date(b.created_at).toLocaleDateString("mn-MN") : "",
            amount: b.amount != null ? `${Number(b.amount).toLocaleString()}₮` : "",
          }))

        const startingPriceNum = lot.starting_price != null ? Number(lot.starting_price) : 0
        const currentBidNum = lot.current_bid != null ? Number(lot.current_bid) : startingPriceNum

        setAuctionItem({
          id: lot.id,
          status: lot.status?.key ?? lot.status ?? "",
          category: lot.category?.value ?? "",
          title: lot.name ?? "",
          startingPrice: `${startingPriceNum.toLocaleString()}₮`,
          lastPrice: `${currentBidNum.toLocaleString()}₮`,
          startDate: lot.start_date ?? "",
          endDate: lot.end_date ?? "",
          endTime: lot.end_date ?? new Date().toISOString(),
          description: lot.description ?? "",
          specifications: specs,
          images: images.length > 0 ? images : ["/images/end4.png"],
          bids,
          bidCount: lot.bid_count ?? bids.length,
          bidIncrements: Array.isArray(lot.bid_increments) ? lot.bid_increments : [],
        })

        // ── Step 2: Check pledge status (only for logged-in users) ──
        if (!isLoggedIn) {
          setHasUserPledged(false);
          return;
        }

        const token = localStorage.getItem("access_token");
        if (!token) {
          setHasUserPledged(false);
          return;
        }

        const lotId = lot.id ?? unwrappedParams.id;
        const pledgedRes = await fetch(`/api/lot/pledged/${lotId}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        if (cancelled) return;

        // Backend returns 200 when user has pledged, non-200 when not.
        // 409 from GET also means already pledged (backend conflict signal).
        setHasUserPledged(pledgedRes.ok || pledgedRes.status === 409);
      } catch (err) {
        if (!cancelled) setHasUserPledged(false);
      } finally {
        if (!cancelled) setPledgeStatusLoading(false);
      }
    };

    init();

    return () => { cancelled = true; };
  }, [unwrappedParams.id, isLoggedIn, isLoading]);

  // Close dialogs when user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      setShowPledgeDialog(false);
      setShowBidDialog(false);
    }
  }, [isLoggedIn]);

  // WebSocket: connect for real-time bid updates once the lot id is known
  useEffect(() => {
    if (!auctionItem?.id) return;

    const wsBase = (process.env.NEXT_PUBLIC_WS_URL || 'wss://ws.torgoniizam.mn').replace(/\/$/, '');
    const wsUrl = `${wsBase}/ws/${auctionItem.id}`;
    let attempts = 0;
    let destroyed = false;

    const connect = () => {
      if (destroyed) return;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'bid_updated') {
            const topBids = Array.isArray(msg.top_bids) ? msg.top_bids : [];
            const newBids = topBids.map((b, i) => ({
              id: i + 1,
              email: b.user?.value ?? '',
              date: b.created_at ? new Date(b.created_at).toLocaleDateString('mn-MN') : '',
              amount: b.amount != null ? `${Number(b.amount).toLocaleString()}₮` : '',
              status: b.status?.value ?? '',
            }));
            const newPrice = msg.bid?.amount != null
              ? `${Number(msg.bid.amount).toLocaleString()}₮`
              : null;
            setAuctionItem(prev => ({
              ...prev,
              ...(newPrice && { lastPrice: newPrice }),
              bids: newBids,
              bidCount: newBids.length,
            }));
            attempts = 0;
          } else if (msg.type === 'bidder_count') {
            setBidderCount(msg.count ?? 0);
          } else if (msg.type === 'auction_ended') {
            setAuctionEnded(true);
          }
        } catch {}
      };

      ws.onclose = () => {
        if (destroyed) return;
        const delay = Math.min(1000 * Math.pow(2, attempts), 30000);
        attempts++;
        reconnectTimerRef.current = setTimeout(connect, delay);
      };

      ws.onerror = () => ws.close();
    };

    connect();

    return () => {
      destroyed = true;
      clearTimeout(reconnectTimerRef.current);
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
      }
    };
  }, [auctionItem?.id]);

  // Show loading if auction item is not loaded yet or authentication is loading
  if (!auctionItem || isLoading || pledgeStatusLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4405] mx-auto mb-4"></div>
          <p className="text-gray-600">Уншиж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Auction Ended Banner */}
      {auctionEnded && (
        <div className="bg-red-600 text-white text-center py-3 px-4 font-bold text-sm">
          🔔 Энэ дуудлага худалдаа дууслаа!
        </div>
      )}
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-4 xs-mobile:py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-4 xs-mobile:mb-6">
            <nav className="flex items-center space-x-1 xs-mobile:space-x-2 text-xs xs-mobile:text-sm text-gray-500 overflow-x-auto">
              <Link href="/" className="hover:text-[#FF4405] whitespace-nowrap">Эхлэл</Link>
              <span>/</span>
              <Link href="/auctions/today" className="hover:text-[#FF4405] whitespace-nowrap">Дуудлага худалдаа</Link>
              <span>/</span>
              <span className="text-gray-900 truncate max-w-[120px] xs-mobile:max-w-[200px] sm:max-w-none">{auctionItem.title}</span>
            </nav>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs-mobile:gap-6 sm:gap-8 lg:gap-12">

            {/* Left Column - Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div
                className="relative bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setShowImageZoom(true)}
              >
                <Image
                  src={auctionItem.images[selectedImage]}
                  alt={auctionItem.title}
                  width={600}
                  height={600}
                  className="w-full h-64 sm:h-80 lg:h-[500px] object-cover"
                />

                {/* Zoom Icon Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>

                {/* Status Badge */}
                {(auctionEnded || auctionItem.status === 'expired' || auctionItem.status === 'sold') ? (
                  <div className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-1 rounded-lg text-sm font-bold">
                    ДУУССАН
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 bg-[#FF4405] text-white px-3 py-1 rounded-lg text-sm font-bold">
                    LIVE
                  </div>
                )}

                {/* Countdown Timer Overlay */}
                <div className="absolute bottom-4 left-4">
                  <CountdownTimer
                    endTime={auctionItem.endTime}
                    onEnd={() => {
                      // You can add additional logic here when an auction ends
                    }}
                  />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {auctionItem.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${selectedImage === index ? 'border-[#FF4405] scale-105' : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`${auctionItem.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-6">
              {/* Category and Title */}
              <div>
                <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {auctionItem.category}
                </div>
                <h1
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 font-tt-firs-neue-variable tracking-[2.4%]"
                >
                  {auctionItem.title}
                </h1>
                {auctionItem.description && (
                  <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                    {auctionItem.description}
                  </p>
                )}
              </div>

              {/* Pricing Section */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Эхлэх үнэ</p>
                    <p className="text-gray-700 font-bold text-xl sm:text-2xl">{auctionItem.startingPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Сүүлийн үнэ</p>
                    <p className="text-[#FF4405] font-bold text-xl sm:text-2xl">{auctionItem.lastPrice}</p>
                  </div>
                </div>
              </div>

              {/* Countdown Timer Component */}
              <div className="bg-gray-50 p-4 xs-mobile:p-6 rounded-2xl border border-gray-200">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-2 xs-mobile:space-x-3">
                    <Image src="/svg/live-time.svg" alt="Timer" width={20} height={20} className="w-5 h-5 xs-mobile:w-6 xs-mobile:h-6" />
                    <span className="text-gray-700 font-medium text-sm xs-mobile:text-base">Дуудлага худалдаа дуусах хугацаа</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <DetailedCountdownTimer
                      endTime={auctionItem.endTime}
                      onEnd={() => setAuctionEnded(true)}
                    />
                  </div>
                  {/* Start / End dates */}
                  <div className="w-full grid grid-cols-2 gap-3 pt-2 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Эхлэх огноо</p>
                      <p className="text-sm font-medium text-gray-800">{auctionItem.startDate ? (() => { const d = new Date(auctionItem.startDate); return `${d.getFullYear()} оны ${d.getMonth()+1}-р сарын ${d.getDate()}, ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; })() : '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Дуусах огноо</p>
                      <p className="text-sm font-medium text-gray-800">{auctionItem.endDate ? (() => { const d = new Date(auctionItem.endDate); return `${d.getFullYear()} оны ${d.getMonth()+1}-р сарын ${d.getDate()}, ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; })() : '—'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {(() => {
                  const isEnded = auctionEnded
                    || auctionItem.status === 'expired'
                    || auctionItem.status === 'sold'
                    || auctionItem.status === 'completed'
                    || (auctionItem.endTime && new Date(auctionItem.endTime) < new Date())
                  if (isEnded) return (
                    <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-bold">✕</span>
                        </div>
                        <p className="text-gray-600 font-medium text-sm">Дуудлага худалдаа дууссан байна</p>
                      </div>
                    </div>
                  )
                  return null
                })()}
                {!isLoggedIn && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-yellow-800 text-sm font-bold">!</span>
                      </div>
                      <div>
                        <p className="text-yellow-800 font-medium text-sm">
                          Нэвтрэх шаардлагатай
                        </p>
                        <p className="text-yellow-700 text-xs mt-1">
                          Үнийн санал илгээх болон дэнчин байршуулахын тулд эхлээд нэвтэрнэ үү
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {isLoggedIn && !hasUserPledged && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-800 text-sm font-bold">!</span>
                      </div>
                      <div>
                        <p className="text-blue-800 font-medium text-sm">
                          Дэнчин байршуулах шаардлагатай
                        </p>
                        <p className="text-blue-700 text-xs mt-1">
                          Үнийн санал илгээхийн тулд эхлээд дэнчин байршуулна уу.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {isLoggedIn && hasUserPledged && fromHistory && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-800 text-sm font-bold">✓</span>
                      </div>
                      <div>
                        <p className="text-green-800 font-medium text-sm">
                          Дэнчин байршуулсан байна
                        </p>
                        <p className="text-green-700 text-xs mt-1">
                          Та энэ дуудлага худалдаанд дэнчин байршуулсан тул шууд үнийн санал илгээх боломжтой
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {(() => {
                    const isEnded = auctionEnded
                      || auctionItem.status === 'expired'
                      || auctionItem.status === 'sold'
                      || auctionItem.status === 'completed'
                      || (auctionItem.endTime && new Date(auctionItem.endTime) < new Date())
                    return (
                  <Button
                    className={`py-3 xs-mobile:py-4 rounded-xl transition-all duration-200 font-tt-firs-neue-variable font-bold text-xs xs-mobile:text-sm leading-5 xs-mobile:leading-6 tracking-[2.4%] uppercase ${isEnded
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : isLoggedIn && hasUserPledged
                          ? 'bg-[#FF4405] hover:bg-[#E63D04] text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    disabled={isEnded || !isLoggedIn || !hasUserPledged}
                    onClick={() => !isEnded && setShowBidDialog(true)}
                  >
                    <Image src="/svg/bid.svg" alt="Bid" width={16} height={16} className="hidden xs-mobile:block w-4 h-4 xs-mobile:w-5 xs-mobile:h-5 mr-2 xs-mobile:mr-3" />
                    <span className="hidden xs-mobile:inline">ҮНИЙН САНАЛ ИЛГЭЭХ</span>
                    <span className="xs-mobile:hidden">ҮНИЙН САНАЛ</span>
                  </Button>
                    )
                  })()}

                  {(() => {
                    const isEnded = auctionEnded
                      || auctionItem.status === 'expired'
                      || auctionItem.status === 'sold'
                      || auctionItem.status === 'completed'
                      || (auctionItem.endTime && new Date(auctionItem.endTime) < new Date())
                    return (
                  <Button
                    variant="outline"
                    className={`py-3 xs-mobile:py-4 rounded-xl border-2 transition-all duration-200 font-tt-firs-neue-variable font-bold text-xs xs-mobile:text-sm leading-5 xs-mobile:leading-6 tracking-[2.4%] uppercase ${isEnded
                        ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-60'
                        : !isLoggedIn
                          ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-60'
                          : hasUserPledged
                            ? 'bg-green-100 text-green-700 border-green-300 cursor-not-allowed opacity-80'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                      }`}
                    disabled={isEnded || !isLoggedIn || hasUserPledged}
                    onClick={() => {
                      if (!isEnded && isLoggedIn && !hasUserPledged) {
                        setShowPledgeDialog(true);
                      } else {
                        setShowPledgeDialog(false);
                      }
                    }}
                  >
                    {isEnded
                      ? (
                        <>
                          <span className="hidden xs-mobile:inline">ДУУДЛАГА ДУУССАН</span>
                          <span className="xs-mobile:hidden">ДУУССАН</span>
                        </>
                      )
                      : !isLoggedIn
                        ? (
                          <>
                            <span className="hidden xs-mobile:inline">НЭВТРЭХ ШААРДЛАГАТАЙ</span>
                            <span className="xs-mobile:hidden">НЭВТРЭХ</span>
                          </>
                        )
                        : hasUserPledged
                          ? (
                            <>
                              <span className="hidden xs-mobile:inline">ДЭНЧИН БАЙРШУУЛСАН</span>
                              <span className="xs-mobile:hidden">БАЙРШУУЛСАН</span>
                            </>
                          )
                          : (
                            <>
                              <span className="hidden xs-mobile:inline">ДЭНЧИН БАЙРШУУЛАХ</span>
                              <span className="xs-mobile:hidden">БАЙРШУУЛАХ</span>
                            </>
                          )
                    }
                  </Button>
                    )
                  })()}

                  <PledgeDialog
                    isOpen={showPledgeDialog && isLoggedIn}
                    onOpenChange={setShowPledgeDialog}
                    auctionItem={auctionItem}
                    lotId={auctionItem.id}
                    isLoggedIn={isLoggedIn}
                    onPledgeConfirm={handlePledgeConfirm}
                  />

                  <BidDialog
                    isOpen={showBidDialog}
                    onOpenChange={setShowBidDialog}
                    auctionItem={auctionItem}
                    lotId={auctionItem.id}
                    isLoggedIn={isLoggedIn}
                    onBidConfirm={handleBidConfirm}
                  />
                </div>

                {!isLoggedIn && (
                  <div className="text-center">
                    <Link href={`/auth/login?redirect=${encodeURIComponent(`/auction/${unwrappedParams.id}`)}`} className="text-[#FF4405] hover:text-[#E63D04] font-medium text-sm underline">
                      Нэвтрэх эсвэл бүртгүүлэх
                    </Link>
                  </div>
                )}

                {isLoggedIn && !hasUserPledged && (
                  <div className="text-center">
                    <p className="text-gray-600 text-sm mb-2">
                      Дэнчин: {auctionItem.startingPrice} × 10% = {(parseInt(auctionItem.startingPrice.replace(/[^\d]/g, '')) * 0.1).toLocaleString() + '₮'}
                    </p>
                    <p className="text-blue-600 text-xs">
                      Дэнчин байршуулсны дараа үнийн санал илгээх боломжтой болно
                    </p>
                  </div>
                )}
              </div>

              {/* Warning Text */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Image src="/svg/warning.svg" alt="Warning" width={20} height={20} className="w-5 h-5 text-red-500" />
                  <span className="text-red-500 text-sm font-medium">
                    Ялагч болсон тохиолдолд таны аккаунт хаяг руу мэдэгдэл илгээх болно.
                  </span>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Specifications and Bids */}
      <div className="py-8 xs-mobile:py-10 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs-mobile:gap-8">

            {/* Specifications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-tt-firs-neue-variable tracking-[2.4%]">
                Техникийн үзүүлэлтүүд
              </h3>
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {auctionItem.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-600 font-medium">{spec.label}</span>
                        <span className="font-bold text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bids */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 font-tt-firs-neue-variable tracking-[2.4%]">
                  Оролцогчдын үнийн саналууд
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#FF4405] rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500 font-medium">
                    {bidderCount > 0 ? `${bidderCount} онлайн` : 'Идэвхтэй'}
                  </span>
                </div>
              </div>
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-[#FF4405] to-[#E63D04] px-6 py-4">
                    <div className="flex items-center justify-between text-white">
                      <h4 className="font-bold text-lg font-tt-firs-neue-variable">Нийт {auctionItem.bidCount} оролцогч</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">
                          {bidderCount > 0 ? `${bidderCount} хэрэглэгч онлайн` : 'Шинэчлэгдэж байна'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {auctionItem.bids.map((bid, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:shadow-md ${index === 0
                              ? 'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200'
                              : 'bg-white border border-gray-100 hover:border-gray-200'
                            }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${index === 0
                              ? 'bg-gradient-to-r from-[#FF4405] to-[#E63D04] shadow-lg'
                              : 'bg-gray-100'
                            }`}>
                            <span className={`text-sm font-bold ${index === 0 ? 'text-white' : 'text-gray-600'
                              }`}>
                              {bid.id}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium truncate ${index === 0 ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                              {bid.email}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center space-x-2">
                              <span>{bid.date}</span>
                              {index === 0 && (
                                <>
                                  <span className="w-1 h-1 bg-[#FF4405] rounded-full"></span>
                                  <span className="text-[#FF4405] font-medium text-xs">Хамгийн өндөр үнэ</span>
                                </>
                              )}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className={`font-bold text-lg ${index === 0 ? 'text-[#FF4405]' : 'text-gray-700'
                              }`}>
                              {bid.amount}
                            </span>
                            {index === 0 && (
                              <div className="mt-1">
                                <span className="text-xs text-[#FF4405] font-medium bg-orange-100 px-2 py-1 rounded-full flex items-center gap-1">
                                  <FaAward className="inline" /> Тэргүүлэгч
                                </span>
                              </div>
                            )}
                            {index > 0 && bid.status && (
                              <div className="mt-1">
                                <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded-full">
                                  {bid.status}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {showImageZoom && (
        <ImageZoom
          images={auctionItem.images}
          currentImage={auctionItem.images[selectedImage]}
          onClose={() => setShowImageZoom(false)}
        />
      )}
    </div>
  );
}
