import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { UserProvider } from "@/contexts/UserContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://torgoniizam.mn'

export const metadata = {
  title: {
    default: "Торгониизам - Онлайн дуудлага худалдааны вебсайт",
    template: "%s | Торгониизам",
  },
  description: "Монголын тэргүүлэх онлайн дуудлага худалдааны платформ. Хамгийн сайн үнээр дуусгавар дуудлага, шинэ болон хэрэглэсэн барааг дуудлагаар худалдан аваарай.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: siteUrl,
    siteName: "Торгониизам",
    title: "Торгониизам - Онлайн дуудлага худалдааны вебсайт",
    description: "Монголын тэргүүлэх онлайн дуудлага худалдааны платформ. Хамгийн сайн үнээр дуусгавар дуудлага, шинэ болон хэрэглэсэн барааг дуудлагаар худалдан аваарай.",
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Торгониизам - Онлайн дуудлага худалдааны вебсайт',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Торгониизам - Онлайн дуудлага худалдааны вебсайт",
    description: "Монголын тэргүүлэх онлайн дуудлага худалдааны платформ.",
    images: ['/opengraph-image'],
  },
  icons: {
    icon: "/svg/header/main-logo-light.svg",
    shortcut: "/svg/header/main-logo-light.svg",
  },
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <UserProvider>
            <WalletProvider>
              <Header />
              <main>
                {children}
              </main>
              <Footer />
              <ScrollToTop />
            </WalletProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 