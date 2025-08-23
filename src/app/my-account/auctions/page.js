"use client"

import { useUser } from "@/contexts/UserContext"
import Image from "next/image"

export default function AuctionsPage() {
  const { user } = useUser()

  const participatedAuctions = [
    {
      id: 1,
      image: "/images/live1.png",
      category: "Автомашин",
      description: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН тоногтой эмээл",
      price: "480,000₮",
      status: "won",
      statusText: "Ялсан",
      actionButton: "БАРАА АВАХ",
      actionButtonColor: "bg-orange-500 hover:bg-orange-600"
    },
    {
      id: 2,
      image: "/images/live2.png",
      category: "Цахилгаан бараа",
      description: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН тоногтой эмээл",
      price: "480,000₮",
      status: "lost",
      statusText: "Ялаагүй",
      actionButton: null,
      actionButtonColor: null
    },
    {
      id: 3,
      image: "/images/live3.png",
      category: "Гар утас, таблет",
      description: "ЛУУТ АЛТАН ШАРМАЛ - ИХ ГАРЫН МӨНГӨН тоногтой эмээл",
      price: "480,000₮",
      status: "received",
      statusText: "Ялсан",
      actionButton: "БАРААГ АВСАН",
      actionButtonColor: "bg-gray-500 hover:bg-gray-600"
    }
  ]

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "won":
        return "bg-green-500"
      case "lost":
        return "bg-red-500"
      case "received":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8 text-center">ТАНЫ ОРОЛЦСОН ДУУДЛАГА ХУДАЛДАА</h1>
        
        {/* Participated Auctions List */}
        <div className="space-y-4 lg:space-y-6">
          {participatedAuctions.map((auction) => (
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
                      <p className="text-xl lg:text-2xl font-bold text-orange-500 mb-3 lg:mb-4">
                        {auction.price}
                      </p>
                      
                      {/* Status Badge */}
                      <div className={`inline-flex items-center gap-2 px-2 lg:px-3 py-1 rounded-full ${getStatusBadgeColor(auction.status)} text-white text-xs lg:text-sm font-medium`}>
                        <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full"></div>
                        {auction.statusText}
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    {auction.actionButton && (
                      <div className="flex-shrink-0 flex justify-center lg:justify-end">
                        <button className={`${auction.actionButtonColor} text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-colors text-sm lg:text-base w-full sm:w-auto`}>
                          {auction.actionButton}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
