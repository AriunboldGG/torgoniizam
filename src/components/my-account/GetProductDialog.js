"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FaAward } from "react-icons/fa"
import { MdAccessTime } from "react-icons/md"
import { getAssetUrl } from "@/lib/utils"

const Row = ({ label, value }) =>
  value ? (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-xs font-semibold text-gray-800 text-right">{value}</span>
    </div>
  ) : null

function useCountdown(deadline) {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    if (!deadline) return
    const target = new Date(deadline).getTime()

    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) {
        setTimeLeft({ expired: true })
        return
      }
      setTimeLeft({
        expired: false,
        days:    Math.floor(diff / 86_400_000),
        hours:   Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000)  / 60_000),
        seconds: Math.floor((diff % 60_000)      / 1_000),
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [deadline])

  return timeLeft
}

export default function GetProductDialog({ isOpen, onOpenChange, lotId }) {
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

  const inner = data?.data ?? data
  const lot = inner?.lot ?? inner
  const seller = inner?.seller ?? lot?.seller
  const secretValue = inner?.secret_value ?? inner?.secret_code
  const pickupDeadline = inner?.pickup_deadline

  const timeLeft = useCountdown(pickupDeadline)

  const pad = (n) => String(n).padStart(2, "0")
  const countdownText = timeLeft
    ? timeLeft.expired
      ? "Хугацаа дууссан"
      : timeLeft.days > 0
        ? `${timeLeft.days}өд ${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`
        : `${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`
    : "..."

  const isExpired = timeLeft?.expired
  const deadlineColor = isExpired
    ? { bg: "bg-red-50", border: "border-red-200", label: "text-red-500", value: "text-red-700" }
    : { bg: "bg-orange-50", border: "border-orange-200", label: "text-orange-500", value: "text-orange-700" }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full sm:max-w-md p-0 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="p-4 sm:p-5 pb-3 flex-shrink-0 border-b border-gray-100">
          <DialogTitle className="flex items-center gap-2 text-base font-bold text-gray-900">
            <FaAward className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            Бараа авах мэдээлэл
          </DialogTitle>
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
            <>
              {/* Lot image */}
              {Array.isArray(lot?.images) && lot.images.length > 0 && (
                <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                  <Image
                    src={getAssetUrl(
                      typeof lot.images[0] === "string"
                        ? lot.images[0]
                        : lot.images[0]?.url ?? ""
                    )}
                    alt={lot?.name ?? ""}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-4 sm:p-5 space-y-4">
                {/* Winner banner */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
                  <FaAward className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-yellow-800">Таньд баяр хүргэе!</p>
                    {lot?.reference_no && (
                      <p className="text-xs text-yellow-700 mt-0.5">{lot.reference_no}</p>
                    )}
                  </div>
                </div>

                {/* Secret code + Pickup deadline in one row */}
                {(secretValue || pickupDeadline) && (
                  <div className="flex gap-3">
                    {secretValue && (
                      <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-4">
                        <p className="text-xs text-green-600 mb-1 font-medium">Бараа авах код</p>
                        <p className="text-lg font-bold text-green-800 tracking-widest">{secretValue}</p>
                      </div>
                    )}
                    {pickupDeadline && (
                      <div className={`flex-1 ${deadlineColor.bg} border ${deadlineColor.border} rounded-xl p-4`}>
                        <p className={`text-xs ${deadlineColor.label} mb-1 font-medium flex items-center gap-1`}>
                          <MdAccessTime className="w-3.5 h-3.5" />
                          Авах хугацаа
                        </p>
                        <p className={`text-lg font-bold ${deadlineColor.value} tabular-nums`}>
                          {countdownText}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Seller info */}
                {seller && (
                  <div className="space-y-1">
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

                {/* Lot info */}
                {lot && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Барааны мэдээлэл</p>
                    <div className="bg-gray-50 rounded-xl divide-y divide-gray-100">
                      <Row label="Нэр"              value={lot.name} />
                      <Row label="Ангилал"          value={lot.category?.value} />
                      <Row label="Тайлбар"          value={lot.description} />
                      <Row label="Эхлэх үнэ"        value={lot.starting_price != null ? `${Number(lot.starting_price).toLocaleString()}₮` : null} />
                      <Row label="Сүүлийн үнэ"      value={lot.current_bid    != null ? `${Number(lot.current_bid).toLocaleString()}₮`    : null} />
                      <Row label="Эхлэх огноо"      value={lot.start_date ? new Date(lot.start_date).toLocaleDateString("mn-MN") : null} />
                      <Row label="Дуусах огноо"     value={lot.end_date   ? new Date(lot.end_date).toLocaleDateString("mn-MN")   : null} />
                      <Row label="Нийт оролцогч"    value={lot.participant_count != null ? String(lot.participant_count) : null} />
                      <Row label="Нийт үнийн санал" value={lot.bid_count         != null ? String(lot.bid_count)         : null} />
                      <Row label="Хот"              value={lot.city?.value} />
                      <Row label="Дүүрэг"           value={lot.district?.value} />
                      <Row label="Хороо"            value={lot.quarter?.value} />
                      <Row label="Хаяг"             value={lot.address} />
                    </div>
                  </div>
                )}

                {/* Attributes */}
                {lot?.attributes &&
                  typeof lot.attributes === "object" &&
                  Object.keys(lot.attributes).length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Техникийн үзүүлэлт</p>
                      <div className="bg-gray-50 rounded-xl divide-y divide-gray-100">
                        {Object.entries(lot.attributes).map(([label, value]) => (
                          <Row key={label} label={label} value={String(value)} />
                        ))}
                      </div>
                    </div>
                  )}

                {/* Reminder */}
                <div className="bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-200">
                  <p className="text-xs text-blue-800">
                    <strong>Санамж:</strong> Бараагаа авахдаа дээрх нууц кодыг заавал үзүүлнэ үү.
                    Энэ код нь таны барааг авах эрхийг баталгаажуулна.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 pt-3 flex-shrink-0 border-t border-gray-100">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
            ХААХ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
