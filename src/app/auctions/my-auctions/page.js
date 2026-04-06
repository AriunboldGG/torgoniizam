"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@/contexts/UserContext"

const STATUS_LABEL = {
  active:  { text: "ИДЭВХТЭЙ",      color: "bg-green-500"  },
  pending: { text: "ХҮЛЭЭГДЭЖ БУЙ", color: "bg-blue-500"   },
  expired: { text: "ДУУССАН",        color: "bg-gray-500"   },
  sold:    { text: "ЗАРАГДСАН",      color: "bg-orange-500" },
  won:     { text: "ЯЛСАН",          color: "bg-yellow-500" },
}

// Parse the bid/history entry into a simpler shape
function mapEntry(entry) {
  const lotId    = entry.lot?.key   ?? null
  const lotValue = entry.lot?.value ?? ""
  // value format: "LOT-XXXXX - Title"
  const dashIdx  = lotValue.indexOf(" - ")
  const title    = dashIdx !== -1 ? lotValue.slice(dashIdx + 3) : lotValue
  const lotCode  = dashIdx !== -1 ? lotValue.slice(0, dashIdx) : ""

  const deposit  = entry.deposit_amount != null ? Number(entry.deposit_amount) : 0
  const bidStatus = typeof entry.status === "object" ? (entry.status?.key ?? "") : (entry.status ?? "")

  return {
    bidId:         entry.id,
    lotId,
    title,
    lotCode,
    bidStatus,
    bidStatusLabel: typeof entry.status === "object" ? (entry.status?.value ?? bidStatus) : bidStatus,
    deposit:       `${deposit.toLocaleString("mn-MN")}₮`,
    createdAt:     entry.created_at ?? null,
    updatedAt:     entry.updated_at ?? null,
  }
}

