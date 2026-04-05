import { NextResponse } from "next/server"

export const dynamic = "force-dynamic" // never cache — pledge status must always be fresh

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const authHeader = request.headers.get("Authorization")

    if (!authHeader) {
      return NextResponse.json(
        { detail: "Нэвтэрсэн хэрэглэгчийн дэнчинг шалгах боломжтой." },
        { status: 401 }
      )
    }

    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": authHeader,
    }

    const url = `${API_URL}/api/v1/lots/pledged/${id}`

    let response = await fetch(url, { headers, redirect: "manual", cache: "no-store" })

    // Follow up to 3 redirects manually so Authorization header is preserved
    let redirectCount = 0
    while (response.status >= 300 && response.status < 400 && redirectCount < 3) {
      const location = response.headers.get("location")
      if (!location) break
      const redirectUrl = location.startsWith("http") ? location : `${API_URL}${location}`
      response = await fetch(redirectUrl, { headers, redirect: "manual", cache: "no-store" })
      redirectCount++
    }

    const text = await response.text()

    if (!text || !text.trim()) {
      return NextResponse.json({ status_code: "not_found" }, { status: response.status })
    }

    let data
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json({ status_code: "not_found" }, { status: 200 })
    }

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json(
      { detail: "Дэнчин шалгахад алдаа гарлаа.", error: error.message },
      { status: 500 }
    )
  }
}
