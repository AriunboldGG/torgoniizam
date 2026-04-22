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
    default: "Торгоны зам - Онлайн дуудлага худалдааны вебсайт",
    template: "%s | Торгоны зам",
  },
  description: "Монголын тэргүүлэх онлайн дуудлага худалдааны платформ.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: siteUrl,
    siteName: "Торгоны зам",
    title: "Торгоны зам - Онлайн дуудлага худалдааны вебсайт",
    description: "Монголын тэргүүлэх онлайн дуудлага худалдааны платформ.",
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Торгоны зам - Онлайн дуудлага худалдааны вебсайт',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Торгоны зам - Онлайн дуудлага худалдааны вебсайт",
    description: "Монголын тэргүүлэх онлайн дуудлага худалдааны платформ.",
    images: ['/opengraph-image'],
  },
  icons: {
    icon: "/svg/header/main-logo-light.svg",
    shortcut: "/svg/header/main-logo-light.svg",
  },
};

export const viewport = {
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  const ogImageUrl = `${siteUrl}/opengraph-image`
  return (
    <html lang="en" style={{ colorScheme: "light" }} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        {/* OpenGraph — explicit tags for maximum scraper compatibility */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content="Торгоны зам" />
        <meta property="og:title" content="Торгоны зам - Онлайн дуудлага худалдааны вебсайт" />
        <meta property="og:description" content="Монголын тэргүүлэх онлайн дуудлага худалдааны платформ." />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Торгоны зам - Онлайн дуудлага худалдааны вебсайт" />
        <meta property="og:locale" content="mn_MN" />
        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Торгоны зам - Онлайн дуудлага худалдааны вебсайт" />
        <meta name="twitter:description" content="Монголын тэргүүлэх онлайн дуудлага худалдааны платформ." />
        <meta name="twitter:image" content={ogImageUrl} />
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