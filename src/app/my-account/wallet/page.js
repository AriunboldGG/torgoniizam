"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/contexts/WalletContext"
import { fetchWithAuth } from "@/lib/api"
import {
  MdArrowDownward,
  MdArrowUpward,
  MdAccountBalanceWallet,
  MdLock,
  MdLockOpen,
  MdGavel,
  MdShoppingBag,
  MdCardGiftcard,
} from "react-icons/md"
import { CiWallet } from "react-icons/ci"
import { MdOutlineAccountBalance, MdDeleteOutline } from "react-icons/md"
import { PiHandWithdraw } from "react-icons/pi"
import { TbDeviceDesktopUp } from "react-icons/tb"
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
  const { walletBalance, heldBalance, isLoadingBalance, refetchBalance } = useWallet()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false)
  const [isRechargeDialogOpen, setIsRechargeDialogOpen] = useState(false)
  const [isLinkedAccountsOpen, setIsLinkedAccountsOpen] = useState(false)
  const [deletingAccountId, setDeletingAccountId] = useState(null)
  const [settingDefaultId, setSettingDefaultId] = useState(null)
  const [selectedBank, setSelectedBank] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false)
  const [isConnectLoading, setIsConnectLoading] = useState(false)
  const [isDefault, setIsDefault] = useState(false)
  const [banks, setBanks] = useState([])
  const [connectedAccounts, setConnectedAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)
  const [topupId, setTopupId] = useState("")

  // Fetch real-time balance every time this page is visited
  useEffect(() => {
    refetchBalance()
  }, [])

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetchWithAuth("/api/bank/list")
        const data = await response.json()
        const list = data?.data ?? data
        if (Array.isArray(list)) {
          setBanks(list.map((b) => ({ value: b.id, label: b.name ?? b.bank_name ?? b.label })))
        }
      } catch (error) {
        console.error("Failed to fetch banks:", error)
      }
    }

    const fetchAccounts = async () => {
      try {
        const response = await fetchWithAuth("/api/account/list")
        const data = await response.json()
        const list = data?.data ?? data
        if (Array.isArray(list)) {
          setConnectedAccounts(
            list.map((a) => ({
              value: String(a.id),
              label: a.account_no,
              bank: a.bank?.value ?? a.bank?.name ?? a.bank_name ?? "",
              iban: a.iban ?? "",
              is_default: a.is_default ?? false,
            }))
          )
        }
      } catch (error) {
        console.error("Failed to fetch accounts:", error)
      }
    }

    const fetchTransactions = async () => {
      try {
        const response = await fetchWithAuth("/api/wallet/transactions")
        const data = await response.json()
        const list = data?.results ?? data?.data ?? data
        if (Array.isArray(list)) {
          setTransactions(list)
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error)
      } finally {
        setIsLoadingTransactions(false)
      }
    }

    const fetchTopupId = async () => {
      try {
        const response = await fetchWithAuth("/api/auth/userinfo")
        const data = await response.json()
        const user = data?.data ?? data
        if (user?.topup_id) {
          setTopupId(user.topup_id)
        }
      } catch (error) {
        console.error("Failed to fetch topup_id:", error)
      }
    }

    fetchBanks()
    fetchAccounts()
    fetchTransactions()
    fetchTopupId()
  }, [])

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

  const rechargeBankAccount = {
    bank: "Хаан банк",
    accountNumber: "5570150867",
    accountName: "ТОРГОНЫ ЗАМЫН ДУУДЛАГА",
    transactionPurpose: topupId
  }

  const handleConnectAccount = async () => {
    if (!selectedBank || !accountNumber) {
      alert("Банк болон дансны дугаарыг оруулна уу")
      return
    }
    setIsConnectLoading(true)
    try {
      const response = await fetchWithAuth("/api/account/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bank: Number(selectedBank), account_no: accountNumber, is_default: connectedAccounts.length === 0 ? true : isDefault }),
      })
      const data = await response.json()
      if (!response.ok) {
        console.error("Connect account error:", { status: response.status, data })
        alert(data?.msg || "Данс холбоход алдаа гарлаа. Дахин оролдоно уу.")
        return
      }
      alert(data?.message ?? data?.detail ?? "Данс амжилттай холбогдлоо!")
      // Refresh connected accounts
      const res = await fetchWithAuth("/api/account/list")
      const d = await res.json()
      const lst = d?.data ?? d
      if (Array.isArray(lst)) {
        setConnectedAccounts(lst.map((a) => ({ value: String(a.id), label: a.account_no, bank: a.bank?.value ?? a.bank?.name ?? a.bank_name ?? "", iban: a.iban ?? "", is_default: a.is_default ?? false })))
      }
      setIsDialogOpen(false)
      setSelectedBank("")
      setAccountNumber("")
      setIsDefault(false)
    } catch (error) {
      console.error("Connect account error:", error)
      alert("Серверт холбогдоход алдаа гарлаа. Дахин оролдоно уу.")
    } finally {
      setIsConnectLoading(false)
    }
  }

  const handleWithdraw = async () => {
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
      alert(`Дэнчингийн үлдэгдэл хүрэлцэхгүй байна. Таны үлдэгдэл: ${walletBalance.toLocaleString()}₮`)
      return
    }
    setIsWithdrawLoading(true)
    try {
      const response = await fetchWithAuth("/api/wallet/withdraw/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bank_account: selectedAccount, amount: String(amount) }),
      })
      const data = await response.json()
      
      if (!response.ok) {
        alert(data?.msg || "Таталт хийхэд алдаа гарлаа. Дахин оролдоно уу.")
        return
      }
      
      alert(data?.msg ?? "Таталтын хүсэлт амжилттай илгээгдлээ!")
      setIsWithdrawDialogOpen(false)
      setSelectedAccount("")
      setWithdrawAmount("")
      refetchBalance()
    } catch (error) {
      alert("Серверт холбогдоход алдаа гарлаа. Дахин оролдоно уу.")
    } finally {
      setIsWithdrawLoading(false)
    }
  }

  const handleSetDefault = async (accountId) => {
    setSettingDefaultId(accountId)
    try {
      const response = await fetchWithAuth(`/api/account/default/${accountId}`)
      const data = await response.json()
      if (!response.ok) {
        alert(data?.detail || data?.msg || "Үндсэн данс тохируулахад алдаа гарлаа.")
        return
      }
      setConnectedAccounts((prev) =>
        prev.map((a) => ({ ...a, is_default: a.value === String(accountId) }))
      )
    } catch {
      alert("Серверт холбогдоход алдаа гарлаа.")
    } finally {
      setSettingDefaultId(null)
    }
  }

  const handleDeleteAccount = async (accountId) => {
    if (!confirm("Энэ дансыг устгах уу?")) return
    setDeletingAccountId(accountId)
    try {
      const response = await fetchWithAuth(`/api/account/delete?id=${accountId}`, {
        method: "DELETE",
      })
      const data = await response.json()
      console.log("Delete account response:", { status: response.status, data })
      if (!response.ok) {
        alert(data?.msg || "Данс устгахад алдаа гарлаа.")
        return
      }
      setConnectedAccounts((prev) => prev.filter((a) => a.value !== accountId))
      alert(data?.data?.msg || data?.msg || "Данс амжилттай устгагдлаа.")
    } catch {
      alert("Серверт холбогдоход алдаа гарлаа.")
    } finally {
      setDeletingAccountId(null)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Хуулагдлаа!")
    }).catch(() => {
      alert("Хуулахад алдаа гарлаа")
    })
  }


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
            <p className="text-base lg:text-lg mb-4">Дэнчингийн үлдэгдэл</p>
            
            {/* Current Balance */}
            <div className="text-3xl lg:text-5xl font-bold mb-2">
              {isLoadingBalance
                ? <span className="inline-block w-48 h-10 lg:h-14 bg-white/20 rounded-lg animate-pulse" />
                : `${walletBalance.toLocaleString()}₮`}
            </div>

            {/* Held Balance */}
            {heldBalance > 0 && (
              <p className="text-sm text-orange-100 mb-6 lg:mb-8">
                Дэнчинд байршуулсан: {heldBalance.toLocaleString()}₮
              </p>
            )}
            {heldBalance === 0 && <div className="mb-6 lg:mb-8" />}
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 lg:gap-4 justify-center">
                             <Dialog open={isRechargeDialogOpen} onOpenChange={setIsRechargeDialogOpen}>
                 <DialogTrigger asChild>
                   <button className="bg-gray-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                     <TbDeviceDesktopUp className="text-xl lg:text-2xl" />
                     <span>Дэнчин цэнэглэх</span>
                   </button>
                 </DialogTrigger>
                 <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col p-3 xs-mobile:p-4 sm:p-6">
                   <DialogHeader className="flex-shrink-0">
                     <div className="flex items-center justify-between">
                       <DialogTitle className="text-xl font-bold text-gray-900">ДЭНЧИН ЦЭНЭГЛЭХ</DialogTitle>
                       
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
                             Та гүйлгээний утга дээрх кодыг оруулан, доорх банкны данс руу мөнгөн дүнгээ шилжүүлснээр таны дэнчин автоматаар цэнэглэгдэх болно.
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

                     {/* IBAN */}
                     <div className="grid gap-2">
                       <Label className="text-sm font-medium text-gray-700">IBAN</Label>
                       <div className="flex items-center justify-between p-2 xs-mobile:p-3 border border-gray-300 rounded-lg bg-white">
                         <span className="text-gray-900 font-mono">61000500</span>
                         <button
                           onClick={() => copyToClipboard("61000500")}
                           className="text-orange-500 hover:text-orange-600 text-sm font-medium px-1"
                         >
                           Хуулах
                         </button>
                       </div>
                     </div>
                     
                     {/* Account Number */}
                     <div className="grid gap-2">
                       <Label className="text-sm font-medium text-gray-700">Дансны дугаар</Label>
                       <div className="flex items-center justify-between p-2 xs-mobile:p-3 border border-gray-300 rounded-lg bg-white">
                         <span className="text-gray-900 font-mono">{rechargeBankAccount.accountNumber}</span>
                         <button 
                           onClick={() => copyToClipboard(rechargeBankAccount.accountNumber)}
                           className="text-orange-500 hover:text-orange-600 text-sm font-medium px-1"
                         >
                           Хуулах
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
                           className="text-orange-500 hover:text-orange-600 text-sm font-medium px-1"
                         >
                           Хуулах
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
                           className="text-orange-500 hover:text-orange-600 text-sm font-medium px-1"
                         >
                           Хуулах
                         </button>
                       </div>
                     </div>

                   </div>

                   <DialogFooter className="flex-shrink-0 flex justify-end pt-4">
                     <Button
                       onClick={() => setIsRechargeDialogOpen(false)}
                       className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                     >
                       ХААХ
                     </Button>
                   </DialogFooter>
                 </DialogContent>
               </Dialog>
              
                             <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
                 <DialogTrigger asChild>
                   <button className="bg-gray-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                     <PiHandWithdraw className="text-xl lg:text-2xl" />
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
                       <Label className="text-sm font-medium text-gray-700 mb-2 block">Дэнчингийн үлдэгдэл</Label>
                       <div className="text-3xl font-bold text-orange-500">{walletBalance.toLocaleString()}₮</div>
                     </div>
                     
                     {/* Account Selection */}
                     <div className="grid gap-2">
                       <Label htmlFor="withdraw-account" className="text-sm font-medium text-gray-700">
                         Данс <span className="text-red-500">*</span>
                       </Label>
                       {connectedAccounts.length > 0 ? (
                         <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                           <SelectTrigger className="w-full [&>span]:line-clamp-none [&>span]:whitespace-normal [&>span]:break-all">
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
                             Дэнчингээс таталт хийхдээ 1000₮-өөс дээш дүнгээр таталт хийх ба тухайн дүнгээс гүйлгээний шимтгэл 300₮-ийг суутгах болно.
                           </p>
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   <DialogFooter className="flex-shrink-0 flex justify-end pt-4">
                      <Button 
                        onClick={handleWithdraw}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 xs-mobile:px-8"
                        disabled={isWithdrawLoading}
                      >
                        {isWithdrawLoading ? "Илгээж байна..." : "ТАТАЛТ ХИЙХ"}
                      </Button>
                    </DialogFooter>
                 </DialogContent>
               </Dialog>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className="bg-gray-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    <CiWallet className="text-xl lg:text-2xl" />
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
                              value={String(bank.value)}
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

                    {connectedAccounts.length > 0 && (
                      <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <input
                          id="is-default"
                          type="checkbox"
                          checked={isDefault}
                          onChange={(e) => setIsDefault(e.target.checked)}
                          className="w-4 h-4 accent-orange-500 cursor-pointer flex-shrink-0"
                        />
                        <label htmlFor="is-default" className="text-sm font-medium text-orange-800 cursor-pointer select-none">
                          Үндсэн дансаар сонгох уу?
                        </label>
                      </div>
                    )}
                  </div>
                  
                  <DialogFooter className="flex-shrink-0 flex gap-3 pt-4">
                    <DialogClose asChild>
                      <Button variant="outline" className="flex-1" disabled={isConnectLoading}>
                        БУЦАХ
                      </Button>
                    </DialogClose>
                    <Button 
                      onClick={handleConnectAccount}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                      disabled={isConnectLoading}
                    >
                      {isConnectLoading ? "Илгээж байна..." : "ХОЛБОХ"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Linked Accounts Button */}
              <Dialog open={isLinkedAccountsOpen} onOpenChange={setIsLinkedAccountsOpen}>
                <DialogTrigger asChild>
                  <button className="bg-gray-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    <MdOutlineAccountBalance className="text-xl lg:text-2xl" />
                    <span>Холбосон данс харах</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-hidden flex flex-col p-3 xs-mobile:p-4 sm:p-6">
                  <DialogHeader className="flex-shrink-0">
                    <DialogTitle className="text-xl font-bold text-gray-900">ХОЛБОСОН ДАНС</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Таны бүртгэлтэй банкны дансуудын жагсаалт
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto py-3 xs-mobile:py-4">
                    {connectedAccounts.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <MdOutlineAccountBalance className="text-4xl mx-auto mb-3 opacity-40" />
                        <p className="text-sm">Холбогдсон данс байхгүй байна</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {connectedAccounts.map((account, idx) => (
                          <div key={account.value} className={`rounded-xl p-3 xs-mobile:p-4 ${account.is_default ? "border-2 border-orange-400 bg-orange-50" : "border border-gray-200 bg-gray-50"}`}>
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 ${account.is_default ? "bg-orange-400" : "bg-orange-100"}`}>
                                <MdOutlineAccountBalance className={`text-base ${account.is_default ? "text-white" : "text-orange-500"}`} />
                              </div>
                              <span className="font-semibold text-gray-900 text-sm flex-1">{account.bank || "Банк"}</span>
                              {account.is_default && (
                                <span className="text-xs font-semibold bg-orange-400 text-white px-2 py-0.5 rounded-full">Үндсэн данс</span>
                              )}
                              {!account.is_default && (
                                <button
                                  onClick={() => handleSetDefault(account.value)}
                                  disabled={settingDefaultId === account.value}
                                  className="text-xs font-medium text-orange-600 border border-orange-300 bg-white hover:bg-orange-50 px-2 py-0.5 rounded-full transition-colors disabled:opacity-50"
                                  title="Үндсэн данс болгох"
                                >
                                  {settingDefaultId === account.value
                                    ? <span className="w-3 h-3 border-2 border-orange-400 border-t-transparent rounded-full animate-spin inline-block" />
                                    : "Үндсэн болгох"}
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteAccount(account.value)}
                                disabled={deletingAccountId === account.value}
                                className="ml-auto p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                                title="Данс устгах"
                              >
                                {deletingAccountId === account.value
                                  ? <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin inline-block" />
                                  : <MdDeleteOutline className="text-lg" />}
                              </button>
                            </div>
                            <div className="grid gap-2 text-sm">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-500">Дансны дугаар</span>
                                <span className="font-mono font-medium text-gray-900">{account.label}</span>
                              </div>
                              {account.iban && (
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-500">IBAN</span>
                                  <span className="font-mono font-medium text-gray-900 text-xs">{account.iban}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <DialogFooter className="flex-shrink-0 pt-4">
                    <Button onClick={() => setIsLinkedAccountsOpen(false)} className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                      ХААХ
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-lg shadow-sm border p-3 xs-mobile:p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Гүйлгээний мэдээлэл</h2>
          
          <div className="space-y-2 xs-mobile:space-y-3 lg:space-y-4">
            {isLoadingTransactions ? (
              <p className="text-center text-gray-400 py-6">Уншиж байна...</p>
            ) : transactions.length === 0 ? (
              <p className="text-center text-gray-400 py-6">Гүйлгээний мэдээлэл байхгүй байна</p>
            ) : (
              transactions.map((transaction, index) => {
                const txnKey = transaction.txn_type?.key ?? transaction.type ?? ""
                const k = txnKey.toUpperCase()
                const isCredit = k.includes("TOPUP") || k === "DEPOSIT" || k.includes("RECHARGE") || k.includes("RELEASE") || k.includes("REFUND")
                const isDebit = !isCredit
                const amount = parseFloat(transaction.amount ?? 0)
                const formattedAmount = `${isDebit ? "-" : "+"}${amount.toLocaleString()}₮`
                const date = transaction.created_at
                  ? new Date(transaction.created_at).toLocaleDateString("mn-MN")
                  : ""
                const description = transaction.txn_type?.value ?? (isDebit ? "Таталт хийгдсэн" : "Дэнчин цэнэглэлт хийгдсэн")

                // Pick icon + colour by transaction type key
                const iconConfig = (() => {
                  if (k.includes("WITHDRAW"))   return { Icon: MdArrowDownward,  bg: "bg-red-500" }
                  if (k.includes("BID_HOLD"))   return { Icon: MdGavel,           bg: "bg-red-500" }
                  if (k === "TOPUP" || k === "DEPOSIT" || k.includes("TOPUP")) return { Icon: MdArrowUpward, bg: "bg-green-500" }
                  if (k.includes("PLEDGE") && !k.includes("RELEASE")) return { Icon: MdLock, bg: "bg-blue-500" }
                  if (k.includes("RELEASE") || k.includes("REFUND")) return { Icon: MdLockOpen, bg: "bg-teal-500" }
                  if (k.includes("BID") || k.includes("WIN"))  return { Icon: MdGavel, bg: "bg-purple-500" }
                  if (k.includes("PURCHASE") || k.includes("ORDER")) return { Icon: MdShoppingBag, bg: "bg-indigo-500" }
                  if (k.includes("BONUS") || k.includes("GIFT")) return { Icon: MdCardGiftcard, bg: "bg-pink-500" }
                  // default: credit = wallet icon
                  return { Icon: MdAccountBalanceWallet, bg: "bg-orange-500" }
                })()

                return (
                  <div key={transaction.id ?? index} className="flex items-center justify-between p-2 xs-mobile:p-3 lg:p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 lg:gap-4 min-w-0 flex-1">
                      <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconConfig.bg}`}>
                        <iconConfig.Icon className="text-white text-base lg:text-lg" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{description}</p>
                        <p className="text-xs lg:text-sm text-gray-500">{date}</p>
                      </div>
                    </div>
                    <span className={`font-bold text-base lg:text-lg flex-shrink-0 ml-2 ${
                      isDebit ? "text-red-500" : "text-orange-500"
                    }`}>
                      {formattedAmount}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
