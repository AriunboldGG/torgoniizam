"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@/contexts/UserContext"

const STATUS_LABEL = {
  active: { text: 'ИДЭВХТЭЙ', color: 'bg-green-500' },
  pending: { text: 'ХҮЛЭЭГДЭЖ БУЙ', color: 'bg-blue-500' },
  expired: { text: 'ДУУССАН', color: 'bg-gray-500' },
  sold: { text: 'ЗАРАГДСАН', color: 'bg-orange-500' },
}

function getDetailHref(lot) {
  if (lot.status === 'active') return `/auction/${lot.id}`
  if (lot.status === 'pending') return `/auction/pending/${lot.id}`
  return `/auction/completed/${lot.id}`
}

function mapBidHistory(entry) {
  console.log('bid history entry =>', entry)

  // API may return the lot directly at entry.lot, or the entry itself may be the lot
  const lot = entry.lot ?? entry
  const rawImages = Array.isArray(lot.images) ? lot.images : []
  const image =
    rawImages.length > 0
      ? typeof rawImages[0] === 'string'
        ? rawImages[0]
        : rawImages[0]?.url ?? rawImages[0]?.image ?? '/images/live1.png'
      : lot.thumbnail ?? '/images/live1.png'

  const startingPrice = lot.starting_price != null ? Number(lot.starting_price) : 0
  const currentBid = lot.current_bid != null ? Number(lot.current_bid) : startingPrice
  const bidAmount = entry.amount != null ? Number(entry.amount) : null

  const lotStatus = typeof lot.status === 'string' ? lot.status : (lot.status?.key ?? 'pending')
  const bidStatus = typeof entry.status === 'string' ? entry.status : (entry.status?.key ?? '')

  return {
    id: lot.id ?? entry.id,
    bidId: entry.id,
    image,
    status: lotStatus,
    bidStatus,
    category: lot.category?.value ?? lot.category?.name ?? '',
    title: lot.name ?? '',
    startingPrice: `${startingPrice.toLocaleString('mn-MN')}₮`,
    currentBid: `${currentBid.toLocaleString('mn-MN')}₮`,
    myBidAmount: bidAmount != null ? `${bidAmount.toLocaleString('mn-MN')}₮` : null,
    startDate: lot.start_date ?? null,
    endDate: lot.end_date ?? null,
    wonAmount: entry.winning_amount != null ? Number(entry.winning_amount) : null,
    createdAt: entry.created_at ?? null,
  }
}

