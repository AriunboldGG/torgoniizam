import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-white py-8 sm:py-12 lg:py-16" style={{ backgroundColor: '#131316' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Top Section */}
        <div className="text-center mb-8 sm:mb-12">
          {/* Logo */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <Image 
              src="/svg/footer-logo.svg" 
              alt="ТОРГОНЫ ЗАМ" 
              width={120}
              height={80}
              className="w-20 h-16 sm:w-32 sm:h-20 lg:w-40 lg:h-28 xl:w-48 xl:h-32 2xl:w-52 2xl:h-36"
            />
          </div>
          
          {/* Logo Text */}
          <h3 
            className="font-bold mb-3 sm:mb-4 uppercase"
            style={{
              fontFamily: 'TT Firs Neue Variable',
              fontWeight: 700,
            }}
          >
            <span className="text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile xl:text-xl-mobile 2xl:text-2xl-mobile">
              
            </span>
          </h3>
          
          {/* Main Title/Slogan */}
          <h4 
            className="font-semibold mb-6 sm:mb-8 uppercase"
            style={{
              fontFamily: 'TT Firs Neue Variable',
              fontWeight: 600,
            }}
          >
            <span className="text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile xl:text-xl-mobile">
              ДУУДЛАГА ХУДАЛДААНЫ ВЕБСАЙТ
            </span>
          </h4>
          
          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex items-center space-x-2">
              <Image 
                src="/svg/maillogo.svg" 
                alt="Email" 
                width={16}
                height={16}
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <span className="text-white text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">info@silkroad.mn</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Image 
                src="/svg/phonelogo.svg" 
                alt="Phone" 
                width={16}
                height={16}
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <span className="text-white text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">7788-9922</span>
            </div>
          </div>
          
          {/* Social Media Buttons */}
          <div className="flex justify-center space-x-3 sm:space-x-4">
            <button className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <Image 
                src="/svg/fblogo.svg" 
                alt="Facebook" 
                width={20}
                height={20}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>
            
            <button className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <Image 
                src="/svg/twlogo.svg" 
                alt="Twitter" 
                width={20}
                height={20}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>
            
            <button className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <Image 
                src="/svg/youtubelogo.svg" 
                alt="YouTube" 
                width={20}
                height={20}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>
          </div>
        </div>
        
        {/* Separator Line */}
        <div className="w-full h-px bg-gray-600 mb-6 sm:mb-8"></div>
        
        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Copyright Information */}
          <div className="text-gray-400 text-center sm:text-left">
            <p className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">© 2025 torgoniizam.mn - Зохиогчийн эрх хуулиар хамгаалагдан.</p>
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
              Үйлчилгээний нөхцөл
            </a>
            <a href="#" className="hover:text-white transition-colors text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
              Нууцлалын бодлого
            </a>
            <a href="#" className="hover:text-white transition-colors text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">
              Холбоо барих
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 