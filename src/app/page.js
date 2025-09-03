import HeroSearch from "@/components/home/HeroSearch";
import LiveAuctionSlider from "@/components/home/LiveAuctionSlider";
import AuctionSteps from "@/components/home/AuctionSteps";
import PendingAuctionSection from "@/components/home/PendingAuctionSection";
import CompletedAuctionSection from "@/components/home/CompletedAuctionSection";
import CategoryFilter from "@/components/auction/CategoryFilter";
import { SearchProvider } from "@/contexts/SearchContext";

export default function Home() {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Search Section */}
        <HeroSearch />

        {/* Category Filter Section */}
        <div className="container mx-auto px-4 py-8">
          <CategoryFilter />
        </div>

        {/* Live Auction Slider Section */}
        <LiveAuctionSlider />

        {/* Auction Steps Section */}
        <AuctionSteps />

        {/* Pending Auction Section */}
        <PendingAuctionSection />

        {/* Completed Auction Section */}
        <CompletedAuctionSection />
      </div>
    </SearchProvider>
  );
} 