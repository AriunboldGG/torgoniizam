"use client"

import { useState, useEffect } from "react";
import { mockAuctions } from "@/data/auctions";
import AuctionCard from "@/components/auction/AuctionCard";
import SearchFilters from "@/components/auction/SearchFilters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AuctionsPage() {
  const [auctions] = useState(mockAuctions);
  const [filteredAuctions, setFilteredAuctions] = useState(mockAuctions);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState("endingSoon");

  useEffect(() => {
    let filtered = [...auctions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(auction =>
        auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category and price filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(auction =>
        activeFilters.some(filter => 
          auction.category === filter ||
          (filter.includes("$") && checkPriceRange(auction.currentBid, filter))
        )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "endingSoon":
          return getTimeValue(a.endTime) - getTimeValue(b.endTime);
        case "priceHigh":
          return b.currentBid - a.currentBid;
        case "priceLow":
          return a.currentBid - b.currentBid;
        case "newest":
          return b.id - a.id;
        case "mostBidders":
          return b.bidders - a.bidders;
        default:
          return 0;
      }
    });

    setFilteredAuctions(filtered);
  }, [auctions, searchTerm, activeFilters, sortBy]);

  const checkPriceRange = (price, range) => {
    if (range === "Under $100") return price < 100;
    if (range === "$100 - $500") return price >= 100 && price <= 500;
    if (range === "$500 - $1,000") return price >= 500 && price <= 1000;
    if (range === "$1,000 - $5,000") return price >= 1000 && price <= 5000;
    if (range === "$5,000 - $10,000") return price >= 5000 && price <= 10000;
    if (range === "$10,000 - $50,000") return price >= 10000 && price <= 50000;
    if (range === "$50,000+") return price >= 50000;
    return true;
  };

  const getTimeValue = (timeStr) => {
    if (timeStr.includes("Live")) return 0;
    if (timeStr.includes("hours")) return parseInt(timeStr) * 60;
    if (timeStr.includes("days")) return parseInt(timeStr) * 1440;
    if (timeStr.includes("week")) return 10080;
    return 999999;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filter) => {
    if (filter.value === null) {
      setActiveFilters(prev => prev.filter(f => f !== filter.type));
    } else {
      setActiveFilters(prev => [...prev, filter.value]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchTerm("");
    setSortBy("endingSoon");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Browse Auctions
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover unique items from around the world. From luxury watches to rare collectibles, 
              find your next prized possession.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:col-span-1">
            <SearchFilters
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
            />
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-medium text-slate-700 mb-3">Sort By</h3>
              <div className="space-y-2">
                {[
                  { value: "endingSoon", label: "Ending Soon" },
                  { value: "priceHigh", label: "Price: High to Low" },
                  { value: "priceLow", label: "Price: Low to High" },
                  { value: "newest", label: "Newest First" },
                  { value: "mostBidders", label: "Most Bidders" }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sortBy"
                      value={option.value}
                      checked={sortBy === option.value}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-slate-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {filteredAuctions.length} Auctions Found
                </h2>
                {activeFilters.length > 0 && (
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm text-slate-600">Active filters:</span>
                    {activeFilters.map((filter, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {filter}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="text-sm text-slate-600">
                Showing {filteredAuctions.length} of {auctions.length} auctions
              </div>
            </div>

            {/* Auctions Grid */}
            {filteredAuctions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No auctions found
                </h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 