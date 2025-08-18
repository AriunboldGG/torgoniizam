import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockAuctions } from "@/data/auctions";

export default function TodayAuctions() {
  // Filter auctions that are happening today (you can modify this logic)
  const todaysAuctions = mockAuctions.filter((auction, index) => index < 6);

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
            Өнөөдөр болох дуудлага худалдаа
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Өнөөдрийн онцгой дуудлага худалдаануудыг үзээрэй. Удахгүй эхлэх болсон үнэ цэнэтэй бараануудыг алдахгүйгээр байна.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-lg">
              Нийт: {todaysAuctions.length} дуудлага
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-lg">
              Идэвхтэй: {todaysAuctions.filter(a => a.isLive).length}
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
                Дуудлага худалдаанууд
              </h2>
              <Separator orientation="vertical" className="h-8" />
              <span className="text-gray-600">{todaysAuctions.length} үр дүн</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4405] focus:border-transparent">
                <option>Бүгд</option>
                <option>Идэвхтэй</option>
                <option>Дууссан</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4405] focus:border-transparent">
                <option>Хамгийн сүүлд</option>
                <option>Үнэ өсөх</option>
                <option>Үнэ буурах</option>
              </select>
            </div>
          </div>

          {/* Auctions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todaysAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Зураг</span>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge 
                      variant={auction.isLive ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {auction.isLive ? 'Идэвхтэй' : 'Дууссан'}
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
                      <span className="text-sm text-gray-600">Одоогийн үнэ:</span>
                      <span className="font-bold text-lg text-[#FF4405]">
                        ₮{(auction.currentBid || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Эхлэх үнэ:</span>
                      <span className="font-semibold text-gray-900">
                        ₮{(auction.startingBid || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Дуусах хугацаа:</span>
                      <span className="font-semibold text-gray-900">{auction.endTime || 'Тодорхойгүй'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Санал:</span>
                      <span className="font-semibold text-gray-900">{auction.bidders || 0}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-[#FF4405] hover:bg-[#E63D04] text-white"
                      style={{
                        fontFamily: 'TT Firs Neue Variable',
                        fontWeight: 700,
                        fontSize: '14px',
                        letterSpacing: '2.4%',
                        textTransform: 'uppercase'
                      }}
                    >
                      Санал өгөх
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
    </div>
  );
} 