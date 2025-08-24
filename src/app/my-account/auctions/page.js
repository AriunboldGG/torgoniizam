"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AuctionsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAuction, setSelectedAuction] = useState(null)

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
      actionButtonColor: "bg-orange-500 hover:bg-orange-600",
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

  const handleGetProduct = (auction) => {
    setSelectedAuction(auction)
    setIsDialogOpen(true)
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
                        {auction.actionButton === "БАРАА АВАХ" ? (
                          <Button 
                            onClick={() => handleGetProduct(auction)}
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

      {/* Get Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-xl font-bold text-gray-900">БАРАА АВАХ</DialogTitle>
          </DialogHeader>
          
          {selectedAuction && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Section - Product Information */}
                <div className="space-y-4">
                  {/* Product Image */}
                  <div className="flex justify-center lg:justify-start">
                    <Image 
                      src={selectedAuction.image} 
                      alt={selectedAuction.description} 
                      width={200} 
                      height={200}
                      className="w-48 h-48 rounded-lg object-cover"
                    />
                  </div>
                  
                  {/* Category */}
                  <p className="text-sm text-gray-600 text-center lg:text-left">{selectedAuction.category}</p>
                  
                  {/* Description */}
                  <h3 className="text-lg font-bold text-gray-900 text-center lg:text-left leading-tight">
                    {selectedAuction.description}
                  </h3>
                  
                  {/* Price */}
                  <p className="text-2xl font-bold text-orange-500 text-center lg:text-left">
                    {selectedAuction.price}
                  </p>
                </div>
                
                {/* Right Section - Pawnshop Information */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Борлуулагчийн мэдээлэл</h4>
                    
                    <div className="space-y-3">
                      {/* Pawnshop Name */}
                      <div>
                        <p className="text-sm text-gray-600">Борлуулагчийн нэр:</p>
                        <p className="font-medium text-gray-900">{selectedAuction.pawnshopInfo.name}</p>
                      </div>
                      
                      {/* Address */}
                      <div>
                        <p className="text-sm text-gray-600">Хаяг:</p>
                        <p className="font-medium text-gray-900">{selectedAuction.pawnshopInfo.address}</p>
                      </div>
                      
                      {/* Phone */}
                      <div>
                        <p className="text-sm text-gray-600">Утасны дугаар:</p>
                        <p className="font-medium text-gray-900">{selectedAuction.pawnshopInfo.phone}</p>
                      </div>
                      
                      {/* Secret ID */}
                      <div>
                        <p className="text-sm text-gray-600">Нууц ID:</p>
                        <p className="font-bold text-lg text-orange-600 bg-orange-50 px-3 py-2 rounded border border-orange-200">
                          {selectedAuction.pawnshopInfo.secretId}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Санамж:</strong> Бараагаа авахдаа дээрх нууц ID-г заавал үзүүлнэ үү. 
                      Энэ ID нь таны барааг авах эрхийг баталгаажуулна.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="flex justify-end mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="px-6 py-2"
                >
                  ХААХ
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
