"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  const [showTermsDialog, setShowTermsDialog] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
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

    if (!acceptedTerms) {
      newErrors.terms = "Үйлчилгээний нөхцөлийг хүлээн зөвшөөрнө үү"
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

              <div className="flex items-center justify-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0"
                />
                <div className="text-sm text-gray-600">
                  <label htmlFor="terms" className="cursor-pointer">
                    Би{" "}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 text-blue-600 underline"
                      onClick={() => setShowTermsDialog(true)}
                    >
                      Үйлчилгээний нөхцөл
                    </Button>
                    -ийг уншиж, хүлээн зөвшөөрч байна
                  </label>
                  {errors.terms && (
                    <p className="text-sm text-red-500 mt-1">{errors.terms}</p>
                  )}
                </div>
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

      {/* Terms of Service Dialog */}
      <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">
              Үйлчилгээний нөхцөл
            </DialogTitle>
            <DialogDescription className="text-left">
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-bold mb-4">
                  Борлуулагч, дуудлага худалдаанд оролцогч, дуудлага худалдаа зохион байгуулагч нарын хооронд байгуулах гэрээ /дүрэм/
                </h3>
                
                <h4 className="text-md font-bold mt-6 mb-3">I. Нийтлэг үндэслэл</h4>
                <p className="mb-2"><strong>1.1.</strong> Torgoniizam.mn (цаашид "Зохион байгуулагч" гэх) нь интернэт сайт болох Torgoniizam.mn сайт дээр үзүүлэх үйлчилгээний нөхцөлийг нийтэлж байна.</p>
                <p className="mb-2"><strong>1.2.</strong> Барьцаалан зээлдэгч (цаашид "Борлуулагч" гэх) барьцааны эрхээ хэрэгжүүлж байгаа хуулийн этгээд</p>
                <p className="mb-2"><strong>1.3.</strong> Энэхүү нөхцөл нь Дуудлага худалдаанд оролцогч (цаашид "Дуудлага худалдаанд оролцогч" гэх) сайтаар үйлчлүүлэхээсээ өмнө хүлээн зөвшөөрч баталгаажуулсны үндсэн дээр хэрэгжинэ.</p>
                <p className="mb-2"><strong>1.4.</strong> Энэхүү нөхцөлд өөрөөр заагаагүй бол дараах нэр томьёог дор дурдсан утгаар ойлгоно:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>А – Torgoniizam.mn үүсгэн байгуулагч;</li>
                  <li>Сайт – Torgoniizam.mn интернэт сайтад түр хугацааны зар байршуулах платформ (цаашид "Сайт" гэх);</li>
                  <li>Дуудлага худалдаанд оролцогч – энэхүү нөхцөлийг хүлээн зөвшөөрөн Компанийн үйлчилгээг авч буй хувь хүн болон хуулийн этгээд;</li>
                  <li>Torgoniizam.mn үйлчилгээ – сайтын туслалцаатай Барьцаалан зээлдүүлэх үйл ажиллагаа эрхлэгч хуулийн этгээдүүдэд үзүүлж буй төлбөргүй болон төлбөртэй үйлчилгээ.</li>
                </ul>
                <p className="mb-2"><strong>1.5.</strong> Torgoniizam.mn -ээр үйлчлүүлснээр Дуудлага худалдаанд оролцогч энэхүү нөхцөлтэй танилцаж, хүлээн зөвшөөрсөн гэж ойлгоно.</p>
                <p className="mb-2"><strong>1.6.</strong> Torgoniizam.mn -д бүртгүүлснээр Дуудлага худалдаанд оролцогч нь үйлчилгээний нөхцөлийг бүрэн эхээр нь хүлээн зөвшөөрсөнд тооцно. Хэрэв Дуудлага худалдаанд оролцогч энэхүү нөхцөлийн аль нэг заалтыг хүлээн зөвшөөрөөгүй тохиолдолд Torgoniizam.mn -ий үйлчилгээг авах эрхгүй болно.</p>
                <p className="mb-2"><strong>1.7.</strong> Зохион байгуулагч тал нь интернэт Дуудлага худалдаанд оролцогчдод тус нөхцөлийн дагуу үйлчилгээг ашиглахыг санал болгож байна.</p>
                <p className="mb-4"><strong>1.8.</strong> Борлуулагч, Дуудлага худалдаанд оролцогчдын дунд явагдаж буй бүх хэлэлцээр Зохион байгуулагч талын оролцоогүйгээр явагддаг болно. Зохион байгуулагч тал нь онлайн нээлттэй дуудлага худалдааг зохион байгуулахаар зар байршуулах платформоор л хангадаг болно.</p>

                <h4 className="text-md font-bold mt-6 mb-3">II. Дуудлага худалдааны нийтлэх журам</h4>
                <p className="mb-2"><strong>2.1.</strong> Дуудлага худалдаанд оролцогч нь дуудлага худалдааны дэнчинг байршуулснаар өөрийн сонирхож буй бараа бүтээгдэхүүний нээлттэй дуудлага худалдаанд оролцох эрхтэй.</p>
                <p className="mb-2"><strong>2.2.</strong> Дуудлага худалдаанд оролцогч сайтын гишүүнээр саадгүй бүртгүүлэх бүрэн эрхтэй бөгөөд бүртгэлд өөрт ирсэн нууц кодоороо сайтанд нэвтэрч, сайтын үйлчилгээг авах эрхтэй.</p>
                <p className="mb-2"><strong>2.3.</strong> Сайтын үйлчилгээг авснаар энэхүү үйлчилгээний нөхцөлд заасан дүрэм журмыг заавал мөрдөх шаардлагыг хүлээн зөвшөөрсөнд тооцно.</p>
                <p className="mb-2"><strong>2.4.</strong> Дуудлага худалдаанд оролцогч сайт уруу ордог өөрийн нууц кодоо нууцалж, нууц кодтой холбоотой бүх асуудлын хариуцлагыг өөрөө үүрнэ. Дуудлага худалдаанд оролцогч зөвхөн өөрийн утасны дугаар, майл хаяг, нууц код ашиглан сайтын үйлчилгээг авах эрхтэй.</p>
                <p className="mb-2"><strong>2.5.</strong> Нэг Дуудлага худалдаанд оролцогч нь (хувь хүн болон хуулийн этгээд) нэг л бүртгэлтэй байна. Нэгээс илүү бүртгэлтэй байх нь хориотой тул автомат системээр тогтоогдсон давхар бүртгэлүүд түр хаагдах болон түгжигдэх болно.</p>
                <p className="mb-2"><strong>2.6.</strong> Дуудлага худалдаанд оролцогч сайт уруу ордог өөрийн нууц кодоо нууцалж, гуравдагч этгээдэд өгөхгүй байх үүрэгтэй.</p>
                <p className="mb-2"><strong>2.7.</strong> Борлуулагч нь өөрийн бараа бүтээгдэхүүнийхээ мэдээллийг үнэн зөв байршуулах бөгөөд хэрэв бараа бүтээгдэхүүний доголдол, эрхийн зөрчлийг санаатайгаар нуун дарагдуулсан тохиолдлоос бусад эрсдэлийг худалдан авагч тал хариуцна. Үүнд: ялагч болсон тохиолдолд барааны үлдэгдэл төлбөрийг төлөхөөс татгалзсан тохиолдолд дуудлага худалдаанд оролцсон дэнчинг буцаан шаардах эрхгүй болно.</p>
                <p className="mb-2"><strong>2.8.</strong> Борлуулагч нь борлуулж буй бараа бүтээгдэхүүнийхээ чанар, аюулгүй байдал, хууль дүрэмд харшлахгүй байх тал дээр бүрэн хариуцна.</p>
                <p className="mb-2"><strong>2.9.</strong> Худалдагч тал нь худалдан бараа борлуулсны орлогоос зээлийн гэрээнд заагдсан хангагдвал зохих үүргийн гүйцэтгэл, худалдан борлуулахад гарсан зардал, үнэлгээ хийлгэсэн зардлыг суутгаж илүү гарсан ашгийг барьцаалуулагчид буцаан төлөх учир борлуулагчаас Худалдан авагчид НӨАТ-н баримт олгохгүй болно.</p>
                <p className="mb-2"><strong>2.10.</strong> Борлуулагч нь өөрийн бараа бүтээгдэхүүнийхээ дэлгэрэнгүй мэдээллийг буруу мэдээлсэн тохиолдолд мэдээлэлд шуурхай засвар үүрэгтэй.</p>
                <p className="mb-2"><strong>2.11.</strong> Борлуулагч нь бараа бүтээгдэхүүний эхлэх үнийг тавихдаа барьцаалуулагч үнэлгээ хийлгэхийг шаардаагүй бол барьцааны үүргийн гүйцэтгэлийг бүрэн хангах үнийг оруулах үүрэгтэй.</p>
                <p className="mb-2"><strong>2.12.</strong> Борлуулагч нь өөрийн бараа бүтээгдэхүүнээ идэвхтэй сурталчлах эрхтэй бөгөөд өрсөлдөгч худалдагчдад саад болохгүй байх үүрэгтэй.</p>
                <p className="mb-2"><strong>2.13.</strong> Борлуулагч нь Зохион байгуулагч талын үйлчилгээг үзүүлж байгаа өөр ижил төрлийн үйл ажиллагаа явуулж байгаа хувь хүн, хуулийн этгээдэд барааг давхардуулан зар оруулж дуудлага худалдаа зохион байгуулахыг хориглоно. Хэрэв давхардсан тохиолдолд Зохион байгуулагч талд учирсан хохирлыг хариуцан арилгана.</p>
                <p className="mb-2"><strong>2.14.</strong> Дуудлага худалдаанд оролцогч дараах зүйлсийг хориглоно:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Нэг дуудлага худалдаанд оролцогч олон хаягаас дуудлага худалдаанд оролцох.</li>
                  <li>Зохиомол үнэ өсгөх;</li>
                  <li>Хоёр буюу түүнээс дээш этгээд зориуд зохиомол үнэ өсгөх.</li>
                  <li>Зохион байгуулагч талын явуулж байгаа үйл ажиллагааны талаар олон нийтэд худал ташаа мэдээлэл тараах.</li>
                  <li>Сонирхож буй бараа бүтээгдэхүүний мэдээллийг дутуу дулимаг судалж танилцах;</li>
                  <li>Борлуулагчтай хуйвалдах;</li>
                  <li>Борлуулагчийн бараа бүтээгдэхүүн илтэд алдаатай /үнийн зөрүүтэй, зураг тайлбар буруу байх/ тохиолдолд уг дуудлага худалдаан оролцохгүй байж энэ талаар Зохион байгуулагч талд мэдэгдэх;</li>
                  <li>Барьцаалан зээлдүүлэх үйл ажиллагаа явуулж байгаа хуулийн этгээдийн нэрийн өмнөөс дуудлага худалдаанд оролцохгүй байх.</li>
                </ul>
                <p className="mb-4">Дуудлага худалдаанд оролцогч нь дээрх хориглосон үйлдлийг гаргахгүй байх үүрэгтэй бөгөөд зөрчсөн тохиолдолд Зохион байгуулагч талд учирсан хохирлыг нөхөн төлөх үүрэгтэй.</p>

                <h4 className="text-md font-bold mt-6 mb-3">III. Талуудын эрх үүрэг</h4>
                <p className="mb-2"><strong>3.1</strong> Сайтын үйлчилгээг ашигласнаар Борлуулагч нь өөрийн оруулсан дуудлага худалдааны зар дахь мэдээллийн хариуцлагын дангаар үүрнэ.</p>
                <p className="mb-2"><strong>3.5.</strong> Дуудлага худалдаанд оролцогчийн бичгээр өгсөн зөвшөөрлийн дагуу аль эсвэл холбогдох хууль тогтоомжийн дагуу Дуудлага худалдаанд оролцогчийн хувийн мэдээллийг гуравдагч этгээдэд олгогдоно.</p>
                <p className="mb-2"><strong>3.6.</strong> Дуудлага худалдаанд оролцогч нь ялагч болсны дараагаар барааг худалдан авахаас сайн дураараа татгалзсан тохиолдолд дуудлага худалдааг дахин явуулах ба хэрэглэгчийн байршуулсан дэнчинг буцаан олгохгүй болно.</p>
                <p className="mb-2"><strong>3.7.</strong> Дуудлага худалдаанд оролцогч нь сайтын ажиллагаатай холбоотой санал гомдлоо Зохион байгуулагч талд утсаар мэдэгдэх эрхтэй.</p>
                <p className="mb-2"><strong>3.8.</strong> Хэрэглэгч нь веб сайтад мөнгө байршуулах, байршуулсан мөнгийг эргүүлэн татах, үйлдэл хийхэд гүйлгээний шимтгэлийг Зохион байгуулагч талаас суутгаж бодох болно.</p>
                <p className="mb-4"><strong>3.9.</strong> Зохион байгуулагч тал нь Дуудлага худалдаанд оруулсан зарыг үнэн зөв болохыг нотлох баримтыг Борлуулагчаас шаардах эрхтэй.</p>

                <h4 className="text-md font-bold mt-6 mb-3">IV. Дуудлага худалдааны дэнчин /төлбөр/</h4>
                <p className="mb-2"><strong>4.1.</strong> Дуудлага худалдаанд оролцогч нь Зохион байгуулагч талд данчинг байршуулах үүрэгтэй</p>
                <p className="mb-2"><strong>4.2.</strong> Үйлчилгээний төлбөрийг сайт дээр заасны дагуу хийнэ.</p>
                <p className="mb-4"><strong>4.3.</strong> Дуудлага худалдаанд оролцогч нь дуудлага худалдаанд ялагч болоогүй тохиолдолд цахим хэтэвчинд дэнчинд байршуулсан төлбөрийн 2% суутгагдаж орох болно.</p>

                <h4 className="text-md font-bold mt-6 mb-3">V. Талуудын хариуцлага</h4>
                <p className="mb-2"><strong>5.1.</strong> Сайтын үйлчилгээг ашигласнаар, Дуудлага худалдаанд оролцогч нь өөрийн эрсдэлийг үнэлэн бүх эрсдэлийг үүрнэ. Дуудлага худалдаанд Борлуулагчийн бичсэн зарын текстийн утга агуулга, тайлбарт Зохион байгуулагч тал хариуцлага үүрэхгүй болно.</p>
                <p className="mb-2"><strong>5.2.</strong> Зохион байгуулагч тал нь Борлуулагч, Дуудлага худалдаанд оролцогчдын хоорондын худалдан авалтын зохион байгуулагч болно. Сайт нь Борлуулагчийн барьцаанд хураагдсан эд зүйлсийг нээлттэй Дуудлага худалдаанд хуулиар зөвшөөрөгдсөн худалдан борлуулах зорилготой платформ юм.</p>
                <p className="mb-2"><strong>5.3.</strong> Сайтыг буруу хэрэглэснээс гарсан хохирлыг зохион байгуулагч тал хариуцахгүй болно.</p>
                <p className="mb-2"><strong>5.4.</strong> Дуудлага худалдаанд оролцогчийн өөрийн эрх ашгийг өөр нэгэн Дуудлага худалдаанд оролцогч зөрчсөн тохиолдлыг Дуудлага худалдаанд оролцогч нь Зохион байгуулагч талд мэдэгдэх эрхтэй. Дуудлага худалдаанд оролцогчийн гомдол бодит болох нь тогтоогдвол Зохион байгуулагч нь өөрийн үзсэнээр урьдчилан шийдвэрлэх ажиллагаа хийх эрхтэй.</p>
                <p className="mb-2"><strong>5.5.</strong> Гуравдагч этгээдийн хууль бусаар сайтад нэвтрэн Компанийн серверийг болон Дуудлага худалдаанд оролцогчдын мэдээлэл ашиглах, түүнчлэн сайтаар дамжуулан вирус, Trojan, г.м. тараасан тохиолдолд гэм буруутай гуравдагч этгээд хариуцлага хүлээнэ.</p>
                <p className="mb-2"><strong>5.6.</strong> Дуудлага худалдаан байршсан бараа Зохион байгуулагчийн хяналтаас гадуур байгаа болно.</p>
                <p className="mb-2"><strong>5.7.</strong> Сайтын Дуудлага худалдаанд оролцогч нь өөрийн хийсэн үйлдэлд бүрэн хариуцлага үүрнэ.</p>
                <p className="mb-4"><strong>5.8.</strong> Борлуулагч нь дуудлага худалдаа эхэлсэн үед дуудлага худалдааг цуцлах эрхгүй болно.</p>

                <h4 className="text-md font-bold mt-6 mb-3">VI. Үйлчилгээний нөхцөлийн хамрах хугацаа</h4>
                <p className="mb-2"><strong>6.1.</strong> Энэхүү нөхцөлийг Дуудлага худалдаанд оролцогч сайт ашиглаж эхэлсэн үеэс мөрдөх бөгөөд энэхүү нөхцөл нь хугацаагүй болно.</p>
                <p className="mb-4"><strong>6.3.</strong> Хэрэв Зохион байгуулагч Үйлчилгээний нөхцөл /гэрээнд/ нэмэлт өөрчлөлтөөр оруулсан аль нэг заалтыг Дуудлага худалдаанд оролцогч хүлээн зөвшөөрөхгүй байгаа тохиолдолд Дуудлага худалдаанд оролцогч сайтын үйлчилгээг ашиглахаа дуусгавар болгох үүрэгтэй. Дуудлага худалдаанд оролцогч сайтыг ашигласан хэвээр байгаа тохиолдолд нэмэлт өөрчлөлтийг хүлээн зөвшөөрсөнд тооцно.</p>

                <h4 className="text-md font-bold mt-6 mb-3">VII. Үйлчилгээний нөхцөлийн нэмэлт өөрчлөлт</h4>
                <p className="mb-4"><strong>7.1.</strong> Зохион байгуулагч нь урьдчилан мэдэгдэлгүйгээр үйлчилгээний нөхцөлд нэмэлт өөрчлөлт оруулж болно. Үйлчилгээний нөхцөлийн шинэ хувилбар нь дахин шинэчлэгдэж байршсан байх болно.</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => {
                setAcceptedTerms(true)
                setShowTermsDialog(false)
              }}
              className="bg-[#FF4405] hover:bg-[#E63D04] text-white"
            >
              Хүлээн зөвшөөрч байна
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowTermsDialog(false)}
            >
              Хаах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