export default function MyAuctionsPage() {
  const { isLoggedIn, isLoading } = useUser()
  const [lots, setLots] = useState([])
  const [wonLotIds, setWonLotIds] = useState(new Set())
  const [wonLotData, setWonLotData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isLoading) return
    if (!isLoggedIn) {
      setLoading(false)
      return
    }

    const fetchMyLots = async () => {
      try {
        const token = localStorage.getItem('access_token')
        const res = await fetch('/api/bid/history', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        const json = await res.json()

        if (!res.ok) {
          setError(json?.detail ?? json?.message ?? 'Дуудлагын жагсаалт авахад алдаа гарлаа.')
          return
        }

        const list = json?.results ?? json?.data ?? (Array.isArray(json) ? json : [])
        const mapped = list.map(mapBidHistory)

        // Deduplicate by lot id — keep the entry with the highest bid amount per lot
        const lotMap = new Map()
        mapped.forEach((entry) => {
          const existing = lotMap.get(entry.id)
          if (!existing) {
            lotMap.set(entry.id, entry)
          } else {
            const newAmt = entry.myBidAmount ? parseFloat(entry.myBidAmount.replace(/[^\d.]/g, '')) : 0
            const exAmt = existing.myBidAmount ? parseFloat(existing.myBidAmount.replace(/[^\d.]/g, '')) : 0
            if (newAmt > exAmt) lotMap.set(entry.id, entry)
          }
        })
        const deduped = Array.from(lotMap.values())
        setLots(deduped)

        // Extract won lots directly from bid status
        const wonIds = new Set()
        const wonData = {}
        mapped.forEach((entry) => {
          if (entry.bidStatus === 'won' || entry.bidStatus === 'active') {
            const isCompleted = entry.status === 'expired' || entry.status === 'sold'
            if (isCompleted) {
              wonIds.add(entry.id)
              if (!wonData[entry.id] || entry.wonAmount != null) {
                wonData[entry.id] = {
                  amount: entry.wonAmount ?? (entry.myBidAmount ? parseFloat(entry.myBidAmount.replace(/[^\d.]/g, '')) : null),
                  created_at: entry.createdAt,
                }
              }
            }
          }
        })
        setWonLotIds(wonIds)
        setWonLotData(wonData)
      } catch (err) {
        console.error('Failed to fetch bid history:', err)
        setError(err?.messag)
      } finally {
        setLoading(false)
      }
    }

    fetchMyLots()
  }, [isLoggedIn, isLoading])

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4405] mx-auto mb-4"></div>
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
          <Link
            href="/auth/login?redirect=/auctions/my-auctions"
            className="bg-[#FF4405] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#E63D04] transition-colors"
          >
            Нэвтрэх
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-tt-firs-neue-variable">
              Таны оролцсон дуудлага худалдаанууд
            </h1>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Empty state */}
          {!error && lots.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg font-medium">Оролцсон дуудлага байхгүй байна</p>
              <p className="text-gray-400 text-sm mt-1 mb-6">Та одоогоор ямар нэг дуудлага худалдаанд оролцоогүй байна.</p>
              <Link
                href="/auctions/live-auctions"
                className="bg-[#FF4405] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#E63D04] transition-colors"
              >
                Дуудлага үзэх
              </Link>
            </div>
          )}

          {/* Grid */}
          {lots.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {lots.map((lot) => {
                const statusInfo = STATUS_LABEL[lot.status] ?? { text: lot.status, color: 'bg-gray-400' }
                const isCompleted = lot.status === 'expired' || lot.status === 'sold'
                const userWon = isCompleted && wonLotIds.has(lot.id)
                const wonInfo = wonLotData[lot.id]
                return (
                  <Link key={lot.id} href={getDetailHref(lot)} className="block">
                    <Card className="overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white border border-gray-200 cursor-pointer group">
                      <div className="relative aspect-square bg-white overflow-hidden">
                        <Image
                          src={lot.image}
                          alt={lot.title}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className={`absolute top-2 right-2 ${userWon ? 'bg-yellow-500' : statusInfo.color} text-white px-3 py-1 rounded-lg text-xs font-bold`}>
                          {userWon ? '🏆 ЯЛАГЧ' : statusInfo.text}
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="mb-2">
                          <span className="text-sm text-gray-500 font-medium">{lot.category}</span>
                        </div>
                        <CardTitle className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-[#FF4405] transition-colors duration-200">
                          {lot.title}
                        </CardTitle>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Эхлэх үнэ</span>
                            <span className="text-sm font-medium text-gray-700">{lot.startingPrice}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Одоогийн үнэ</span>
                            <span className="text-sm font-bold text-[#FF4405]">{lot.currentBid}</span>
                          </div>
                          {lot.myBidAmount && (
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">Миний санал</span>
                              <span className="text-sm font-bold text-blue-600">{lot.myBidAmount}</span>
                            </div>
                          )}
                          {userWon && wonInfo && (
                            <div className="mt-2 pt-2 border-t border-yellow-200 bg-yellow-50 rounded-lg px-2 py-1 space-y-1">
                              {wonInfo.amount != null && (
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-yellow-700 font-medium">Ялсан үнэ</span>
                                  <span className="text-xs font-bold text-yellow-800">{Number(wonInfo.amount).toLocaleString('mn-MN')}₮</span>
                                </div>
                              )}
                              {wonInfo.created_at && (
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-yellow-700">Огноо</span>
                                  <span className="text-xs text-yellow-800">{new Date(wonInfo.created_at).toLocaleDateString('mn-MN')}</span>
                                </div>
                              )}
                            </div>
                          )}
                          {userWon && !wonInfo && (
                            <div className="mt-2 pt-2 border-t border-yellow-200 bg-yellow-50 rounded-lg px-2 py-1 text-center">
                              <span className="text-xs text-yellow-700 font-medium">Та энэ дуудлага худалдаанд ялсан байна-*=-!</span>
                            </div>
                          )}
                        </div>
                        {lot.endDate && (
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(lot.endDate).toLocaleDateString('mn-MN')}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
