"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BidDialog({ 
  isOpen, 
  onOpenChange, 
  auctionItem, 
  isUserLoggedIn, 
  onBidConfirm 
}) {
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Get current highest price (remove currency symbol and commas)
  const getCurrentHighestPrice = () => {
    return parseInt(auctionItem.lastPrice.replace(/[^\d]/g, ''));
  };

  const handleBidConfirm = () => {
    // Validate bid amount (remove commas for calculation)
    const bidValue = parseInt(bidAmount.replace(/,/g, ''));
    const currentHighest = getCurrentHighestPrice();

    if (!bidAmount || bidValue <= 0) {
      setError('Үнийн санал оруулна уу');
      return;
    }

    if (bidValue <= currentHighest) {
      setError(`Үнийн санал ${currentHighest.toLocaleString()}₮-с дээш байх ёстой`);
      return;
    }

    // Clear error and proceed
    setError('');
    console.log('Bid confirmed:', bidAmount);
    
    // Show success message
    setShowSuccess(true);
    
    // Call the parent's onBidConfirm function with formatted amount
    if (onBidConfirm) {
      onBidConfirm(bidAmount);
    }
    
    // Reset form and close dialog after 2 seconds
    setTimeout(() => {
      setBidAmount('');
      setShowSuccess(false);
      onOpenChange(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Remove all non-numeric characters except commas
    const cleanValue = value.replace(/[^\d,]/g, '');
    
    // Remove commas and get only numbers
    const numbersOnly = cleanValue.replace(/,/g, '');
    
    // Format with thousands separators
    const formattedValue = numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Update the input value with formatted number
    setBidAmount(formattedValue);
    
    // Clear error when user types
    setError('');
    
    // Check if bid is under current price
    if (numbersOnly) {
      const bidValue = parseInt(numbersOnly);
      const currentHighest = getCurrentHighestPrice();
      
      if (bidValue <= currentHighest) {
        setError(`Үнийн санал ${currentHighest.toLocaleString()}₮-с дээш байх ёстой`);
      }
    }
  };

  const handleClose = () => {
    setBidAmount('');
    setError('');
    setShowSuccess(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-tt-firs-neue-variable font-bold text-lg">
            Үнийн санал илгээх
          </DialogTitle>
        </DialogHeader>
        
                 <div className="space-y-4">
           {showSuccess ? (
             /* Success Message */
             <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
               </div>
               <h3 className="text-lg font-bold text-green-800 mb-2">
                 Үнийн санал амжилттай илгээгдлээ!
               </h3>
               <p className="text-green-700 text-sm">
                 Таны үнийн санал {bidAmount}₮ системд бүртгэгдлээ.
               </p>
             </div>
           ) : (
             <>
               {/* Current Price Info */}
               <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                 <div className="font-medium text-blue-800 mb-2">Одоогийн үнэ:</div>
                 <div className="text-2xl font-bold text-blue-600">{auctionItem.lastPrice}</div>
                 <div className="text-sm text-blue-700 mt-1">
                   Таны үнийн санал энэ үнээс дээш байх ёстой
                 </div>
               </div>

               {/* Bid Input */}
               <div className="space-y-2">
                 <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700">
                   Үнийн санал (₮)
                 </label>
                 <input
                   type="text"
                   id="bidAmount"
                   value={bidAmount}
                   onChange={handleInputChange}
                   placeholder={`${(getCurrentHighestPrice() + 10000).toLocaleString()}`}
                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4405] focus:border-transparent ${
                     error ? 'border-red-300' : 'border-gray-300'
                   }`}
                 />
                 {error && (
                   <p className="text-sm text-red-600">{error}</p>
                 )}
               </div>

               {/* Warning */}
               <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                 <div className="text-sm text-yellow-800">
                   ⚠️ Үнийн санал илгээсний дараа засварлах боломжгүй.
                 </div>
               </div>
             </>
           )}
         </div>

                 <DialogFooter>
           {!showSuccess && (
             <>
               <Button 
                 variant="outline" 
                 onClick={handleClose}
                 className="font-tt-firs-neue-variable font-medium"
               >
                 Цуцлах
               </Button>
               <Button 
                 className="bg-[#FF4405] hover:bg-[#E63D04] text-white font-tt-firs-neue-variable font-bold"
                 onClick={handleBidConfirm}
                 disabled={!bidAmount.trim() || error}
               >
                 Үнийн санал илгээх
               </Button>
             </>
           )}
         </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
