import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockAuctions } from "@/data/auctions";

export default function PendingAuctions() {
  // Filter auctions that are pending (you can modify this logic)
  const pendingAuctions = mockAuctions.filter((auction, index) => index >= 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            style={{
              fontFamily: 'TT Firs Neue Variable',
              fontWeight: 700,
              lineHeight: '1.2',
              letterSpacing: '2.4%',
              textTransform: 'uppercase'
            }}
          >
            Хүлээгдэж буй дуудлага худалдаа
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Удахгүй эхлэх болсон дуудлага худалдаануудыг урьдчилан үзээрэй. Таалагдсан бараануудад анхаарал хандуулж, бэлтгэлээ хийгээрэй.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              Нийт: {pendingAuctions.length} дуудлага
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-lg">
              Удахгүй эхлэх: {pendingAuctions.length}
            </Badge>
          </div>
        </div>
      </section>

      {/* Auctions Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <h2 
                className="text-2xl font-bold text-gray-900"
                style={{
                  fontFamily: 'TT Firs Neue Variable',
                  fontWeight: 700,
                  letterSpacing: '2.4%',
                  textTransform: 'uppercase'
                }}
              >
                Хүлээгдэж буй дуудлага худалдаанууд
              </h2>
              <Separator orientation="vertical" className="h-8" />
              <span className="text-gray-600">{pendingAuctions.length} үр дүн</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4405] focus:border-transparent">
                <option>Бүгд</option>
                <option>Энэ долоо хоног</option>
                <option>Энэ сар</option>
                <option>Дараагийн сар</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4405] focus:border-transparent">
                <option>Эхлэх хугацаа</option>
                <option>Үнэ өсөх</option>
                <option>Үнэ буурах</option>
                <option>Хамгийн шинэ</option>
              </select>
            </div>
          </div>

          {/* Auctions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Зураг</span>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge 
                      variant="outline"
                      className="text-xs border-[#FF4405] text-[#FF4405]"
                    >
                      Хүлээгдэж буй
                    </Badge>
                    <span className="text-xs text-gray-500">
                      ID: {auction.id}
                    </span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{auction.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{auction.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Эхлэх үнэ:</span>
                      <span className="font-bold text-lg text-[#FF4405]">
                        ₮{(auction.startingBid || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Эхлэх хугацаа:</span>
                      <span className="font-semibold text-gray-900">Удахгүй</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Дуусах хугацаа:</span>
                      <span className="font-semibold text-gray-900">{auction.endTime || 'Тодорхойгүй'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Харагдах:</span>
                      <span className="font-semibold text-gray-900">{auction.bidders || 0}</span>
                    </div>
                  </div>
                  
                  {/* Countdown Timer */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <span className="text-sm text-gray-600 block mb-1">Эхлэх хүртэл:</span>
                      <div className="flex justify-center space-x-2">
                        <div className="text-center">
                          <div className="bg-[#FF4405] text-white text-lg font-bold px-2 py-1 rounded">
                            {Math.floor(Math.random() * 24)}
                          </div>
                          <span className="text-xs text-gray-600">Цаг</span>
                        </div>
                        <div className="text-center">
                          <div className="bg-[#FF4405] text-white text-lg font-bold px-2 py-1 rounded">
                            {Math.floor(Math.random() * 60)}
                          </div>
                          <span className="text-xs text-gray-600">Мин</span>
                        </div>
                        <div className="text-center">
                          <div className="bg-[#FF4405] text-white text-lg font-bold px-2 py-1 rounded">
                            {Math.floor(Math.random() * 60)}
                          </div>
                          <span className="text-xs text-gray-600">Сек</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      className="flex-1 border-[#FF4405] text-[#FF4405] hover:bg-[#FF4405] hover:text-white"
                      style={{
                        fontFamily: 'TT Firs Neue Variable',
                        fontWeight: 700,
                        fontSize: '14px',
                        letterSpacing: '2.4%',
                        textTransform: 'uppercase'
                      }}
                    >
                      Анхаарал хандуулах
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-3"
                      style={{
                        fontFamily: 'TT Firs Neue Variable',
                        fontWeight: 700,
                        fontSize: '14px',
                        letterSpacing: '2.4%',
                        textTransform: 'uppercase'
                      }}
                    >
                      Дэлгэрэнгүй
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3 border-2 border-[#FF4405] text-[#FF4405] hover:bg-[#FF4405] hover:text-white transition-all duration-200"
              style={{
                fontFamily: 'TT Firs Neue Variable',
                fontWeight: 700,
                fontSize: '16px',
                letterSpacing: '2.4%',
                textTransform: 'uppercase'
              }}
            >
              Дэлгэрэнгүй үзэх
            </Button>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 
            className="text-2xl font-bold text-gray-900 mb-6"
            style={{
              fontFamily: 'TT Firs Neue Variable',
              fontWeight: 700,
              letterSpacing: '2.4%',
              textTransform: 'uppercase'
            }}
          >
            Хүлээгдэж буй дуудлага худалдааны тухай
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF4405] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⏰</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Урьдчилан үзэх</h4>
              <p className="text-gray-600 text-sm">Дуудлага худалдаа эхлэхээс өмнө бараануудыг урьдчилан үзээрэй</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF4405] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Бэлтгэл хийх</h4>
              <p className="text-gray-600 text-sm">Таалагдсан бараануудад анхаарал хандуулж, бэлтгэлээ хийгээрэй</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF4405] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Стратеги төлөвлөх</h4>
              <p className="text-gray-600 text-sm">Өөрийн стратегийг төлөвлөж, амжилттай санал өгөөрэй</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 