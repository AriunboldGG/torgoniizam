import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function DELETE(request) {
  try {
    const authHeader = request.headers.get("authorization")
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ detail: "Дансны ID шаардлагатай." }, { status: 400 })
    }

    const response = await fetch(`${API_URL}/api/v1/account/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    })

    if (response.status === 204) {
      return NextResponse.json({ message: "Данс амжилттай устгагдлаа." }, { status: 200 })
    }

    let data = {}
    const text = await response.text()
    if (text) {
      try { data = JSON.parse(text) } catch { /* empty body */ }
    }

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Account delete proxy error:", error)
    return NextResponse.json(
      { detail: "Данс устгахад алдаа гарлаа." },
      { status: 500 }
    )
  }
}
