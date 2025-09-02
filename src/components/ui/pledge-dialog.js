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
import { useWallet } from "@/contexts/WalletContext";

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
  onPledgeConfirm 
}) {
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { walletBalance, deductAmount } = useWallet(); // Get dynamic wallet balance

  const handlePledgeConfirm = async () => {
    setError("");
    setIsProcessing(true);

    try {
      const pledgeAmount = parseInt(calculatePledgeAmount(auctionItem.startingPrice).replace(/[^\d]/g, ''));
      
      // Check if user has sufficient balance
      if (walletBalance < pledgeAmount) {
        setError(`Хэтэвчний үлдэгдэл хүрэлцэхгүй байна. Таны үлдэгдэл: ${walletBalance.toLocaleString()}₮, Шаардагдах дэнчин: ${pledgeAmount.toLocaleString()}₮`);
        setIsProcessing(false);
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Deduct pledge amount from wallet
      const result = deductAmount(pledgeAmount);
      if (!result.success) {
        setError("Дэнчин байршуулахад алдаа гарлаа. Дахин оролдоно уу.");
        setIsProcessing(false);
        return;
      }

      console.log('Pledge amount:', calculatePledgeAmount(auctionItem.startingPrice));
      console.log('New wallet balance:', result.newBalance);
      
      onOpenChange(false);
      // Call the parent's onPledgeConfirm function
      if (onPledgeConfirm) {
        onPledgeConfirm(calculatePledgeAmount(auctionItem.startingPrice));
      }
    } catch (err) {
      setError("Дэнчин байршуулахад алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-tt-firs-neue-variable font-bold text-lg">
            Дэнчин байршуулах
          </DialogTitle>
          <div className="text-gray-600 space-y-3">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
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
                <div className="flex justify-between">
                  <span>Таны үлдэгдэл:</span>
                  <span className={`font-bold ${walletBalance >= parseInt(calculatePledgeAmount(auctionItem.startingPrice).replace(/[^\d]/g, '')) ? 'text-green-600' : 'text-red-600'}`}>
                    {walletBalance.toLocaleString()}₮
                  </span>
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
            disabled={isProcessing}
          >
            Цуцлах
          </Button>
          <Button 
            className="bg-[#FF4405] hover:bg-[#E63D04] text-white font-tt-firs-neue-variable font-bold"
            onClick={handlePledgeConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? "Байршуулж байна..." : "Дэнчин байршуулах"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
