import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/scroll-to-top";
import DifyChatbot from "@/components/ui/dify-chatbot";
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
    default: "Торгоны зам - Онлайн дуудлага худалдааны платформ",
    template: "%s | Торгоны зам",
  },
  description: "Монголын анхны онлайн дуудлага худалдааны платформ. Машин, гар утас, компьютер болон бусад барааг онлайнаар дуудлага худалдаанд оруулах боломжтой.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: siteUrl,
    siteName: "Торгоны зам",
    title: "Торгоны зам - Онлайн дуудлага худалдааны платформ",
    description: "Монголын анхны онлайн дуудлага худалдааны платформ. Машин, гар утас, компьютер болон бусад барааг онлайнаар дуудлага худалдаанд оруулах боломжтой.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Торгоны зам - Онлайн дуудлага худалдааны платформ',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Торгоны зам - Онлайн дуудлага худалдааны платформ",
    description: "Монголын анхны онлайн дуудлага худалдааны платформ. Машин, гар утас, компьютер болон бусад барааг онлайнаар дуудлага худалдаанд оруулах боломжтой.",
    images: [`${siteUrl}/og-image.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport = {
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn" style={{ colorScheme: "light" }} suppressHydrationWarning>
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
              <DifyChatbot />
            </WalletProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 