"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { KeyRound, Eye, EyeOff, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const uid = searchParams.get("uid")
  const token = searchParams.get("token")

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Invalid link guard
  if (!uid || !token) {
    return (
      <div className="grid gap-4 text-center">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <KeyRound className="h-7 w-7 text-red-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold">Буруу холбоос</h1>
        <p className="text-sm text-muted-foreground">
          Нууц үг сэргээх холбоос буруу эсвэл хугацаа дууссан байна.
        </p>
        <Link href="/auth/forgot-password">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Дахин холбоос авах
          </Button>
        </Link>
      </div>
    )
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("Нууц үг таарахгүй байна. Дахин шалгана уу.")
      return
    }
    if (newPassword.length < 8) {
      setError("Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой.")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(
        `/api/user/password/reset/confirm/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uidb64: uid,
            token,
            new_password: newPassword,
            confirm_password: confirmPassword,
          }),
        }
      )

      const data = await res.json().catch(() => ({}))
      console.log("Password reset confirm response:", data)
      if (!res.ok || data?.status_code === "ng") {
        const msg =
          data?.msg ||
          "Алдаа гарлаа. Дахин оролдоно уу."
        throw new Error(msg)
      }

      setSuccess(true)
      setTimeout(() => router.push("/auth/login"), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="grid gap-4 text-center">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-7 w-7 text-green-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold">Амжилттай!</h1>
        <p className="text-sm text-muted-foreground">
          Нууц үг амжилттай шинэчлэгдлээ. Нэвтрэх хуудас руу чиглүүлж байна...
        </p>
        <Link href="/auth/login">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Нэвтрэх
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
          <KeyRound className="h-7 w-7 text-orange-500" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Шинэ нууц үг тохируулах</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Шинэ нууц үгээ доор оруулна уу.
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* New password */}
          <div className="grid gap-1">
            <Label htmlFor="new-password">Шинэ нууц үг</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNew ? "text" : "password"}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowNew((p) => !p)}
                tabIndex={-1}
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div className="grid gap-1">
            <Label htmlFor="confirm-password">Нууц үг давтах</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirm((p) => !p)}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Хадгалж байна..." : "Нууц үг шинэчлэх"}
          </Button>

          <Link href="/auth/login">
            <Button variant="outline" type="button" className="w-full">
              Буцах
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div className="text-center text-sm text-muted-foreground">Уншиж байна...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
