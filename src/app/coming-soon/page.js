"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Home, ArrowLeft } from "lucide-react"

export default function ComingSoonPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Card className="text-center border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-8">
            <div className="mx-auto w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900 mb-4">
              Тун удахгүй
            </CardTitle>
            <CardDescription className="text-xl text-gray-600">
              Бүртгүүлэх хэсэг одоогоор хөгжүүлэгдэж байна
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">
                🚧 Системийн хөгжүүлэлт
              </h3>
              <p className="text-orange-700 leading-relaxed">
                ТОРГОНЫ ЗАМ дуудлага худалдааны системийн бүртгүүлэх хэсгийг 
                хөгжүүлж байна. Удахгүй та бүх хэрэглэгчиддээ үйлчилж эхлэх болно.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Бүртгүүлэх</h4>
                <p className="text-sm text-gray-600">Хялбар бүртгүүлэлт</p>
              </div>
              
              <div className="p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold text-lg">2</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Баталгаажуулах</h4>
                <p className="text-sm text-gray-600">Имэйл баталгаажуулалт</p>
              </div>
              
              <div className="p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold text-lg">3</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Эхлэх</h4>
                <p className="text-sm text-gray-600">Дуудлага худалдаанд оролцох</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📧 Мэдээлэл авах
              </h3>
              <p className="text-gray-600 mb-4">
                Бүртгүүлэх хэсэг бэлэн болсон үед мэдэгдэх боломжтой. 
                Имэйл хаягаа үлдээгээрэй.
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Имэйл хаяг"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Илгээх
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={() => router.push("/")}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Нүүр хуудас
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => router.push("/auth/login")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Нэвтрэх
              </Button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Тусламж хэрэгтэй юу?{" "}
                <a href="mailto:info@silkroad.mn" className="text-orange-600 hover:underline">
                  info@silkroad.mn
                </a>{" "}
                эсвэл{" "}
                <a href="tel:7788-9922" className="text-orange-600 hover:underline">
                  7788-9922
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
