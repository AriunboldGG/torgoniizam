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
  lotId,
  onBidConfirm 
}) {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const increments = auctionItem?.bidIncrements ?? [];

  const handleBidConfirm = async () => {
    if (!selectedAmount) {
      setError('Үнийн санал сонгоно уу');
      return;
    }

    const bidValue = parseInt(selectedAmount);

    setError('');
    setIsSubmitting(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!token) {
        setError('Нэвтэрч орно уу.');
        setIsSubmitting(false);
        return;
      }

      // Hardcoded fallback in case env var is not inlined at build time
      // Trim trailing slash to avoid double-slash in path
      const wsBase = (process.env.NEXT_PUBLIC_WS_URL || 'wss://ws.torgoniizam.mn').replace(/\/$/, '');
      const wsUrl = `${wsBase}/ws/${lotId}`;
      console.log('[BidDialog] Connecting to WS:', wsUrl);

      await new Promise((resolve, reject) => {
        const ws = new WebSocket(wsUrl);
        let settled = false;

        const settle = (fn, val) => {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          fn(val);
        };

        const timeout = setTimeout(() => {
          ws.close();
          settle(reject, new Error('timeout'));
        }, 10000);

        ws.onopen = () => {
            ws.send(JSON.stringify({
            type: 'bid',
            amount: String(bidValue),
            token,
          }));
        };

        ws.onmessage = (event) => {
          try {
            const msg = JSON.parse(event.data);
            if (msg?.error || msg?.type === 'error') {
              settle(reject, new Error(msg.error ?? msg.message ?? 'Алдаа гарлаа.'));
            } else {
              settle(resolve, msg);
            }
          } catch {
            settle(resolve, {});
          }
          ws.close();
        };

        ws.onerror = (ev) => {
          console.error('[BidDialog] ws.onerror', ev);
          settle(reject, new Error('ws_error'));
        };

        ws.onclose = (e) => {
          if (!settled) {
            if (e.code === 1000 || e.code === 1001) {
              settle(resolve, {});
            } else if (e.code === 1006) {
              // 1006 = abnormal closure — server never completed the handshake
              settle(reject, new Error('ws_unreachable'));
            } else {
              settle(reject, new Error(`ws_closed_${e.code}`));
            }
          }
        };
      });

      setSuccessMessage(`Таны үнийн санал ${Number(selectedAmount).toLocaleString()}₮ системд бүртгэгдлээ.`);
      setShowSuccess(true);

      if (onBidConfirm) {
        onBidConfirm(selectedAmount);
      }

      setTimeout(() => {
        setSelectedAmount('');
        setShowSuccess(false);
        setSuccessMessage('');
        onOpenChange(false);
      }, 2000);
    } catch (err) {
      console.log('ws eror', err);
      
      const msg = err?.message ?? '';
      console.error('[BidDialog] catch error:', msg);
      if (msg === 'timeout') {
        setError('Серверт холбогдох хугацаа дууссан. Дахин оролдоно уу.');
      } else if (msg.startsWith('ws_closed_')) {
        const code = msg.replace('ws_closed_', '');
        setError(`WebSocket холболт амжилтгүй боллоо (код: ${code}). Серверийн тохиргоог шалгана уу.`);
      } else if (msg === 'ws_unreachable' || msg === 'ws_error') {
        setError('Дуусгавар болсон серверт холбогдох боломжгүй байна. Backend WebSocket тохиргоог шалгана уу.');
      } else {
        setError(msg || 'Үнийн санал илгээхэд алдаа гарлаа. Дахин оролдоно уу.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedAmount('');
    setError('');
    setShowSuccess(false);
    setSuccessMessage('');
    setIsSubmitting(false);
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
                 {successMessage}
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

               {/* Bid Amount Dropdown */}
               <div className="space-y-2">
                 <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700">
                   Үнийн санал нэмэх дүнгээс сонголтоо хийж ахиулж илгээнэ үү:
                 </label>
                 {increments.length > 0 ? (
                   <select
                     id="bidAmount"
                     value={selectedAmount}
                     onChange={(e) => { setSelectedAmount(e.target.value); setError(''); }}
                     className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4405] focus:border-transparent bg-white ${
                       error ? 'border-red-300' : 'border-gray-300'
                     }`}
                   >
                     <option value="">-- Сонгоно уу --</option>
                     {increments.map((amt, i) => (
                       <option key={i} value={String(amt)}>
                         {Number(amt).toLocaleString()}₮
                       </option>
                     ))}
                   </select>
                 ) : (
                   <p className="text-sm text-gray-500">Үнийн санал ачааллаж байна...</p>
                 )}
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
                 disabled={!selectedAmount.trim() || !!error || isSubmitting}
               >
                 {isSubmitting ? 'Илгээж байна...' : 'Үнийн санал илгээх'}
               </Button>
             </>
           )}
         </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
