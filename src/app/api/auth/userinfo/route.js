import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.torgoniizam.mn"

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization")

    const response = await fetch(`${API_URL}/api/v1/user/info`, {
      headers: { Authorization: authHeader },
      redirect: "follow",
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("User info proxy error:", error)
    return NextResponse.json(
      { detail: "Хэрэглэгчийн мэдээлэл авахад алдаа гарлаа." },
      { status: 500 }
    )
  }
}
