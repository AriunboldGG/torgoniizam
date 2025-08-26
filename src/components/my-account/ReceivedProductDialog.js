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
       <DialogContent className="max-w-full sm:max-w-2xl p-0 max-h-[85vh] overflow-hidden flex flex-col">
         <DialogHeader className="p-3 xs-mobile:p-4 sm:p-6 pb-2 xs-mobile:pb-3 sm:pb-4 flex-shrink-0">
           <DialogTitle className="text-lg xs-mobile:text-xl font-bold text-gray-900">БАРААГ АВСАН</DialogTitle>
         </DialogHeader>
         
         <div className="px-3 xs-mobile:px-4 sm:px-6 pb-3 xs-mobile:pb-4 sm:pb-6 flex-1 overflow-y-auto">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs-mobile:gap-4 sm:gap-6">
                         {/* Left Section - Product Information */}
             <div className="space-y-2 xs-mobile:space-y-3 sm:space-y-4">
               {/* Product Image */}
               <div className="flex justify-center lg:justify-start">
                 <Image 
                   src={selectedAuction.image} 
                   alt={selectedAuction.description} 
                   width={200} 
                   height={200}
                   className="w-32 h-32 xs-mobile:w-36 xs-mobile:h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg object-cover"
                 />
               </div>
               
               {/* Category */}
               <p className="text-xs xs-mobile:text-sm text-gray-600 text-center lg:text-left">{selectedAuction.category}</p>
               
               {/* Description */}
               <h3 className="text-sm xs-mobile:text-base sm:text-lg font-bold text-gray-900 text-center lg:text-left leading-tight">
                 {selectedAuction.description}
               </h3>
               
               {/* Price */}
               <p className="text-lg xs-mobile:text-xl sm:text-2xl font-bold text-orange-500 text-center lg:text-left">
                 {selectedAuction.price}
               </p>
             </div>
            
                         {/* Right Section - Auction Information */}
             <div className="space-y-2 xs-mobile:space-y-3 sm:space-y-4">
               {selectedAuction.auctionInfo ? (
                 <>
                   <div className="bg-green-50 p-2 xs-mobile:p-3 sm:p-4 rounded-lg border border-green-200">
                     <h4 className="font-semibold text-green-900 mb-1 xs-mobile:mb-2 sm:mb-3 text-xs xs-mobile:text-sm sm:text-base">Дуудлага худалдааны мэдээлэл</h4>
                     
                     <div className="space-y-1 xs-mobile:space-y-2 sm:space-y-3">
                       {/* Auction Dates */}
                       <div>
                         <p className="text-xs text-green-700">Эхлэх огноо:</p>
                         <p className="font-medium text-green-900 text-xs xs-mobile:text-sm sm:text-base">{selectedAuction.auctionInfo.startDate}</p>
                       </div>
                       
                       <div>
                         <p className="text-xs text-green-700">Дууссан огноо:</p>
                         <p className="font-medium text-green-900 text-xs xs-mobile:text-sm sm:text-base">{selectedAuction.auctionInfo.endDate}</p>
                       </div>
                       
                       {/* Bidding Information */}
                       <div>
                         <p className="text-xs text-green-700">Нийт оролцогч:</p>
                         <p className="font-medium text-green-900 text-xs xs-mobile:text-sm sm:text-base">{selectedAuction.auctionInfo.totalBidders} хүн</p>
                       </div>
                       
                       <div>
                         <p className="text-xs text-green-700">Эхлэх үнэ:</p>
                         <p className="font-medium text-green-900 text-xs xs-mobile:text-sm sm:text-base">{selectedAuction.auctionInfo.startingPrice}</p>
                       </div>
                       
                       <div>
                         <p className="text-xs text-green-700">Эцсийн үнэ:</p>
                         <p className="font-bold text-sm xs-mobile:text-base sm:text-lg text-green-600 bg-green-100 px-1 xs-mobile:px-2 sm:px-3 py-1 xs-mobile:py-2 rounded border border-green-300">
                           {selectedAuction.auctionInfo.finalBid}
                         </p>
                       </div>
                     </div>
                   </div>
                   
                   <div className="bg-blue-50 p-2 xs-mobile:p-3 sm:p-4 rounded-lg border border-blue-200">
                     <h4 className="font-semibold text-blue-900 mb-1 xs-mobile:mb-2 sm:mb-3 text-xs xs-mobile:text-sm sm:text-base">Хүргэлтийн мэдээлэл</h4>
                     
                     <div className="space-y-1 xs-mobile:space-y-2 sm:space-y-3">
                       <div>
                         <p className="text-xs text-blue-700">Авах огноо:</p>
                         <p className="font-medium text-blue-900 text-xs xs-mobile:text-sm sm:text-base">{selectedAuction.auctionInfo.pickupDate}</p>
                       </div>
                       
                       <div>
                         <p className="text-xs text-blue-700">Авах газар:</p>
                         <p className="font-medium text-blue-900 text-xs xs-mobile:text-sm sm:text-base">{selectedAuction.auctionInfo.pickupLocation}</p>
                       </div>
                     </div>
                   </div>
                   
                   <div className="bg-gray-50 p-2 xs-mobile:p-3 sm:p-4 rounded-lg border border-gray-200">
                     <p className="text-xs text-gray-700">
                       <strong>Тэмдэглэл:</strong> Бараа олгогдсон. 
                       
                     </p>
                   </div>
                 </>
               ) : (
                 <div className="bg-gray-50 p-2 xs-mobile:p-3 sm:p-4 rounded-lg">
                   <p className="text-xs text-gray-600 text-center">
                     Дуудлага худалдааны мэдээлэл байхгүй байна.
                   </p>
                 </div>
               )}
             </div>
          </div>
          
                     {/* Footer */}
           <div className="flex justify-end mt-3 xs-mobile:mt-4 sm:mt-6 flex-shrink-0">
             <Button 
               variant="outline" 
               onClick={() => onOpenChange(false)}
               className="px-3 xs-mobile:px-4 sm:px-6 py-1 xs-mobile:py-2 text-xs xs-mobile:text-sm sm:text-base"
             >
               ХААХ
             </Button>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
