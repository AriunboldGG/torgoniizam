import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ReceivedProductDialog({ 
  isOpen, 
  onOpenChange, 
  selectedAuction 
}) {
  if (!selectedAuction) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900">БАРААГ АВСАН</DialogTitle>
        </DialogHeader>
        
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
            
            {/* Right Section - Auction Information */}
            <div className="space-y-4">
              {selectedAuction.auctionInfo ? (
                <>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-3">Дуудлага худалдааны мэдээлэл</h4>
                    
                    <div className="space-y-3">
                      {/* Auction Dates */}
                      <div>
                        <p className="text-sm text-green-700">Эхлэх огноо:</p>
                        <p className="font-medium text-green-900">{selectedAuction.auctionInfo.startDate}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-green-700">Дууссан огноо:</p>
                        <p className="font-medium text-green-900">{selectedAuction.auctionInfo.endDate}</p>
                      </div>
                      
                      {/* Bidding Information */}
                      <div>
                        <p className="text-sm text-green-700">Нийт оролцогч:</p>
                        <p className="font-medium text-green-900">{selectedAuction.auctionInfo.totalBidders} хүн</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-green-700">Эхлэх үнэ:</p>
                        <p className="font-medium text-green-900">{selectedAuction.auctionInfo.startingPrice}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-green-700">Эцсийн үнэ:</p>
                        <p className="font-bold text-lg text-green-600 bg-green-100 px-3 py-2 rounded border border-green-300">
                          {selectedAuction.auctionInfo.finalBid}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3">Хүргэлтийн мэдээлэл</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-blue-700">Авах огноо:</p>
                        <p className="font-medium text-blue-900">{selectedAuction.auctionInfo.pickupDate}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-blue-700">Авах газар:</p>
                        <p className="font-medium text-blue-900">{selectedAuction.auctionInfo.pickupLocation}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700">
                      <strong>Тэмдэглэл:</strong> Бараа олгогдсон. 
                      
                    </p>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    Дуудлага худалдааны мэдээлэл байхгүй байна.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex justify-end mt-6">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="px-6 py-2"
            >
              ХААХ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
