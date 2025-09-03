"use client"

import Image from "next/image"
import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import GetProductDialog from "@/components/my-account/GetProductDialog"
import ReceivedProductDialog from "@/components/my-account/ReceivedProductDialog"
import { useUser } from "@/contexts/UserContext"

// Countdown Timer Component for active auctions
function AuctionCountdownTimer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsEnded(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsEnded(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (isEnded) {
    return (
      <div className="text-red-600 text-sm font-medium">
        Дууссан
      </div>
    );
  }

  return (
    <div className="text-blue-600 text-sm font-medium">
      {timeLeft.days}д {timeLeft.hours}ц {timeLeft.minutes}м {timeLeft.seconds}с
    </div>
  );
}

export default function AuctionsPage() {
  const { user } = useUser()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isReceivedDialogOpen, setIsReceivedDialogOpen] = useState(false)
  const [selectedAuction, setSelectedAuction] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all') // 'all', 'won', 'lost', 'active'

  // Dynamic participated auctions based on user's bidding history
  const participatedAuctions = useMemo(() => {
    const now = new Date().getTime()
    
    // Simulate user's bidding history with different auction types
    return [
      {
        id: 1,
        image: "/images/live1.png",
        category: "Үнэт эдлэл",
        description: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН ТОНОГТОЙ ЭМЭЭЛ",
        startingPrice: "53,400,000₮",
        finalBid: "58,200,000₮",
        userBid: "58,200,000₮",
        status: "won",
        statusText: "Ялсан",
        actionButton: "БАРАА АВАХ",
        actionButtonColor: "bg-orange-500 hover:bg-orange-600",
        endTime: now - (2 * 24 * 60 * 60 * 1000), // Ended 2 days ago
        bidCount: 15,
        pawnshopInfo: {
          name: "Алтан Шармал Дэлгүүр",
          address: "Сүхбаатар дүүрэг, 1-р хороо, Баянзүрх 2, 1-р хороолол",
          phone: "+976 9900-1234",
          secretId: "AS-2024-789"
        }
      },
      {
        id: 2,
        image: "/images/live2.png",
        category: "Цахилгаан бараа",
        description: "САМСУНГ ГАЛАКСИ S24 - ХАМГИЙН ШИНЭ МОДЕЛЬ",
        startingPrice: "480,000₮",
        finalBid: "520,000₮",
        userBid: "510,000₮",
        status: "lost",
        statusText: "Ялаагүй",
        actionButton: null,
        actionButtonColor: null,
        endTime: now - (1 * 24 * 60 * 60 * 1000), // Ended 1 day ago
        bidCount: 8
      },
      {
        id: 3,
        image: "/images/live3.png",
        category: "Компьютер",
        description: "ЭППЛ МАКБУК ПРО M3 - ХҮЧИРХЭГ ПРОЦЕССОРТОЙ",
        startingPrice: "1,280,000₮",
        finalBid: "1,450,000₮",
        userBid: "1,450,000₮",
        status: "received",
        statusText: "Ялсан",
        actionButton: "БАРААГ АВСАН",
        actionButtonColor: "bg-gray-500 hover:bg-gray-600",
        endTime: now - (5 * 24 * 60 * 60 * 1000), // Ended 5 days ago
        bidCount: 12,
        auctionInfo: {
          startDate: "2024-01-15",
          endDate: "2024-01-20",
          totalBidders: 12,
          finalBid: "1,450,000₮",
          startingPrice: "1,280,000₮",
          pickupDate: "2024-01-22",
          pickupLocation: "Алтан Шармал Дэлгүүр"
        }
      },
      {
        id: 4,
        image: "/images/live4.png",
        category: "Автомашин",
        description: "ТОЙОТА ЛЭНД КРУЗЕР - Борлуулагчийн ХАМГИЙН САЙН СОНГОЛТ",
        startingPrice: "45,800,000₮",
        finalBid: "48,500,000₮",
        userBid: "47,200,000₮",
        status: "lost",
        statusText: "Ялаагүй",
        actionButton: null,
        actionButtonColor: null,
        endTime: now - (3 * 24 * 60 * 60 * 1000), // Ended 3 days ago
        bidCount: 22
      },
      {
        id: 5,
        image: "/images/pending1.png",
        category: "Үнэт эдлэл",
        description: "ДАМАСКУС ГАН - ХУУЧИН АРТИЗАНЫ ГАРТ ХИЙСЭН",
        startingPrice: "820,000₮",
        currentBid: "920,000₮",
        userBid: "920,000₮",
        status: "bidding",
        statusText: "Одоо явагдаж буй",
        actionButton: "ҮРГЭЛЖЛҮҮЛЭХ",
        actionButtonColor: "bg-blue-500 hover:bg-blue-600",
        endTime: now + (2 * 60 * 60 * 1000), // Ends in 2 hours
        bidCount: 6
      },
      {
        id: 6,
        image: "/images/pending2.png",
        category: "Цахилгаан бараа",
        description: "СОНИ ПЛЕЙСТЕЙШН 5 - ГЭМТЭЛГҮЙ БАЙГУУЛЛАГА",
        startingPrice: "1,750,000₮",
        currentBid: "1,850,000₮",
        userBid: "1,800,000₮",
        status: "outbid",
        statusText: "Ялагдаж байна",
        actionButton: "ДАХИН САНАЛ ӨГӨХ",
        actionButtonColor: "bg-red-500 hover:bg-red-600",
        endTime: now + (4 * 60 * 60 * 1000), // Ends in 4 hours
        bidCount: 9
      }
    ]
  }, [])

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "won":
        return "bg-green-500"
      case "lost":
        return "bg-red-500"
      case "received":
        return "bg-green-500"
      case "bidding":
        return "bg-blue-500"
      case "outbid":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleGetProduct = (auction) => {
    setSelectedAuction(auction)
    setIsDialogOpen(true)
  }

  const handleReceivedProduct = (auction) => {
    setSelectedAuction(auction)
    setIsReceivedDialogOpen(true)
  }

  // Calculate auction statistics
  const auctionStats = useMemo(() => {
    const total = participatedAuctions.length
    const won = participatedAuctions.filter(a => a.status === 'won' || a.status === 'received').length
    const lost = participatedAuctions.filter(a => a.status === 'lost').length
    const active = participatedAuctions.filter(a => a.status === 'bidding' || a.status === 'outbid').length
    
    return { total, won, lost, active }
  }, [participatedAuctions])

  // Filter auctions based on active filter
  const filteredAuctions = useMemo(() => {
    if (activeFilter === 'all') {
      return participatedAuctions
    } else if (activeFilter === 'won') {
      return participatedAuctions.filter(a => a.status === 'won' || a.status === 'received')
    } else if (activeFilter === 'lost') {
      return participatedAuctions.filter(a => a.status === 'lost')
    } else if (activeFilter === 'active') {
      return participatedAuctions.filter(a => a.status === 'bidding' || a.status === 'outbid')
    }
    return participatedAuctions
  }, [participatedAuctions, activeFilter])

  // Handle filter click
  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header with User Info */}
        <div className="text-center mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            ТАНЫ ОРОЛЦСОН ДУУДЛАГА ХУДАЛДАА
          </h1>
          {user && (
            <p className="text-gray-600">
              Сайн байна уу, {user.fullName}!
            </p>
          )}
        </div>

        {/* Auction Statistics - Clickable Filters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
          <button 
            onClick={() => handleFilterClick('all')}
            className={`bg-white rounded-lg shadow-sm border p-4 text-center transition-all duration-200 hover:shadow-md ${
              activeFilter === 'all' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl font-bold text-blue-600">{auctionStats.total}</div>
            <div className="text-sm text-gray-600">Нийт</div>
          </button>
          <button 
            onClick={() => handleFilterClick('won')}
            className={`bg-white rounded-lg shadow-sm border p-4 text-center transition-all duration-200 hover:shadow-md ${
              activeFilter === 'won' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl font-bold text-green-600">{auctionStats.won}</div>
            <div className="text-sm text-gray-600">Ялсан</div>
          </button>
          <button 
            onClick={() => handleFilterClick('lost')}
            className={`bg-white rounded-lg shadow-sm border p-4 text-center transition-all duration-200 hover:shadow-md ${
              activeFilter === 'lost' ? 'ring-2 ring-red-500 bg-red-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl font-bold text-red-600">{auctionStats.lost}</div>
            <div className="text-sm text-gray-600">Ялаагүй</div>
          </button>
          <button 
            onClick={() => handleFilterClick('active')}
            className={`bg-white rounded-lg shadow-sm border p-4 text-center transition-all duration-200 hover:shadow-md ${
              activeFilter === 'active' ? 'ring-2 ring-orange-500 bg-orange-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl font-bold text-orange-600">{auctionStats.active}</div>
            <div className="text-sm text-gray-600">Идэвхтэй</div>
          </button>
        </div>
        
        {/* Participated Auctions List */}
        <div className="space-y-4 lg:space-y-6">
          {filteredAuctions.map((auction) => (
            <div key={auction.id} className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                {/* Auction Image */}
                <div className="flex-shrink-0 flex justify-center sm:justify-start">
                  <Image 
                    src={auction.image} 
                    alt={auction.description} 
                    width={120} 
                    height={120}
                    className="w-24 h-24 lg:w-30 lg:h-30 rounded-lg object-cover"
                  />
                </div>
                
                {/* Auction Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Category */}
                      <p className="text-xs lg:text-sm text-gray-600 mb-2">{auction.category}</p>
                      
                      {/* Description */}
                      <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-2 lg:mb-3 line-clamp-2">
                        {auction.description}
                      </h3>
                      
                      {/* Price */}
                      <div className="mb-3 lg:mb-4">
                        <p className="text-xl lg:text-2xl font-bold text-orange-500">
                          {auction.status === 'bidding' || auction.status === 'outbid' 
                            ? auction.currentBid 
                            : auction.finalBid || auction.userBid}
                        </p>
                        {auction.status === 'bidding' || auction.status === 'outbid' ? (
                          <p className="text-sm text-gray-600 mt-1">
                            Таны санал: {auction.userBid}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-600 mt-1">
                            Эхлэх үнэ: {auction.startingPrice}
                          </p>
                        )}
                      </div>
                      
                      {/* Status Badge and Timer */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <div className={`inline-flex items-center gap-2 px-2 lg:px-3 py-1 rounded-full ${getStatusBadgeColor(auction.status)} text-white text-xs lg:text-sm font-medium`}>
                          <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full"></div>
                          {auction.statusText}
                        </div>
                        
                        {/* Countdown Timer for Active Auctions */}
                        {(auction.status === 'bidding' || auction.status === 'outbid') && (
                          <AuctionCountdownTimer endTime={auction.endTime} />
                        )}
                      </div>
                      
                      {/* Additional Info */}
                      <div className="mt-2 text-xs text-gray-500">
                        {auction.status === 'bidding' || auction.status === 'outbid' ? (
                          <span>Санал өгсөн тоо: {auction.bidCount}</span>
                        ) : (
                          <span>Нийт санал: {auction.bidCount}</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    {auction.actionButton && (
                      <div className="flex-shrink-0 flex justify-center lg:justify-end">
                        {auction.actionButton === "БАРАА АВАХ" ? (
                          <Button 
                            onClick={() => handleGetProduct(auction)}
                            className={`${auction.actionButtonColor} text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-colors text-sm lg:text-base w-full sm:w-auto`}
                          >
                            {auction.actionButton}
                          </Button>
                        ) : auction.actionButton === "БАРААГ АВСАН" ? (
                          <Button 
                            onClick={() => handleReceivedProduct(auction)}
                            className={`${auction.actionButtonColor} text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-colors text-sm lg:text-base w-full sm:w-auto`}
                          >
                            {auction.actionButton}
                          </Button>
                        ) : auction.actionButton === "ҮРГЭЛЖЛҮҮЛЭХ" ? (
                          <Button 
                            onClick={() => window.location.href = `/auction/${auction.id}?hasPledge=true&from=history`}
                            className={`${auction.actionButtonColor} text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-colors text-sm lg:text-base w-full sm:w-auto`}
                          >
                            {auction.actionButton}
                          </Button>
                        ) : auction.actionButton === "ДАХИН САНАЛ ӨГӨХ" ? (
                          <Button 
                            onClick={() => window.location.href = `/auction/${auction.id}?hasPledge=true&from=history`}
                            className={`${auction.actionButtonColor} text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-colors text-sm lg:text-base w-full sm:w-auto`}
                          >
                            {auction.actionButton}
                          </Button>
                        ) : (
                          <button className={`${auction.actionButtonColor} text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-colors text-sm lg:text-base w-full sm:w-auto`}>
                            {auction.actionButton}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog Components */}
      <GetProductDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedAuction={selectedAuction}
      />
      
      <ReceivedProductDialog 
        isOpen={isReceivedDialogOpen}
        onOpenChange={setIsReceivedDialogOpen}
        selectedAuction={selectedAuction}
      />
    </div>
  )
}
