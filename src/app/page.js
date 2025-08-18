import HeroSearch from "@/components/home/HeroSearch";
import LiveAuctionSlider from "@/components/home/LiveAuctionSlider";
import AuctionSteps from "@/components/home/AuctionSteps";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Search Section */}
      <HeroSearch />

      {/* Live Auction Slider Section */}
      <LiveAuctionSlider />

      {/* Auction Steps Section */}
      <AuctionSteps />

      {/* Live Auction Slider Section */}
      <LiveAuctionSlider />
    </div>
  );
} 