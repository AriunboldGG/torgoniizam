"use client"

import { useState, useEffect } from "react"
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
  lotId,
}) {
  const [data, setData] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [fetchErr, setFetchErr] = useState(null)

  useEffect(() => {
    if (!isOpen || !lotId) return
    setData(null)
    setFetchErr(null)
    setFetching(true)

    const token = localStorage.getItem("access_token")
    fetch(`/api/bid/won/${lotId}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then(async (r) => {
        const raw = await r.json()
        if (!r.ok) throw new Error(raw?.detail ?? raw?.message ?? `Алдаа: ${r.status}`)
        return raw
      })
      .then((d) => setData(d))
      .catch((e) => setFetchErr(e?.message ?? "Алдаа гарлаа."))
      .finally(() => setFetching(false))
  }, [isOpen, lotId])

  const seller = data?.seller
  const secretValue = data?.secret_value ?? data?.secret_code

  const Row = ({ label, value }) =>
    value ? (
      <div className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 last:border-0">
        <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
        <span className="text-xs font-semibold text-gray-800 text-right">{value}</span>
      </div>
    ) : null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full sm:max-w-md p-0 max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 flex-shrink-0 border-b border-gray-100">
          <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900">БАРАА АВАХ</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {/* Loading */}
          {fetching && (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500" />
            </div>
          )}

          {/* Error */}
          {!fetching && fetchErr && (
            <div className="p-5 text-sm text-red-600 bg-red-50 m-4 rounded-xl">{fetchErr}</div>
          )}

          {/* Content */}
          {!fetching && !fetchErr && data && (
            <div className="p-4 sm:p-6 space-y-4">
              {/* Secret code */}
              {secretValue && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-xs text-green-600 mb-1 font-medium">Бараа авах код</p>
                  <p className="text-xl font-bold text-green-800 tracking-widest">{secretValue}</p>
                </div>
              )}

              {/* Seller info */}
              {seller && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Борлуулагчийн мэдээлэл</p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="pb-3 mb-2 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-800">
                        {[seller.first_name, seller.last_name].filter(Boolean).join(" ") ||
                          seller.informal ||
                          seller.username}
                      </p>
                      {seller.informal && (
                        <p className="text-xs text-gray-400">@{seller.informal}</p>
                      )}
                    </div>
                    <Row label="Имэйл"  value={seller.email} />
                    <Row label="Утас"   value={seller.phone} />
                    <Row label="Хот"    value={seller.city} />
                    <Row label="Дүүрэг" value={seller.district} />
                    <Row label="Хороо"  value={seller.quarter} />
                    <Row label="Хаяг"   value={seller.address} />
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-800">
                  <strong>Санамж:</strong> Бараагаа авахдаа дээрх нууц кодыг заавал үзүүлнэ үү.
                  Энэ код нь таны барааг авах эрхийг баталгаажуулна.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 pt-3 flex-shrink-0 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            ХААХ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
