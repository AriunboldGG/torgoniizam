"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationNumber: "",
    phone: ""
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Овог оруулна уу"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Нэр оруулна уу"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Имэйл оруулна уу"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Имэйл хаяг буруу байна"
    }

    if (!formData.password) {
      newErrors.password = "Нууц үг оруулна уу"
    } else if (formData.password.length < 6) {
      newErrors.password = "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Нууц үг таарахгүй байна"
    }

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Регистрийн дугаар оруулна уу"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Утасны дугаар оруулна уу"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to coming soon page
      router.push("/coming-soon")
    }, 1000)
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">БҮРТГҮҮЛЭХ</CardTitle>
            <CardDescription>
              ТОРГОНЫ ЗАМ системд бүртгүүлж, дуудлага худалдаанд оролцоорой
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Овог</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Овог"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Нэр</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Нэр"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Имэйл</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Регистрийн дугаар</Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  placeholder="TA12345678"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className={errors.registrationNumber ? "border-red-500" : ""}
                />
                {errors.registrationNumber && (
                  <p className="text-sm text-red-500">{errors.registrationNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Утасны дугаар</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="9999-9999"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Нууц үг</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Нууц үг"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Нууц үг давтах</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Нууц үг давтах"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Бүртгэж байна..." : "БҮРТГҮҮЛЭХ"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Хэдийн бүртгэлтэй юу?{" "}
                <Button variant="link" className="p-0 text-blue-600" onClick={() => router.push("/auth/login")}>
                  Нэвтрэх
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
