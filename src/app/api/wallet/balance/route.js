import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization")

    let response = await fetch(`${API_URL}/api/v1/wallet/balance`, { headers: { Authorization: authHeader }, redirect: "manual" })

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location")
      if (location) {
        const redirectUrl = location.startsWith("http") ? location : `${API_URL}${location}`
        response = await fetch(redirectUrl, { headers: { Authorization: authHeader }, redirect: "manual" })
      }
    }

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Wallet balance proxy error:", error)
    return NextResponse.json(
      { detail: "Хэтэвчний үлдэгдэл авахад алдаа гарлаа." },
      { status: 500 }
    )
  }
}
