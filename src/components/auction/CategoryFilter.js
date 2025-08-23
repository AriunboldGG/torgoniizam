"use client"

import { useState } from "react"
import Image from "next/image"

export default function CategoryFilter() {
  const categories = [
    {
      id: "car",
      name: "АВТОМАШИН",
      icon: "/svg/filter/car.svg",
      count: 16,
      subcategories: [
        {
          name: "Toyota",
          icon: "🚗",
          count: 2910
        },
        {
          name: "Lexus",
          icon: "🚗",
          count: 798
        },
        {
          name: "Mercedes-Benz",
          icon: "🚗",
          count: 225
        },
        {
          name: "Nissan",
          icon: "🚗",
          count: 152
        },
        {
          name: "Subaru",
          icon: "🚗",
          count: 140
        },
        {
          name: "Ford",
          icon: "🚗",
          count: 94
        },
        {
          name: "Hyundai",
          icon: "🚗",
          count: 71
        },
        {
          name: "Mitsubishi",
          icon: "🚗",
          count: 63
        },
        {
          name: "BMW",
          icon: "🚗",
          count: 56
        },
        {
          name: "Jeep",
          icon: "🚗",
          count: 54
        },
        {
          name: "Land Rover",
          icon: "🚗",
          count: 47
        },
        {
          name: "Volkswagen",
          icon: "🚗",
          count: 39
        },
        {
          name: "Honda",
          icon: "🚗",
          count: 29
        },
        {
          name: "Mazda",
          icon: "🚗",
          count: 26
        },
        {
          name: "Suzuki",
          icon: "🚗",
          count: 24
        },
        {
          name: "Audi",
          icon: "🚗",
          count: 23
        },
        {
          name: "Geely",
          icon: "🚗",
          count: 19
        },
        {
          name: "BYD",
          icon: "🚗",
          count: 18
        },
        {
          name: "Бусад",
          icon: "🚗",
          count: 18
        },
        {
          name: "Porsche",
          icon: "🚗",
          count: 17
        },
        {
          name: "Changan",
          icon: "🚗",
          count: 16
        },
        {
          name: "GWM Tank",
          icon: "🚗",
          count: 16
        },
        {
          name: "Dodge",
          icon: "🚗",
          count: 14
        },
        {
          name: "SsangYong",
          icon: "🚗",
          count: 14
        },
        {
          name: "MINI",
          icon: "🚗",
          count: 13
        },
        {
          name: "Renault",
          icon: "🚗",
          count: 13
        },
        {
          name: "Kia",
          icon: "🚗",
          count: 11
        },
        {
          name: "MG",
          icon: "🚗",
          count: 10
        },
        {
          name: "Hummer",
          icon: "🚗",
          count: 8
        },
        {
          name: "Infiniti",
          icon: "🚗",
          count: 8
        },
        {
          name: "Chevrolet",
          icon: "🚗",
          count: 7
        },
        {
          name: "Lada",
          icon: "🚗",
          count: 6
        },
        {
          name: "Dongfeng",
          icon: "🚗",
          count: 5
        },
        {
          name: "Haval",
          icon: "🚗",
          count: 5
        },
        {
          name: "Jetour",
          icon: "🚗",
          count: 4
        },
        {
          name: "Baic",
          icon: "🚗",
          count: 3
        },
        {
          name: "Chery",
          icon: "🚗",
          count: 3
        },
        {
          name: "Neta",
          icon: "🚗",
          count: 3
        },
        {
          name: "Tesla",
          icon: "🚗",
          count: 3
        },
        {
          name: "Foton",
          icon: "🚗",
          count: 2
        },
        {
          name: "Lincoln",
          icon: "🚗",
          count: 2
        },
        {
          name: "Volvo",
          icon: "🚗",
          count: 2
        },
        {
          name: "BAW",
          icon: "🚗",
          count: 1
        },
        {
          name: "Bentley",
          icon: "🚗",
          count: 1
        },
        {
          name: "Chrysler",
          icon: "🚗",
          count: 1
        },
        {
          name: "Daihatsu",
          icon: "🚗",
          count: 1
        },
        {
          name: "Fiat",
          icon: "🚗",
          count: 1
        },
        {
          name: "Isuzu",
          icon: "🚗",
          count: 1
        },
        {
          name: "Jaguar",
          icon: "🚗",
          count: 1
        },
        {
          name: "Kaiyi",
          icon: "🚗",
          count: 1
        },
        {
          name: "Li Auto",
          icon: "🚗",
          count: 1
        },
        {
          name: "Opel",
          icon: "🚗",
          count: 1
        },
        {
          name: "Samsung",
          icon: "🚗",
          count: 1
        },
        {
          name: "UAZ",
          icon: "🚗",
          count: 1
        }
      ]
    },
    {
      id: "phone",
      name: "ГАР УТАС & ТАБЛЕТ",
      icon: "/svg/filter/phone.svg",
      count: 25,
      subcategories: [
        {
          name: "iPhone",
          icon: "📱",
          count: 8
        },
        {
          name: "Samsung",
          icon: "📱",
          count: 12
        },
        {
          name: "Xiaomi",
          icon: "📱",
          count: 15
        },
        {
          name: "Huawei",
          icon: "📱",
          count: 10
        },
        {
          name: "Tablet",
          icon: "📱",
          count: 18
        },
        {
          name: "Accessories",
          icon: "🔌",
          count: 22
        }
      ]
    },
    {
      id: "computer",
      name: "КОМПЬЮТЕР",
      icon: "/svg/filter/computer.svg",
      count: 34,
      subcategories: [
        {
          name: "Суурин компьютер",
          icon: "💻",
          count: 12
        },
        {
          name: "Notebook",
          icon: "🖥️",
          count: 8
        },
        {
          name: "PS, XBox, Nintendo",
          icon: "🎮",
          count: 15
        },
        {
          name: "Принтер, хувилагч, сканнер, ламинатор",
          icon: "🖨️",
          count: 23
        },
        {
          name: "Сэлбэг",
          icon: "🔧",
          count: 31
        },
        {
          name: "iPad, tablet, kindle",
          icon: "📱",
          count: 19
        },
        {
          name: "Принтер, хувилагчийн хор",
          icon: "🖨️",
          count: 27
        },
        {
          name: "Чихэвч, 3D шил",
          icon: "🎧",
          count: 14
        },
        {
          name: "Дагалдах хэрэгсэл",
          icon: "🔌",
          count: 42
        }
      ]
    },
    {
      id: "accessory",
      name: "ҮНЭТ ЭДЛЭЛ",
      icon: "/svg/filter/accessory.svg",
      count: 62,
      subcategories: [
        {
          name: "Зүү",
          icon: "💍",
          count: 18
        },
        {
          name: "Бөгж",
          icon: "💍",
          count: 25
        },
        {
          name: "Гишүүн",
          icon: "💍",
          count: 12
        },
        {
          name: "Цагаан алт",
          icon: "💍",
          count: 31
        },
        {
          name: "Хүрэл",
          icon: "💍",
          count: 19
        },
        {
          name: "Эрдэнийн чулуу",
          icon: "💎",
          count: 28
        }
      ]
    },
    {
      id: "electric",
      name: "ЦАХИЛГААН БАРАА",
      icon: "/svg/filter/electric.svg",
      count: 8,
      subcategories: [
        {
          name: "Телевизор",
          icon: "📺",
          count: 5
        },
        {
          name: "Хөргөгч",
          icon: "❄️",
          count: 8
        },
        {
          name: "Угаалгын машин",
          icon: "🧺",
          count: 12
        },
        {
          name: "Агааржуулагч",
          icon: "💨",
          count: 6
        },
        {
          name: "Микровейв",
          icon: "🍽️",
          count: 9
        },
        {
          name: "Кофе машин",
          icon: "☕",
          count: 7
        }
      ]
    }
  ]

  // Set car category as selected by default
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const handleCategoryClick = (category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(category)
    }
  }

  const handleSubcategoryClick = (subcategory) => {
    console.log("Selected subcategory:", subcategory)
    // You can add navigation or filtering logic here
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        
        {/* Main Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
                selectedCategory?.id === category.id ? 'scale-105' : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <div 
                className={`relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
                  selectedCategory?.id === category.id 
                    ? 'bg-[#131316]' 
                    : 'bg-[#F4F4F5] hover:bg-[#131316]'
                }`}
              >
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={40}
                  height={40}
                  className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 transition-all duration-200 ${
                    selectedCategory?.id === category.id 
                      ? 'filter brightness-0 invert saturate-0' 
                      : ''
                  }`}
                />
                <div className={`absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  selectedCategory?.id === category.id 
                    ? 'bg-white text-[#131316]' 
                    : 'bg-[#131316] text-white'
                }`}>
                  {category.count}
                </div>
              </div>
              <span className={`text-xs sm:text-sm font-medium mt-2 text-center transition-colors duration-200 ${
                selectedCategory?.id === category.id 
                  ? 'text-[#131316]' 
                  : 'text-gray-700'
              }`}>
                {category.name}
              </span>
            </div>
          ))}
        </div>

        {/* Subcategories */}
        {selectedCategory && (
          <div className="border-t pt-4 sm:pt-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <h4 className="text-sm sm:text-base text-blue-600 font-medium">
                {selectedCategory.name} - ({selectedCategory.subcategories.length} дэд ангилал)
              </h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
              {selectedCategory.subcategories.map((subcategory, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 cursor-pointer p-2 sm:p-3 rounded-lg transition-all duration-200 hover:text-[#FF4405]"
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-lg sm:text-xl flex-shrink-0">{subcategory.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs sm:text-sm text-blue-600 font-medium break-words leading-tight">{subcategory.name}</span>
                    <div className="text-xs text-gray-500 mt-1">{subcategory.count} items</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