function DetailModal({ entry, onClose }) {
  const [detail, setDetail]   = useState(null)
  const [fetching, setFetching] = useState(true)
  const [fetchErr, setFetchErr] = useState(null)

  useEffect(() => {
    if (!entry?.lotId) { setFetching(false); return }
    const token = localStorage.getItem("access_token")
    fetch(`/api/lot/detail/${entry.lotId}`, {
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    })
      .then(r => r.json())
      .then(d => {
        console.log("[lot/detail] response =>", d)
        setDetail(d)
      })
      .catch(e => setFetchErr(e.message))
      .finally(() => setFetching(false))
  }, [entry?.lotId])

  const isWon      = entry.bidStatus === "won"
  const lotStatus  = detail?.status?.key ?? detail?.status ?? ""
  const statusInfo = STATUS_LABEL[isWon ? "won" : lotStatus] ?? { text: lotStatus.toUpperCase(), color: "bg-gray-400" }

  const rawImages = Array.isArray(detail?.images) ? detail.images : []
  const image = rawImages.length > 0
    ? (typeof rawImages[0] === "string" ? rawImages[0] : rawImages[0]?.url ?? rawImages[0]?.image ?? "/images/live1.png")
    : (detail?.thumbnail ?? "/images/live1.png")

  const startingPrice = detail?.starting_price != null ? Number(detail.starting_price) : null
  const currentBid    = detail?.current_bid    != null ? Number(detail.current_bid)    : null
  const category      = detail?.category?.value ?? detail?.category?.name ?? ""

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{entry.title}</h2>
            {entry.lotCode && <p className="text-xs text-gray-400 mt-0.5">{entry.lotCode}</p>}
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 flex-shrink-0 ml-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Loading */}
        {fetching && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FF4405]" />
          </div>
        )}

        {/* Error */}
        {!fetching && fetchErr && (
          <div className="p-5 text-sm text-red-600 bg-red-50 m-4 rounded-xl">{fetchErr}</div>
        )}

        {/* Content */}
        {!fetching && !fetchErr && (
          <>
            {/* Image */}
            <div className="relative w-full aspect-video bg-gray-50 overflow-hidden">
              <Image src={image} alt={entry.title} fill className="object-contain" />
              <div className={`absolute top-3 right-3 ${statusInfo.color} text-white px-3 py-1 rounded-lg text-xs font-bold shadow`}>
                {isWon ? "🏆 ЯЛСАН" : statusInfo.text}
              </div>
            </div>

            <div className="p-5 space-y-4">
              {category && (
                <span className="inline-block text-xs font-semibold text-[#FF4405] bg-orange-50 px-3 py-1 rounded-full">{category}</span>
              )}

              <div className="grid grid-cols-2 gap-3">
                {startingPrice != null && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Эхлэх үнэ</p>
                    <p className="text-sm font-bold text-gray-800">{startingPrice.toLocaleString("mn-MN")}₮</p>
                  </div>
                )}
                {currentBid != null && (
                  <div className="bg-orange-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Одоогийн үнэ</p>
                    <p className="text-sm font-bold text-[#FF4405]">{currentBid.toLocaleString("mn-MN")}₮</p>
                  </div>
                )}
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Миний барьцаа</p>
                  <p className="text-sm font-bold text-blue-600">{entry.deposit}</p>
                </div>
                {detail?.start_date && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Эхлэх огноо</p>
                    <p className="text-sm font-semibold text-gray-700">{new Date(detail.start_date).toLocaleDateString("mn-MN")}</p>
                  </div>
                )}
                {detail?.end_date && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Дуусах огноо</p>
                    <p className="text-sm font-semibold text-gray-700">{new Date(detail.end_date).toLocaleDateString("mn-MN")}</p>
                  </div>
                )}
              </div>

              {isWon && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 space-y-1">
                  <p className="text-sm font-bold text-yellow-800">🏆 Та энэ дуудлага худалдаанд ялсан!</p>
                  <div className="flex justify-between">
                    <span className="text-xs text-yellow-700">Барьцаа</span>
                    <span className="text-sm font-bold text-yellow-900">{entry.deposit}</span>
                  </div>
                  {entry.updatedAt && (
                    <div className="flex justify-between">
                      <span className="text-xs text-yellow-700">Шинэчлэгдсэн</span>
                      <span className="text-xs text-yellow-800">{new Date(entry.updatedAt).toLocaleDateString("mn-MN")}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="text-xs text-gray-400 flex justify-between pt-1">
                <span>Оролцсон: {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString("mn-MN") : "-"}</span>
                <span className={`font-semibold ${isWon ? "text-yellow-600" : "text-gray-500"}`}>{entry.bidStatusLabel}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function MyAuctionsPage() {
  const { isLoggedIn, isLoading } = useUser()
  const [entries, setEntries]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState("")
  const [selected, setSelected]   = useState(null)

  useEffect(() => {
    if (isLoading) return
    if (!isLoggedIn) { setLoading(false); return }

    const load = async () => {
      try {
        const token = localStorage.getItem("access_token")
        const res   = await fetch("/api/bid/history", {
          headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        })
        const json  = await res.json()
        console.log("[bid/history] raw response =>", json)

        if (!res.ok) {
          setError(json?.detail ?? json?.message ?? "Дуудлагын жагсаалт авахад алдаа гарлаа.")
          return
        }

        const list    = json?.results ?? json?.data ?? (Array.isArray(json) ? json : [])
        const mapped  = list.map(mapEntry)
        console.log("[bid/history] mapped entries =>", mapped)
        setEntries(mapped)
      } catch (err) {
        console.error("[bid/history] fetch failed:", err)
        setError(err?.message ?? "Алдаа гарлаа.")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isLoggedIn, isLoading])

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4405] mx-auto mb-4" />
          <p className="text-gray-600">Уншиж байна...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 font-medium mb-4">Энэ хуудсыг үзэхийн тулд нэвтрэнэ үү.</p>
          <Link href="/auth/login?redirect=/auctions/my-auctions" className="bg-[#FF4405] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#E63D04] transition-colors">
            Нэвтрэх
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {selected && <DetailModal entry={selected} onClose={() => setSelected(null)} />}

      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-tt-firs-neue-variable">
              Таны оролцсон дуудлага худалдаанууд
            </h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>
          )}

          {!error && entries.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg font-medium">Оролцсон дуудлага байхгүй байна</p>
              <p className="text-gray-400 text-sm mt-1 mb-6">Та одоогоор ямар нэг дуудлага худалдаанд оролцоогүй байна.</p>
              <Link href="/auctions/live-auctions" className="bg-[#FF4405] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#E63D04] transition-colors">
                Дуудлага үзэх
              </Link>
            </div>
          )}

          {entries.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {entries.map((entry) => {
                const isWon      = entry.bidStatus === "won"
                const statusInfo = STATUS_LABEL[isWon ? "won" : entry.bidStatus] ?? { text: entry.bidStatus, color: "bg-gray-400" }
                return (
                  <div key={entry.bidId} className="cursor-pointer" onClick={() => setSelected(entry)}>
                    <Card className="overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white border border-gray-200 group h-full">
                      <div className="relative aspect-square bg-gray-100 overflow-hidden flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div className={`absolute top-2 right-2 ${statusInfo.color} text-white px-3 py-1 rounded-lg text-xs font-bold`}>
                          {isWon ? "🏆 ЯЛСАН" : statusInfo.text}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        {entry.lotCode && (
                          <p className="text-xs text-gray-400 mb-1 truncate">{entry.lotCode}</p>
                        )}
                        <CardTitle className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-[#FF4405] transition-colors duration-200">
                          {entry.title}
                        </CardTitle>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Барьцаа</span>
                            <span className="text-sm font-bold text-blue-600">{entry.deposit}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Төлөв</span>
                            <span className={`text-xs font-semibold ${isWon ? "text-yellow-600" : "text-gray-600"}`}>{entry.bidStatusLabel}</span>
                          </div>
                          {entry.createdAt && (
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">Огноо</span>
                              <span className="text-xs text-gray-500">{new Date(entry.createdAt).toLocaleDateString("mn-MN")}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-center text-gray-400 mt-3 group-hover:text-[#FF4405] transition-colors">
                          Дэлгэрэнгүй үзэх →
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
