import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function GetProductDialog({ 
  isOpen, 
  onOpenChange, 
  selectedAuction 
}) {
  if (!selectedAuction) return null

  return (
         <Dialog open={isOpen} onOpenChange={onOpenChange}>
       <DialogContent className="max-w-full sm:max-w-2xl p-0 max-h-[85vh] overflow-hidden flex flex-col">
         <DialogHeader className="p-3 xs-mobile:p-4 sm:p-6 pb-2 xs-mobile:pb-3 sm:pb-4 flex-shrink-0">
           <DialogTitle className="text-lg xs-mobile:text-xl font-bold text-gray-900">БАРАА АВАХ</DialogTitle>
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
            
                         {/* Right Section - Pawnshop Information */}
             <div className="space-y-2 xs-mobile:space-y-3 sm:space-y-4">
               {selectedAuction.pawnshopInfo ? (
                 <>
                   <div className="bg-gray-50 p-2 xs-mobile:p-3 sm:p-4 rounded-lg">
                     <h4 className="font-semibold text-gray-900 mb-1 xs-mobile:mb-2 sm:mb-3 text-xs xs-mobile:text-sm sm:text-base">Борлуулагчийн мэдээлэл</h4>
                     
                     <div className="space-y-1 xs-mobile:space-y-2 sm:space-y-3">
                       {/* Pawnshop Name */}
                       <div>
                         <p className="text-xs text-gray-600">Борлуулагчийн нэр:</p>
                         <p className="font-medium text-gray-900 text-xs xs-mobile:text-sm sm:text-base">{selectedAuction.pawnshopInfo.name}</p>
                       </div>
                       
                       {/* Address */}
                       <div>
                         <p className="text-xs text-gray-600">Хаяг:</p>
                         <p className="font-medium text-gray-900 text-xs xs-mobile:text-sm sm:text-base">{selectedAuction.pawnshopInfo.address}</p>
                       </div>
                       
                       {/* Phone */}
                       <div>
                         <p className="text-xs text-gray-600">Утасны дугаар:</p>
                         <p className="font-medium text-gray-900 text-xs xs-mobile:text-sm sm:text-base">{selectedAuction.pawnshopInfo.phone}</p>
                       </div>
                       
                       {/* Secret ID */}
                       <div>
                         <p className="text-xs text-gray-600">Нууц ID:</p>
                         <p className="font-bold text-sm xs-mobile:text-base sm:text-lg text-orange-600 bg-orange-50 px-2 xs-mobile:px-3 py-1 xs-mobile:py-2 rounded border border-orange-200">
                           {selectedAuction.pawnshopInfo.secretId}
                         </p>
                       </div>
                     </div>
                   </div>
                   
                   <div className="bg-blue-50 p-2 xs-mobile:p-3 sm:p-4 rounded-lg border border-blue-200">
                     <p className="text-xs text-blue-800">
                       <strong>Санамж:</strong> Бараагаа авахдаа дээрх нууц ID-г заавал үзүүлнэ үү. 
                       Энэ ID нь таны барааг авах эрхийг баталгаажуулна.
                     </p>
                   </div>
                 </>
               ) : (
                 <div className="bg-gray-50 p-2 xs-mobile:p-3 sm:p-4 rounded-lg">
                   <p className="text-xs text-gray-600 text-center">
                     Борлуулагчийн мэдээлэл байхгүй байна.
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
