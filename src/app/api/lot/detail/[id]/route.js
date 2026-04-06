import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.torgoniizam.mn"

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const authHeader = request.headers.get("Authorization")

    const headers = { "Content-Type": "application/json" }
    if (authHeader) headers["Authorization"] = authHeader

    const url = `${API_URL}/api/v1/lot/detail/${id}`

    const response = await fetch(url, { headers, redirect: "follow" })
    const text = await response.text()

    let data
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json({ detail: "Invalid JSON from backend" }, { status: 502 })
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[lot/detail] Proxy error:", error.message)
    return NextResponse.json(
      { detail: "Дуудлага худалдааны дэлгэрэнгүй авахад алдаа гарлаа.", error: error.message },
      { status: 500 }
    )
  }
}
