import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="text-white py-16" style={{ backgroundColor: '#131316' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="/svg/footer-logo.svg" 
              alt="ТОРГОНЫ ЗАМ" 
              style={{ width: '200px', height: '128px' }}
            />
          </div>
          
          {/* Logo Text */}
          <h3 
            className="font-bold mb-4 uppercase"
            style={{
              fontFamily: 'TT Firs Neue Variable',
              fontWeight: 700,
            }}
          >
            <span className="text-xs-mobile sm:text-sm-mobile md:text-base-mobile lg:text-lg-mobile xl:text-xl-mobile 2xl:text-2xl-mobile">
              ТОРГОНЫ ЗАМ
            </span>
          </h3>
          
          {/* Main Title/Slogan */}
          <h4 
            className="font-semibold mb-8 uppercase"
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
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <img 
                src="/svg/maillogo.svg" 
                alt="Email" 
                className="w-5 h-5"
              />
              <span className="text-white text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">info@silkroad.mn</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <img 
                src="/svg/phonelogo.svg" 
                alt="Phone" 
                className="w-5 h-5"
              />
              <span className="text-white text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">7788-9922</span>
            </div>
          </div>
          
          {/* Social Media Buttons */}
          <div className="flex justify-center space-x-4">
            <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <img 
                src="/svg/fblogo.svg" 
                alt="Facebook" 
                className="w-6 h-6"
              />
            </button>
            
            <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <img 
                src="/svg/twlogo.svg" 
                alt="Twitter" 
                className="w-6 h-6"
              />
            </button>
            
            <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <img 
                src="/svg/youtubelogo.svg" 
                alt="YouTube" 
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
        
        {/* Separator Line */}
        <div className="w-full h-px bg-gray-600 mb-8"></div>
        
        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Copyright Information */}
          <div className="text-gray-400 mb-4 sm:mb-0">
            <p className="text-xs-mobile sm:text-sm-mobile md:text-sm lg:text-sm">© 2025 torgoniizam.mn - Зохиогчийн эрх хуулиар хамгаалагдан.</p>
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center sm:justify-end space-x-6 text-gray-400">
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