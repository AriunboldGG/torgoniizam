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

export const metadata = {
  title: "AuctionHub - Bid & Win",
  description: "Your premier online auction platform for unique items and collectibles",
  icons: {
    icon: "/svg/header/main-logo.svg",
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