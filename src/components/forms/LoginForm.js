"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contexts/UserContext"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useUser()
  const router = useRouter()

  async function onSubmit(event) {
    event.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = login(email, password)
      
      if (result.success) {
        // Redirect to my-account page
        router.push("/my-account")
      } else {
        setError(result.error)
      }
    } catch {
      setError("Системийн алдаа гарлаа. Дахин оролдоно уу.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="grid gap-1">
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
              Имэйл
            </Label>
            <Input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              placeholder="test@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
              Нууц үг
            </Label>
            <Input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              type="password"
              placeholder="password123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Эсвэл
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
        <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
        </svg>
        ДАН системээр нэвтрэх
      </Button>
      
      <div className="text-center text-sm text-gray-500 space-y-2">
        <p className="font-medium">Тестийн хэрэглэгчид:</p>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="font-semibold text-gray-700 mb-1">Хэрэглэгч 1:</p>
          <p>Имэйл: <strong>test@example.com</strong></p>
          <p>Нууц үг: <strong>password123</strong></p>
          <p className="text-xs text-gray-500 mt-1">Б.АЛТАНЗУЛ (Ариунболд Ганбат)</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="font-semibold text-gray-700 mb-1">Хэрэглэгч 2:</p>
          <p>Имэйл: <strong>galhuu@gmail.com</strong></p>
          <p>Нууц үг: <strong>Test123</strong></p>
          <p className="text-xs text-gray-500 mt-1">B.GALHUU (Galhuu B)</p>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Бүртгэл байхгүй юу?{" "}
          <Button 
            variant="link" 
            className="p-0 text-blue-600 hover:text-blue-800"
            onClick={() => router.push("/auth/signup")}
          >
            БҮРТГҮҮЛЭХ
          </Button>
        </p>
      </div>
    </div>
  )
} 