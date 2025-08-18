"use client"

import Image from "next/image";

export default function AuctionSteps() {
  const steps = [
    {
      id: 1,
      icon: "/svg/step1.svg",
      badge: "АЛХАМ 1",
      title: "БҮРТГҮҮЛЭХ",
      isActive: true
    },
    {
      id: 2,
      icon: "/svg/step2.svg",
      badge: "АЛХАМ 2",
      title: "СИСТЕМД НЭВТРЭХ",
      isActive: false
    },
    {
      id: 3,
      icon: "/svg/step3.svg",
      badge: "АЛХАМ 3",
      title: "ХЭТЭВЧ ЦЭНЭГЛЭХ",
      isActive: false
    },
    {
      id: 4,
      icon: "/svg/step4.svg",
      badge: "АЛХАМ 4",
      title: "БАРААГАА СОНГОХ",
      isActive: false
    },
    {
      id: 5,
      icon: "/svg/step5.svg",
      badge: "АЛХАМ 5",
      title: "ДЭНЧИН БАЙРШУУЛАХ",
      isActive: false
    },
    {
      id: 6,
      icon: "/svg/step6.svg",
      badge: "АЛХАМ 6",
      title: "ҮНИЙН САНАЛ ИЛГЭЭХ",
      isActive: false
    },
    {
      id: 7,
      icon: "/svg/step7.svg",
      badge: "АЛХАМ 7",
      title: "ШАЛГАРАХ",
      isActive: false
    },
    {
      id: 8,
      icon: "/svg/step8.svg",
      badge: "АЛХАМ 8",
      title: "МЭДЭГДЭЛ ХҮЛЭЭН АВАХ",
      isActive: false
    },
    {
      id: 9,
      icon: "/svg/step9.svg",
      badge: "АЛХАМ 9",
      title: "БАРААГАА ХҮЛЭЭН АВАХ",
      isActive: false
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background SVG Pattern */}
      <div className="absolute inset-0">
        <Image 
          src="/svg/steps-back.svg" 
          alt="Steps Background Pattern" 
          fill
          className="object-cover opacity-100"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo and Title */}
        <div className="mb-16">
          <div className="flex justify-center mb-8">
            <Image 
              src="/svg/white-logo.svg" 
              alt="Logo" 
              width={208}
              height={108}
              style={{ width: '208px', height: '108px' }}
            />
          </div>
          <h2 
            className="text-white font-bold uppercase"
            style={{
              fontFamily: 'TT Firs Neue Variable',
              fontWeight: 700,
            }}
          >
            <span className="text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile xl:text-xl-mobile 2xl:text-2xl-mobile 3xl:text-3xl-mobile 4xl:text-4xl-mobile 5xl:text-5xl-mobile">
              ДУУДЛАГА ХУДАЛДААНД ОРОЛЦОХ АЛХАМ
            </span>
          </h2>
        </div>

        {/* Steps Flow */}
        <div className="relative">
          {/* Steps Container */}
          <div className="flex justify-center gap-6 lg:gap-8">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Icon */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                  step.isActive 
                    ? 'bg-orange-500' 
                    : 'bg-gray-700 border-2 border-gray-500'
                }`}>
                  <Image 
                    src={step.icon} 
                    alt={`Step ${step.id}`}
                    width={28}
                    height={28}
                    className="w-7 h-7"
                  />
                </div>

                {/* Step Badge */}
                <div className="bg-orange-500 text-white px-3 py-1 rounded-lg mb-3">
                  <span 
                    className="font-bold uppercase"
                    style={{
                      fontFamily: 'TT Firs Neue Variable',
                      fontWeight: 700,
                      letterSpacing: '2.4%',
                    }}
                  >
                    <span className="text-xs-mobile sm:text-sm-mobile md:text-sm">
                      {step.badge}
                    </span>
                  </span>
                </div>

                {/* Step Title */}
                <h3 
                  className="text-white font-bold text-center max-w-[120px] leading-tight uppercase"
                  style={{
                    fontFamily: 'TT Firs Neue Variable',
                    fontWeight: 700,
                  }}
                >
                  <span className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-base">
                    {step.title}
                  </span>
                </h3>
              </div>
            ))}
          </div>

          {/* Horizontal Connection Lines */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-6 lg:gap-8">
              {steps.slice(0, -1).map((_, i) => (
                <div key={i} className="w-8 h-px border-t border-dashed border-gray-500 opacity-50"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 