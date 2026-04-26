"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useUser } from "@/contexts/UserContext"
import { FaAward } from "react-icons/fa"
import GetProductDialog from "@/components/my-account/GetProductDialog"

const STATUS_LABEL = {
  active:   { text: "ИДЭВХТЭЙ", color: "bg-green-500"  },
  won:      { text: "ЯЛСАН",    color: "bg-yellow-500" },
  released: { text: "ЯЛААГҮЙ", color: "bg-gray-500"   },
}

// Parse the bid/history entry into a simpler shape
function mapEntry(entry) {
  const lotId    = entry.lot?.key   ?? null
  const lotValue = entry.lot?.value ?? ""
  // value format: "LOT-XXXXX - Title"
  const dashIdx  = lotValue.indexOf(" - ")
  const title    = dashIdx !== -1 ? lotValue.slice(dashIdx + 3) : lotValue
  const lotCode  = dashIdx !== -1 ? lotValue.slice(0, dashIdx) : ""

  const bidStatus = typeof entry.status === "object" ? (entry.status?.key ?? "") : (entry.status ?? "")

  return {
    bidId:         entry.id,
    lotId,
    title,
    lotCode,
    bidStatus,
    bidStatusLabel: typeof entry.status === "object" ? (entry.status?.value ?? bidStatus) : bidStatus,
    depositAmount: entry.deposit_amount ?? null,
    createdAt:     entry.created_at ?? null,
    updatedAt:     entry.updated_at ?? null,
  }
}

export default function MyAuctionsPage() {
  const { isLoggedIn, isLoading } = useUser()
  const [entries, setEntries]         = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState("")
  const [getProductEntry, setGetProductEntry] = useState(null)
  const [statusFilter, setStatusFilter] = useState("all")

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

        if (!res.ok) {
          setError(json?.detail ?? json?.message ?? "Алдаа гарлаа.")
          return
        }

        const list    = json?.results ?? json?.data ?? (Array.isArray(json) ? json : [])
        const mapped  = list.map(mapEntry)
        setEntries(mapped)
      } catch (err) {
        setError(err?.message ?? "Алдаа гарлаа.")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isLoggedIn, isLoading])

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4405] mx-auto mb-4" />
          <p className="text-gray-600">Уншиж байна...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 xs-mobile:p-4 lg:p-6">
      <GetProductDialog
        isOpen={!!getProductEntry}
        onOpenChange={(open) => { if (!open) setGetProductEntry(null) }}
        lotId={getProductEntry?.lotId}
      />

      <section className="py-4 lg:py-6">
        <div className="max-w-full">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-tt-firs-neue-variable mb-5">
              Таны оролцсон дуудлага худалдаанууд
            </h1>
            {/* Status filter tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all",      label: "Бүгд" },
                { key: "active",   label: "Идэвхтэй" },
                { key: "won",      label: "Ялсан" },
                { key: "released", label: "Ялаагүй" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setStatusFilter(key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                    statusFilter === key
                      ? "bg-[#FF4405] text-white border-[#FF4405]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#FF4405] hover:text-[#FF4405]"
                  }`}
                >
                  {label}
                  {key !== "all" && (
                    <span className="ml-1.5 text-xs opacity-70">
                      ({entries.filter(e => (key === "won" ? e.bidStatus === "won" : e.bidStatus === key)).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
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
                Дуудлага худалдаа үзэх
              </Link>
            </div>
          )}

          {entries.length > 0 && (() => {
            const filtered = statusFilter === "all"
              ? entries
              : statusFilter === "won"
              ? entries.filter(e => e.bidStatus === "won")
              : entries.filter(e => e.bidStatus === statusFilter)
            return filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg font-medium">Хоосон байна</p>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((entry) => {
                const isWon      = entry.bidStatus === "won"
                const statusInfo = STATUS_LABEL[isWon ? "won" : entry.bidStatus] ?? { text: entry.bidStatus, color: "bg-gray-400" }
                return (
                  <div
                    key={entry.bidId}
                  >
                    <Card className="overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white border border-gray-200 group h-full flex flex-col">
                      <CardContent className="p-4 flex flex-col flex-1">
                        <div className="flex justify-end mb-2">
                          <div className={`${statusInfo.color} text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1`}>
                            {isWon ? <><FaAward className="w-3.5 h-3.5" /> ЯЛСАН</> : statusInfo.text}
                          </div>
                        </div>
                        {entry.lotCode && (
                          <p className="text-xs text-gray-400 mb-1 truncate">{entry.lotCode}</p>
                        )}
                        <CardTitle className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-[#FF4405] transition-colors duration-200">
                          {entry.title}
                        </CardTitle>
                        <div className="space-y-1 flex-1">
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
                          {entry.depositAmount && (
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">Дэнчин</span>
                              <span className="text-xs font-semibold text-gray-700">{Number(entry.depositAmount).toLocaleString()}₮</span>
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        {isWon ? (
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={(e) => { e.stopPropagation(); setGetProductEntry(entry) }}
                              className="flex-1 flex items-center justify-center gap-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
                            >
                              <FaAward className="w-3 h-3" />
                              Бараа авах
                            </button>
                            <Link
                              href={`/auction/${entry.lotId}`}
                              className="flex-1 flex items-center justify-center gap-1 bg-[#FF4405] hover:bg-[#E63D04] text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
                            >
                              Дэлгэрэнгүй үзэх
                            </Link>
                          </div>
                        ) : entry.bidStatus === "active" ? (
                          <Link
                            href={`/auction/${entry.lotId}`}
                            className="flex items-center justify-center w-full mt-4 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
                          >
                            Дэлгэрэнгүй үзэх
                          </Link>
                        ) : (
                          <Link
                            href={`/auction/${entry.lotId}`}
                            className="flex items-center justify-center w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
                          >
                            Дэлгэрэнгүй үзэх
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
            )
          })()}
        </div>
      </section>
    </div>
  )
}
