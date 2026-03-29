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
  lotId,
  onPledgeConfirm 
}) {
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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

      // Call the join API
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      const joinRes = await fetch(`/api/lot/join/${lotId}`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const joinData = await joinRes.json().catch(() => ({}));
      

      if (!joinRes.ok) {
        const errMsg = joinData?.detail ?? joinData?.msg ?? '';
        // If API says already participating, treat as already pledged — close and enable bid
        const alreadyJoined = errMsg && (
          errMsg.toLowerCase().includes('аль хэдийн') ||
          errMsg.toLowerCase().includes('already') ||
          errMsg.toLowerCase().includes('orolcoj') ||
          errMsg.toLowerCase().includes('оролцож')
        );
        if (alreadyJoined) {
          if (onPledgeConfirm) onPledgeConfirm(calculatePledgeAmount(auctionItem.startingPrice));
          onOpenChange(false);
          setIsProcessing(false);
          return;
        }
        setError(errMsg || 'Дэнчин байршуулахад алдаа гарлаа. Дахин оролдоно уу.');
        setIsProcessing(false);
        return;
      }

      const successMsg = joinData?.msg ?? joinData?.detail ?? 'Дэнчин амжилттай байршуулагдлаа.';

      // Deduct pledge amount from local wallet state
      const result = deductAmount(pledgeAmount);
      if (!result.success) {
        setError('Дэнчин байршуулахад алдаа гарлаа. Дахин оролдоно уу.');
        setIsProcessing(false);
        return;
      }

      setSuccessMessage(successMsg);
      if (onPledgeConfirm) {
        onPledgeConfirm(calculatePledgeAmount(auctionItem.startingPrice));
      }
      setTimeout(() => {
        setSuccessMessage('');
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error("Pledge error:", error);
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
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md text-sm">
                {successMessage}
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
