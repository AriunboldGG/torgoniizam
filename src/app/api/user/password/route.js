import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.torgoniizam.mn"

export async function PATCH(request) {
  try {
    const authHeader = request.headers.get("authorization")
    const body = await request.json()

    const response = await fetch(`${API_URL}/api/v1/user/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
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
    console.error("Update password proxy error:", error)
    return NextResponse.json(
      { detail: "Нууц үг шинэчлэхэд алдаа гарлаа." },
      { status: 500 }
    )
  }
}
