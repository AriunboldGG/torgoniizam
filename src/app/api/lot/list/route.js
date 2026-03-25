import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") ?? ""
    const offset = searchParams.get("offset") ?? "0"

    const url = `${API_URL}/api/v1/lot/list?offset=${offset}${status ? `&status=${status}` : ""}`

    const response = await fetch(url, { redirect: "follow" })
    const text = await response.text()

    let data
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json({ detail: "Invalid JSON from backend" }, { status: 502 })
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[lot/list] Proxy error:", error.message)
    return NextResponse.json(
      { detail: "Дуудлага худалдааны жагсаалт авахад алдаа гарлаа.", error: error.message },
      { status: 500 }
    )
  }
}
