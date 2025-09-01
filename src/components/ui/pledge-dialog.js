"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Helper function to calculate pledge amount (10% of auction price)
const calculatePledgeAmount = (priceString) => {
  // Remove currency symbol and commas, then convert to number
  const price = parseInt(priceString.replace(/[^\d]/g, ''));
  const pledgeAmount = Math.round(price * 0.1);
  // Format back to currency string
  return pledgeAmount.toLocaleString() + '₮';
};

export default function PledgeDialog({ 
  isOpen, 
  onOpenChange, 
  auctionItem, 
  isUserLoggedIn, 
  onPledgeConfirm 
}) {
  const handlePledgeConfirm = () => {
    // Here you would implement the actual pledge logic
    console.log('Pledge amount:', calculatePledgeAmount(auctionItem.startingPrice));
    onOpenChange(false);
    // Call the parent's onPledgeConfirm function
    if (onPledgeConfirm) {
      onPledgeConfirm(calculatePledgeAmount(auctionItem.startingPrice));
    }
    // TODO: Call API to process pledge from wallet
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-tt-firs-neue-variable font-bold text-lg">
            Дэнчин байршуулах
          </DialogTitle>
          <div className="text-gray-600 space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="font-medium text-blue-800 mb-2">Дэнчин дэлгэрэнгүй:</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Эхлэх үнэ:</span>
                  <span className="font-bold">{auctionItem.startingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Дэнчин (10%):</span>
                  <span className="font-bold text-blue-600">{calculatePledgeAmount(auctionItem.startingPrice)}</span>
                </div>
              </div>
            </div>
            <div className="text-sm">
              Таны хэтэвчнээс дэнчингийн хэмжээгээр мөнгө хасч, дуудлага худалдаанд оролцох эрх олгоно.
            </div>
            <div className="text-sm font-medium text-orange-600">
              ⚠️ Дэнчин байршуулсны дараа, дуудлага худалдаанд хожоогүй тохиолдоно системийн шимтшэл 1% хасагдаж буцаагдахыг анхаарна уу.
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="font-tt-firs-neue-variable font-medium"
          >
            Цуцлах
          </Button>
          <Button 
            className="bg-[#FF4405] hover:bg-[#E63D04] text-white font-tt-firs-neue-variable font-bold"
            onClick={handlePledgeConfirm}
          >
            Дэнчин байршуулах
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
