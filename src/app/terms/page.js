"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import jsPDF from "jspdf";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-tt-firs-neue-variable tracking-[2.4%] uppercase">
            ҮЙЛЧИЛГЭЭНИЙ НӨХЦӨЛ
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            torgoniizam.mn сайтын ашиглалтын нөхцөл, дүрэм, эрх, үүрэг
          </p>
          {/* <div className="mt-8 text-sm text-gray-500">
            Сүүлд шинэчилсэн: 2026 оны 2-р сарын 24
          </div> */}
      
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                {/* Introduction */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                    1. Ерөнхий мэдээлэл
                  </h2>
                  <p className="text-gray-700 mb-4">
                    torgoniizam.mn нь Монголын анхны онлайн дуудлага худалдааны
                    платформ бөгөөд зээлийн барьцаанд хураагдсан эд зүйлсийг
                    онлайн дуудлага худалдааны хэлбэрээр борлуулдаг юм.
                  </p>
                  <p className="text-gray-700">
                    Энэхүү үйлчилгээний нөхцөлийг хүлээн зөвшөөрснөөр та манай
                    үйлчилгээг ашиглах боломжтой болно.
                  </p>
                </div>

                {/* User Registration */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                    2. Хэрэглэгчийн бүртгэл
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>
                      Хэрэглэгч бүртгэл үүсгэхийн тулд 18-аас дээш насны хүн
                      байх шаардлагатай
                    </li>
                    <li>Бүртгэлийн мэдээлэл бүрэн, үнэн зөв байх ёстой</li>
                    <li>Нэг хэрэглэгч нэг бүртгэл үүсгэх боломжтой</li>
                    <li>
                      Хэрэглэгчийн нэр, нууц үгийг аюулгүй хадгалах үүрэгтэй
                    </li>
                    <li>
                      Бүртгэлийн мэдээлэл өөрчлөгдсөн тохиолдолд шууд мэдэгдэх
                      ёстой
                    </li>
                  </ul>
                </div>

                {/* Auction Rules */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                    3. Дуудлага худалдааны дүрэм
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>
                      Дуудлага худалдаанд оролцохын тулд дэнчин байршуулах
                      шаардлагатай
                    </li>
                    <li>
                      Үнийн санал нь одоогийн хамгийн өндөр үнээс дээш байх
                      ёстой
                    </li>
                    <li>
                      Дуудлага худалдаа дууссаны дараа үнийн санал өөрчлөгдөхгүй
                    </li>
                    <li>
                      Ялагч болсон хэрэглэгч бараагаа худалдан авах үүрэгтэй
                    </li>
                    <li>
                      Худалдан авахгүй бол дэнчинг системийн шимтгэл болгон хасагдана
                    </li>
                  </ul>
                </div>

                {/* Payment Terms */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                    4. Төлбөрийн нөхцөл
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Бүх төлбөр төгрөгөөр хийгдэнэ</li>
                    <li>Дэнчин байршуулалт нэг удаагийн үйл ажиллагаа</li>
                    <li>
                      Ялагч болсон тохиолдолд барааны үнийг 10 өдрийн дотор  дотор
                      төлөх ёстой
                    </li>
                    <li>
                      10 хоногийн тодор борлуулагчид төлбөрийн үлдэх хэсгийг төлөөгүй бол дахин дуудлага худалдаанд гарна. 
                    </li>
                    <li>Дуудлага худалдаанд оролцогчид нь ялагч болсноос үл хамаарч данчингийн 1%-г систем шимтгэнэ</li>
                  </ul>
                </div>

                {/* Prohibited Items */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                    5. Хориотой бараанууд
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Хууль бус эд зүйлс</li>
                    <li>Хүний эрүүл мэндэд хортой бодисууд</li>
                    <li>Терроризм, халдлагатай холбоотой эд зүйлс</li>
                    <li>Хууль бус зэвсэг, дэлбэрэх бодисууд</li>
                    <li>Хүний эрх, нэр хүндэд халдаж буй эд зүйлс</li>
                    <li>Хууль бус наркотик, сэтгэцэд нөлөөтэй бодисууд</li>
                  </ul>
                </div>

                {/* User Responsibilities */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                    6. Хэрэглэгчийн үүрэг
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Хууль, дүрмийг дагаж мөрдөх</li>
                    <li>Бусад хэрэглэгчдийн эрхийг хүндэтгэх</li>
                    <li>Системийн аюулгүй байдлыг хадгалах</li>
                    <li>Хууль бус үйл ажиллагаа явуулахгүй байх</li>
                    <li>Барааны мэдээллийг үнэн зөв оруулах</li>
                    <li>Төлбөрийн үүргээ цаг тухайд нь биелүүлэх</li>
                  </ul>
                </div>

                {/* Platform Responsibilities */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                    7. Платформын үүрэг
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Системийн аюулгүй байдлыг хангах</li>
                    <li>Хэрэглэгчийн мэдээллийг хамгаалах</li>
                    <li>Дуудлага худалдааг шударга удирдах</li>
                    <li>Техникийн дэмжлэг үзүүлэх</li>
                    <li>Хууль бус үйл ажиллагааг таслан зогсоох</li>
                    <li>Системийн тасралтгүй ажиллагааг хангах</li>
                  </ul>
                </div>

                {/* Privacy Policy */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                    8. Нууцлалын бодлого
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Бид таны хувийн мэдээллийг зөвхөн үйлчилгээний зорилгоор
                    ашигладаг:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Бүртгэлийн мэдээлэл (нэр, имэйл, утасны дугаар)</li>
                    <li>Төлбөрийн мэдээлэл (хэтэвчний мэдээлэл)</li>
                    <li>Дуудлага худалдааны түүх</li>
                    <li>Системийн ашиглалтын мэдээлэл</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    Таны мэдээллийг гуравдагч талд хуваалцахгүй бөгөөд хуульд
                    заасан тохиолдолд л ашиглана.
                  </p>
                </div>

                {/* Dispute Resolution */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                    9. Маргааны шийдвэрлэлт
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Маргаан эхлэхээс өмнө зөвлөлцөх оролдлого хийх</li>
                    <li>
                     •	Хэрэв зөвшилцөлд хүрэхгүй бол Монголын арбитрын шүүхэд хандана
                    </li>
                    <li>Маргааныг Монголын хуулийн дагуу шийдвэрлэнэ</li>
                    <li>Хэрэглэгч нэмэлт төлбөр төлөхгүй</li>
                  </ul>
                </div>

                {/* Termination */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                    10. Гэрээг цуцлах
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Дараах тохиолдолд гэрээг цуцлах боломжтой:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Хэрэглэгчийн хүсэлтээр</li>
                    <li>Хууль бус үйл ажиллагаа явуулсан тохиолдолд</li>
                    <li>Нөхцөлийг зөрчсөн тохиолдолд</li>
                    <li>Системийн аюулгүй байдлыг халдсан тохиолдолд</li>
                  </ul>
                </div>

                {/* Changes to Terms */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                    11. Нөхцөлийн өөрчлөлт
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Бид энэхүү нөхцөлийг шаардлагатай үед өөрчлөх эрхтэй:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Өөрчлөлтийг урьдчилан мэдэгдэнэ</li>
                    <li>Хэрэглэгчдэд имэйлээр илгээнэ</li>
                    <li>Сайт дээр мэдэгдэл оруулна</li>
                    <li>Өөрчлөлт хүчин төгөлдөр болох хугацааг тодорхойлно</li>
                  </ul>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-tt-firs-neue-variable">
                    12. Холбоо барих
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-gray-700 mb-4">
                      Асуулт, санал хүсэлтээ дараах хаягаар илгээнэ үү:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>📧 Имэйл: info@torgoniizam.mn</li>
                      <li>📞 Утас: +976 7000-0000</li>
                      <li>🏢 Хаяг: Улаанбаатар хот, Сүхбаатар дүүрэг</li>
                      <li>🕒 Ажлын цаг: Даваа-Баасан 09:00-18:00</li>
                    </ul>
                  </div>
                </div>

                {/* Final Notes */}
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">
                    ⚠️ Анхаарна уу!
                  </h3>
                  <p className="text-blue-800">
                    Энэхүү нөхцөлийг хүлээн зөвшөөрснөөр та дээрх бүх нөхцөлийг
                    хүлээн зөвшөөрсөн гэж үзнэ. Хэрэв та нөхцөлийн аль нэг
                    хэсгийг хүлээн зөвшөөрөхгүй бол үйлчилгээг ашиглахгүй байна
                    уу.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
