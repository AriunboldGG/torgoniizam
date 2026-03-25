import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization")
    const body = await request.json()

    const response = await fetch(`${API_URL}/api/v1/wallet/withdraw/`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      redirect: "follow",
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Wallet withdraw proxy error:", error)
    return NextResponse.json(
      { detail: "Таталт хийхэд алдаа гарлаа." },
      { status: 500 }
    )
  }
}
