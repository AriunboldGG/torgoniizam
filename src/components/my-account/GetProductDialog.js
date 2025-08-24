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
      <DialogContent className="sm:max-w-2xl p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900">БАРАА АВАХ</DialogTitle>
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
            
            {/* Right Section - Pawnshop Information */}
            <div className="space-y-4">
              {selectedAuction.pawnshopInfo ? (
                <>
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
                </>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    Борлуулагчийн мэдээлэл байхгүй байна.
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
