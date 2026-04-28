
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="py-20 bg-white rounded-lg shadow-sm mb-8">
          <div className="px-8">
            <h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-tt-firs-neue-variable tracking-[2.4%] uppercase text-center"
            >
              ТАНИЛЦУУЛГА
            </h1>
            <div className="text-xl text-gray-600 mb-8 text-justify leading-relaxed">
              <p className="mb-0" style={{textIndent: '2em'}}>
                Монголын хамгийн анхны дуудлага худалдааны torgoniizam.mn-д тавтай морилно уу.
                Манай цахим хуудас нь зээлийн барьцаанд хураагдсан эд зүйлсийг онлайн дуудлага худалдааны хэлбэрээр борлуулдаг юм.
                torgoniizam.mn сайтын тусламжтайгаар та хүссэн бараа бүтээгдэхүүнээ хоёрдогч зах зээлд ченжийн гар дамжилгүйгээр худалдаж авахаас гадна, зах зээлийн бодит үнээр эсвэл түүнээс ч бага үнээр ялагч болж авах боломжтой.
                Баярлалаа, таныг хүндэтгэсэн Монголын анхны онлайн нээлттэй дуудлага худалдааны сайт torgoniizam.mn
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 
                className="text-3xl font-bold text-gray-900 mb-6 font-tt-firs-neue-variable tracking-[2.4%] uppercase"
              >
                Бидний эрхэм зорилго
              </h2>
              <p className="text-lg text-gray-600 mb-0 text-justify leading-relaxed" style={{textIndent: '2em'}}>
               Дэлхийн стандартад нийцсэн, найдвартай онлайн дуудлага худалдааны платформыг бүрдүүлж, 
                эдийн засгийн хөгжилд хувь нэмрээ оруулах.
              </p>
              <p className="text-lg text-gray-600 mb-0 text-justify leading-relaxed" style={{textIndent: '2em'}}>
                Бид технологийн дэвшлийг ашиглан уламжлалт дуудлага худалдааг орчин үеийн болгож, 
                хэрэглэгчдийнхээ хэрэгцээг хангахад анхаардаг.
              </p>
            
            </div>
            <div className="bg-gradient-to-br from-[#FF4405] to-[#E63D04] rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-4">Эрхэм зорилго</h3>
                <p className="text-lg opacity-90">
                  &ldquo;Хэрэглэгчдийн итгэлийг хүлээж, шударга, ил тод дуудлага худалдааг хийх&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        
        {/* <section className="py-16 bg-white rounded-lg shadow-sm mb-8">
          <div className="px-8">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable tracking-[2.4%] uppercase"
              >
                Бидний үнэт зүйлс
              </h2>
              <p className="text-xl text-gray-600 text-justify leading-relaxed mb-0" style={{textIndent: '2em'}}>
                Бидний ажиллаж буй бүх зүйлийн суурь болсон үнэт зүйлс
              </p>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-[#FF4405] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <CardTitle className="text-xl">Итгэлцэл</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify leading-relaxed mb-0" style={{textIndent: '2em'}}>
                  Хэрэглэгчдийн итгэлийг хүлээж, шударга, ил тод үйл ажиллагаа явуулдаг
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-[#FF4405] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💡</span>
                </div>
                <CardTitle className="text-xl">Инноваци</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify leading-relaxed mb-0" style={{textIndent: '2em'}}>
                  Технологийн дэвшлийг ашиглан үйлчилгээг тасралтгүй сайжруулдаг
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-[#FF4405] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <CardTitle className="text-xl">Чадвар</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify leading-relaxed mb-0" style={{textIndent: '2em'}}>
                  Мэргэжлийн багтай, өндөр чанартай үйлчилгээг санал болгодог
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-[#FF4405] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🌱</span>
                </div>
                <CardTitle className="text-xl">Хөгжил</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify leading-relaxed mb-0" style={{textIndent: '2em'}}>
                  Тасралтгүй суралцаж, өөрчлөлтийг эерэгээр хүлээн авдаг
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-[#FF4405] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">❤️</span>
                </div>
                <CardTitle className="text-xl">Хэрэглэгч</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify leading-relaxed mb-0" style={{textIndent: '2em'}}>
                  Хэрэглэгчдийн хэрэгцээг тэргүүлж, тэдний сэтгэл ханамжид анхаардаг
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-[#FF4405] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🏆</span>
                </div>
                <CardTitle className="text-xl">Чансаа</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-justify leading-relaxed mb-0" style={{textIndent: '2em'}}>
                  Монголын дуудлага худалдааны салбарт тэргүүлэгч байх
                </p>
              </CardContent>
            </Card>
          </div>
          </div>
        </section> */}

        {/* Stats Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF4405] mb-2">100+</div>
              <div className="text-gray-600">Идэвхтэй хэрэглэгч</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF4405] mb-2">+</div>
              <div className="text-gray-600">Амжилттай дуудлага</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF4405] mb-2">₮M+</div>
              <div className="text-gray-600">Нийт борлуулалт</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF4405] mb-2">99.9%</div>
              <div className="text-gray-600">Хэрэглэгчийн сэтгэл ханамж</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 