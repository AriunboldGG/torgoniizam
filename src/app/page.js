import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockAuctions } from "@/data/auctions";
import HeroSearch from "@/components/home/HeroSearch";
import LiveAuctionSlider from "@/components/home/LiveAuctionSlider";
import AuctionSteps from "@/components/home/AuctionSteps";

export default function Home() {
  // Get featured auctions (first 3)
  const featuredAuctions = mockAuctions.slice(0, 3);

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