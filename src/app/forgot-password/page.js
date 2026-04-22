"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(e) {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      const res = await fetch(`/api/user/password/reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.status_code === "ng") {
        throw new Error(data?.msg || data?.email?.[0] || "Алдаа гарлаа")
      }
      setSubmitted(true)
    } catch (err) {
      setError(err.message || "Системийн алдаа гарлаа. Дахин оролдоно уу.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="grid gap-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
              <Mail className="h-7 w-7 text-orange-500" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">Нууц үг сэргээх</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Бүртгэлтэй имэйл хаягаа оруулна уу. Таны бүртгэлтэй хаяг руу нууц үг шинэчлэх линк илгээх болно.
            </p>
          </div>

          {submitted ? (
            <div className="grid gap-4">
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                <p className="font-medium">Имэйл амжилттай илгээгдлээ!</p>
                <p className="mt-1 text-green-600">
                  <span className="font-medium">{email}</span> хаяг руу нууц үг сэргээх холбоос илгээлээ. Имэйлээ шалгана уу.
                </p>
              </div>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Нэвтрэх хуудас руу буцах
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                {error && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="grid gap-1">
                  <Label htmlFor="email">Имэйл хаяг</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Илгээж байна..." : "Холбоос илгээх"}
                </Button>

                <Link href="/auth/login">
                  <Button variant="outline" type="button" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Буцах
                  </Button>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
