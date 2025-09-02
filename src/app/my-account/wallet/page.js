"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/contexts/WalletContext"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WalletPage() {
  const { walletBalance, updateBalance, resetToDefault } = useWallet() // Get dynamic wallet balance
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false)
  const [isRechargeDialogOpen, setIsRechargeDialogOpen] = useState(false)
  const [selectedBank, setSelectedBank] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")

  // Custom styles for better dropdown visibility
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .select-dropdown-fix {
        z-index: 9999 !important;
        max-height: 300px !important;
        overflow-y: auto !important;
        background: white !important;
      }
      .select-dropdown-fix [data-radix-select-viewport] {
        max-height: 300px !important;
        overflow-y: auto !important;
        background: white !important;
      }
      .select-dropdown-fix [data-radix-select-item] {
        background: white !important;
        border-bottom: 1px solid #f3f4f6 !important;
      }
      .select-dropdown-fix [data-radix-select-item]:last-child {
        border-bottom: none !important;
      }
      .select-dropdown-fix [data-radix-select-item]:hover {
        background: #fef3c7 !important;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const banks = [
    { value: "khan-bank", label: "Хаан Банк" },
    { value: "golomt-bank", label: "Голомт Банк" },
    { value: "m-bank", label: "M Банк" },
    { value: "state-bank", label: "Төрийн Банк" },
    { value: "capitron-bank", label: "Капитрон Банк" },
    { value: "bogd-bank", label: "Богд Банк" },
    { value: "arig-bank", label: "Ариг Банк" },
    { value: "xac-bank", label: "ХАС Банк" }
  ]

  const connectedAccounts = [
    // These would be populated from actual user's connected accounts
    // For demo purposes, showing empty state
  ]

  const rechargeBankAccount = {
    bank: "Хаан банк",
    accountNumber: "5040647892",
    accountName: "Торгоны зам ХХК",
    transactionPurpose: "AOjasd456as"
  }

  const handleConnectAccount = () => {
    if (!selectedBank || !accountNumber) {
      alert("Банк болон дансны дугаарыг оруулна уу")
      return
    }
    
    // Here you would typically make an API call to connect the account
    console.log("Connecting account:", { bank: selectedBank, accountNumber })
    alert("Данс амжилттай холбогдлоо!")
    setIsDialogOpen(false)
    setSelectedBank("")
    setAccountNumber("")
  }

  const handleWithdraw = () => {
    if (connectedAccounts.length === 0) {
      alert("Холбогдсон данс байхгүй байна. Эхлээд дансаа холбоно уу.")
      return
    }
    
    if (!selectedAccount || !withdrawAmount) {
      alert("Данс болон дүнгээ оруулна уу")
      return
    }
    
    const amount = parseFloat(withdrawAmount)
    if (amount < 1000) {
      alert("1000₮-өөс дээш дүнгээр таталт хийх боломжтой")
      return
    }
    
    if (amount > walletBalance) {
      alert(`Хэтэвчний үлдэгдэл хүрэлцэхгүй байна. Таны үлдэгдэл: ${walletBalance.toLocaleString()}₮`)
      return
    }
    
    // Update wallet balance
    const newBalance = walletBalance - amount
    updateBalance(newBalance)
    
    // Here you would typically make an API call to process withdrawal
    console.log("Processing withdrawal:", { account: selectedAccount, amount, newBalance })
    alert("Таталт амжилттай хийгдлээ!")
    setIsWithdrawDialogOpen(false)
    setSelectedAccount("")
    setWithdrawAmount("")
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Хуулагдлаа!")
    }).catch(() => {
      alert("Хуулахад алдаа гарлаа")
    })
  }

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
    <div className="p-3 xs-mobile:p-4 lg:p-6">
      <div className="mx-auto max-w-full sm:max-w-2xl lg:max-w-4xl">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8 text-center">ТАНЫ ПРОФАЙЛ</h1>
        
        {/* Wallet Summary Card */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-4 xs-mobile:p-6 lg:p-8 mb-6 lg:mb-8 shadow-lg">
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
            
            
            {/* Balance Title */}
            <p className="text-base lg:text-lg mb-4">Хэтэвчний үлдэгдэл</p>
            
            {/* Current Balance */}
            <div className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">{walletBalance.toLocaleString()}₮</div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 lg:gap-4 justify-center">
              {/* Temporary Reset Button - Remove this after testing */}
              <Button 
                onClick={() => {
                  resetToDefault();
                  alert("Шинэчлэх 840,000₮");
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-tt-firs-neue-variable font-medium text-sm"
              >
                🔄 Шинэчлэх 840,000₮ (Тест)
              </Button>
                             <Dialog open={isRechargeDialogOpen} onOpenChange={setIsRechargeDialogOpen}>
                 <DialogTrigger asChild>
                   <button className="bg-gray-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                     <span className="text-lg lg:text-xl">+</span>
                     <span>Цэнэглэх</span>
                   </button>
                 </DialogTrigger>
                 <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col p-3 xs-mobile:p-4 sm:p-6">
                   <DialogHeader className="flex-shrink-0">
                     <div className="flex items-center justify-between">
                       <DialogTitle className="text-xl font-bold text-gray-900">ХЭТЭВЧ ЦЭНЭГЛЭХ</DialogTitle>
                       
                     </div>
                   </DialogHeader>
                   
                   <div className="flex-1 overflow-y-auto grid gap-4 xs-mobile:gap-6 py-3 xs-mobile:py-4">
                     {/* Important Notice */}
                     <div className="bg-red-50 border border-red-200 rounded-lg p-3 xs-mobile:p-4">
                       <div className="flex items-start gap-3">
                         <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <span className="text-sm font-bold">i</span>
                         </div>
                         <div>
                           <div className="font-bold text-red-700 text-sm mb-2">САНАМЖ</div>
                           <p className="text-red-600 text-sm leading-relaxed">
                             Та гүйлгээний утга дээр нэвтрэх нэрээ оруулан, дараах банкын данс руу шилжүүлж хэтэвчээ цэнэглэнэ үү.
                           </p>
                         </div>
                       </div>
                     </div>
                     
                     {/* Bank Selection */}
                     <div className="grid gap-2">
                       <Label className="text-sm font-medium text-gray-700">Банк</Label>
                       <div className="flex items-center justify-between p-2 xs-mobile:p-3 border border-gray-300 rounded-lg bg-white">
                         <span className="text-gray-900">{rechargeBankAccount.bank}</span>
                         <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-red-500"></div>
                       </div>
                     </div>
                     
                     {/* Account Number */}
                     <div className="grid gap-2">
                       <Label className="text-sm font-medium text-gray-700">Дансны дугаар</Label>
                       <div className="flex items-center justify-between p-2 xs-mobile:p-3 border border-gray-300 rounded-lg bg-white">
                         <span className="text-gray-900 font-mono">{rechargeBankAccount.accountNumber}</span>
                         <button 
                           onClick={() => copyToClipboard(rechargeBankAccount.accountNumber)}
                           className="text-orange-500 hover:text-orange-600 p-1"
                         >
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                             <path d="M8 3a1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                             <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                           </svg>
                         </button>
                       </div>
                     </div>
                     
                     {/* Account Name */}
                     <div className="grid gap-2">
                       <Label className="text-sm font-medium text-gray-700">Дансны нэр</Label>
                       <div className="flex items-center justify-between p-2 xs-mobile:p-3 border border-gray-300 rounded-lg bg-white">
                         <span className="text-gray-900">{rechargeBankAccount.accountName}</span>
                         <button 
                           onClick={() => copyToClipboard(rechargeBankAccount.accountName)}
                           className="text-orange-500 hover:text-orange-600 p-1"
                         >
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                             <path d="M8 3a1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                             <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                           </svg>
                         </button>
                       </div>
                     </div>
                     
                     {/* Transaction Purpose */}
                     <div className="grid gap-2">
                       <Label className="text-sm font-medium text-gray-700">Гүйлгээний утга</Label>
                       <div className="flex items-center justify-between p-2 xs-mobile:p-3 border border-gray-300 rounded-lg bg-white">
                         <span className="text-gray-900">{rechargeBankAccount.transactionPurpose}</span>
                         <button 
                           onClick={() => copyToClipboard(rechargeBankAccount.transactionPurpose)}
                           className="text-orange-500 hover:text-orange-600 p-1"
                         >
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                             <path d="M8 3a1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                             <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                           </svg>
                         </button>
                       </div>
                     </div>
                   </div>
                   
                   <DialogFooter className="flex-shrink-0 flex justify-end pt-4">
                     <Button 
                       variant="outline"
                       onClick={() => setIsRechargeDialogOpen(false)}
                       className="px-6 xs-mobile:px-8"
                     >
                       ХААХ
                     </Button>
                   </DialogFooter>
                 </DialogContent>
               </Dialog>
              
                             <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
                 <DialogTrigger asChild>
                   <button className="bg-gray-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                     <span className="text-lg lg:text-xl">↓</span>
                     <span>Таталт хийх</span>
                   </button>
                 </DialogTrigger>
                 <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col p-3 xs-mobile:p-4 sm:p-6">
                   <DialogHeader className="flex-shrink-0">
                     <div className="flex items-center justify-between">
                       <DialogTitle className="text-xl font-bold text-gray-900">ТАТАЛТ ХИЙХ</DialogTitle>
                       
                     </div>
                   </DialogHeader>
                   
                   <div className="flex-1 overflow-y-auto grid gap-4 xs-mobile:gap-6 py-3 xs-mobile:py-4">
                     {/* Wallet Balance */}
                     <div className="bg-gray-50 rounded-lg p-3 xs-mobile:p-4">
                       <Label className="text-sm font-medium text-gray-700 mb-2 block">Хэтэвчний үлдэгдэл</Label>
                       <div className="text-3xl font-bold text-orange-500">{walletBalance.toLocaleString()}₮</div>
                     </div>
                     
                     {/* Account Selection */}
                     <div className="grid gap-2">
                       <Label htmlFor="withdraw-account" className="text-sm font-medium text-gray-700">
                         Данс <span className="text-red-500">*</span>
                       </Label>
                       {connectedAccounts.length > 0 ? (
                         <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                           <SelectTrigger className="w-full">
                             <SelectValue placeholder="Дансаа сонгоно уу" />
                           </SelectTrigger>
                           <SelectContent className="select-dropdown-fix max-h-[300px] z-[100] bg-white border border-gray-200 rounded-lg shadow-lg">
                             {connectedAccounts.map((account) => (
                               <SelectItem 
                                 key={account.value} 
                                 value={account.value} 
                                 className="cursor-pointer hover:bg-orange-100 py-3 px-3 bg-white border-b border-gray-100 last:border-b-0 transition-colors"
                               >
                                 <div>
                                   <div className="font-medium">{account.label}</div>
                                   <div className="text-sm text-gray-500">{account.bank}</div>
                                 </div>
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                       ) : (
                         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 xs-mobile:p-4 text-center">
                           <p className="text-yellow-700 text-sm">
                             Холбогдсон данс байхгүй байна. Эхлээд &ldquo;ДАНС ХОЛБОХ&rdquo; товчийг дарж дансаа холбоно уу.
                           </p>
                         </div>
                       )}
                     </div>
                     
                     {/* Withdrawal Amount */}
                     <div className="grid gap-2">
                       <Label htmlFor="withdraw-amount" className="text-sm font-medium text-gray-700">
                         Зарлага гаргах дүн <span className="text-red-500">*</span>
                       </Label>
                       <Input
                         id="withdraw-amount"
                         type="number"
                         placeholder="Дүнгээ оруулна уу"
                         value={withdrawAmount}
                         onChange={(e) => setWithdrawAmount(e.target.value)}
                         className="w-full text-lg"
                       />
                     </div>
                     
                     {/* Important Notice */}
                     <div className="bg-red-50 border border-red-200 rounded-lg p-3 xs-mobile:p-4">
                       <div className="flex items-start gap-3">
                         <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <span className="text-sm font-bold">i</span>
                         </div>
                         <div>
                           <div className="font-bold text-red-700 text-sm mb-2">САНАМЖ</div>
                           <p className="text-red-600 text-sm leading-relaxed">
                             Хэтэвчнээс таталт хийхдээ 1000₮-өөс дээш дүнгээр таталт хийх ба тухайн дүнгээс гүйлгээний шимтгэл 300₮-ийг суутгах болно.
                           </p>
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   <DialogFooter className="flex-shrink-0 flex justify-end pt-4">
                      <Button 
                        onClick={handleWithdraw}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 xs-mobile:px-8"
                      >
                        ТАТАЛТ ХИЙХ
                      </Button>
                    </DialogFooter>
                 </DialogContent>
               </Dialog>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className="bg-gray-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    <span className="text-lg lg:text-xl">🔗</span>
                    <span>Данс холбох</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-hidden flex flex-col p-3 xs-mobile:p-4 sm:p-6">
                  <DialogHeader className="flex-shrink-0">
                    <DialogTitle className="text-xl font-bold text-gray-900">ДАНС ХОЛБОХ</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Банкны дансаа холбохын тулд мэдээллээ оруулна уу
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="flex-1 overflow-y-auto grid gap-3 xs-mobile:gap-4 py-3 xs-mobile:py-4">
                                         <div className="grid gap-2">
                       <Label htmlFor="bank" className="text-sm font-medium text-gray-700">Банк</Label>
                       <Select value={selectedBank} onValueChange={setSelectedBank}>
                         <SelectTrigger className="w-full">
                           <SelectValue placeholder="Сонгоно уу" />
                         </SelectTrigger>
                         <SelectContent 
                           className="select-dropdown-fix max-h-[300px] z-[100] bg-white border border-gray-200 rounded-lg shadow-lg"
                           position="popper"
                           sideOffset={4}
                         >
                                                       {banks.map((bank) => (
                              <SelectItem 
                                key={bank.value} 
                                value={bank.value} 
                                className="cursor-pointer hover:bg-orange-100 py-3 px-3 bg-white border-b border-gray-100 last:border-b-0 transition-colors"
                              >
                                {bank.label}
                              </SelectItem>
                            ))}
                         </SelectContent>
                       </Select>
                     </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="account" className="text-sm font-medium text-gray-700">
                        Дансны дугаар <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="account"
                        placeholder="Дансны дугаар оруулах"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <DialogFooter className="flex-shrink-0 flex gap-3 pt-4">
                    <DialogClose asChild>
                      <Button variant="outline" className="flex-1">
                        БУЦАХ
                      </Button>
                    </DialogClose>
                    <Button 
                      onClick={handleConnectAccount}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      ХОЛБОХ
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-lg shadow-sm border p-3 xs-mobile:p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">ГҮЙЛГЭЭНИЙ мэдээлэл</h2>
          
          <div className="space-y-2 xs-mobile:space-y-3 lg:space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-2 xs-mobile:p-3 lg:p-4 border border-gray-200 rounded-lg">
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
