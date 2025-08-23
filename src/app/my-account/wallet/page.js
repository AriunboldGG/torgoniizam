"use client"

import Image from "next/image"

export default function WalletPage() {
  const transactions = [
    {
      id: 1,
      type: "recharge",
      description: "Хэтэвч цэнэглэлт хийгдсэн",
      date: "2025.02.24",
      amount: "+240,000₮",
      isPositive: true
    },
    {
      id: 2,
      type: "withdrawal",
      description: "Таталт хийгдсэн",
      date: "2025.02.24",
      amount: "-200,000₮",
      isPositive: false
    },
    {
      id: 3,
      type: "withdrawal",
      description: "Таталт хийгдсэн",
      date: "2025.02.24",
      amount: "-80,000₮",
      isPositive: false
    },
    {
      id: 4,
      type: "recharge",
      description: "Хэтэвч цэнэглэлт хийгдсэн",
      date: "2025.02.24",
      amount: "+400,000₮",
      isPositive: true
    }
  ]

  return (
    <div className="p-4 lg:p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8 text-center">ТАНЫ ПРОФАЙЛ</h1>
        
        {/* Wallet Summary Card */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-6 lg:p-8 mb-6 lg:mb-8 shadow-lg">
          <div className="text-center text-white">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-3 w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center">
                <Image 
                  src="/svg/header/main-logo.svg" 
                  alt="ТОРГОНЫ ЗАМ" 
                  width={40} 
                  height={40}
                  className="w-8 h-8 lg:w-10 lg:h-10"
                />
              </div>
            </div>
            
            {/* Company Name */}
            <h2 className="text-lg lg:text-xl font-bold mb-2">ТОРГОНЫ ЗАМ</h2>
            
            {/* Balance Title */}
            <p className="text-base lg:text-lg mb-4">Хэтэвчний үлдэгдэл</p>
            
            {/* Current Balance */}
            <div className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">840,000₮</div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
              <button className="bg-gray-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <span className="text-lg lg:text-xl">+</span>
                <span>цэнэглэх</span>
              </button>
              
              <button className="bg-gray-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <span className="text-lg lg:text-xl">↓</span>
                <span>ТАТАЛТ ХИЙХ</span>
              </button>
              
              <button className="bg-gray-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <span className="text-lg lg:text-xl">🔗</span>
                <span>ДАНС ХОЛБОХ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">ГҮЙЛГЭЭНИЙ мэдээлэл</h2>
          
          <div className="space-y-3 lg:space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 lg:gap-4 min-w-0 flex-1">
                  {/* Transaction Icon */}
                  <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    transaction.isPositive ? 'bg-orange-500' : 'bg-gray-800'
                  }`}>
                    <span className="text-white text-xs lg:text-sm font-bold">
                      {transaction.isPositive ? '+' : '↓'}
                    </span>
                  </div>
                  
                  {/* Transaction Details */}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{transaction.description}</p>
                    <p className="text-xs lg:text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                
                {/* Amount */}
                <span className={`font-bold text-base lg:text-lg flex-shrink-0 ml-2 ${
                  transaction.isPositive ? 'text-orange-500' : 'text-gray-900'
                }`}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
