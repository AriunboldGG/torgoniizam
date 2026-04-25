"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import { publicFetcher } from "@/lib/fetcher"
import { getAssetUrl } from "@/lib/utils"

export default function RelatedProducts({ category, currentId }) {
  const scrollContainerRef = useRef(null)
  const autoPlayRef = useRef(null)
  const isHoveredRef = useRef(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const { data: rawData } = useSWR(
    "/api/lot/list?status=sold&limit=50&offset=0",
    publicFetcher,
    { dedupingInterval: 300_000, revalidateOnFocus: false }
  )

  const related = useMemo(() => {
    const list =
      rawData?.data?.results ??
      rawData?.results ??
      (Array.isArray(rawData?.data) ? rawData.data : null) ??
      []

    return list
      .filter((lot) => {
        const lotCategory = lot.category?.value ?? ""
        return (
          String(lot.id) !== String(currentId) &&
          lotCategory.toLowerCase() === (category ?? "").toLowerCase()
        )
      })
      .map((lot) => ({
        id: lot.id,
        title: lot.name ?? "",
        category: lot.category?.value ?? "",
        imageUrl: getAssetUrl(
          lot.thumbnail ?? (typeof lot.images?.[0] === "string" ? lot.images[0] : "")
        ),
        finalPrice:
          lot.final_price != null
            ? `${Number(lot.final_price).toLocaleString()}₮`
            : lot.current_bid != null
            ? `${Number(lot.current_bid).toLocaleString()}₮`
            : "",
      }))
  }, [rawData, category, currentId])

  // Scroll progress indicator
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const maxScroll = scrollWidth - clientWidth
      setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0)
    }
  }

  useEffect(() => {
    const el = scrollContainerRef.current
    if (el) {
      el.addEventListener("scroll", handleScroll)
      return () => el.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Autoplay when more than 4 cards
  useEffect(() => {
    if (related.length <= 4) return

    autoPlayRef.current = setInterval(() => {
      if (isHoveredRef.current) return
      const container = scrollContainerRef.current
      if (!container) return
      const { scrollLeft, scrollWidth, clientWidth } = container
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 16
      if (atEnd) {
        container.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        container.scrollBy({ left: 300, behavior: "smooth" })
      }
    }, 3000)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [related.length])

  if (!related.length) return null

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-1 h-8 bg-orange-500 rounded-full" />
          <h2 className="text-gray-900 font-bold uppercase font-tt-firs-neue-variable text-lg sm:text-xl">
            Ижил төстэй бараануудын дуудлага худалдаанд зарагдсан мэдээлэл
          </h2>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            onMouseEnter={() => { isHoveredRef.current = true }}
            onMouseLeave={() => { isHoveredRef.current = false }}
            onTouchStart={() => { isHoveredRef.current = true }}
            onTouchEnd={() => { isHoveredRef.current = false }}
          >
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/auction/completed/${item.id}`}
                className="min-w-[260px] max-w-[260px] flex-shrink-0 bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow border border-gray-100 group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.imageUrl || "/images/end1.png"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                    ДУУССАН
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-xs mb-1">{item.category}</p>
                  <h3 className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2 mb-3 font-tt-firs-neue-variable">
                    {item.title}
                  </h3>
                  {item.finalPrice && (
                    <p className="text-green-600 font-bold text-sm">Зарагдсан үнэ: {item.finalPrice}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Scroll progress */}
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
