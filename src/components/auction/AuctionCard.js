"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AuctionCard({ auction }) {
  const {
    title,
    description,
    currentBid,
    endTime,
    bidders,
    category,
    startingBid,
    isLive = false
  } = auction;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
        {isLive && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white">
            🔴 LIVE
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-3 right-3">
          {category}
        </Badge>
        <span className="text-slate-500 text-sm">Image Placeholder</span>
      </div>

      {/* Content */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
            <CardDescription className="mt-2 line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Bid Information */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Current Bid:</span>
            <span className="text-lg font-bold text-green-600">
              ${currentBid.toLocaleString()}
            </span>
          </div>

          {/* Starting Bid */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Starting Bid:</span>
            <span className="text-sm text-slate-500">
              ${startingBid.toLocaleString()}
            </span>
          </div>

          {/* Bidders */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Bidders:</span>
            <span className="text-sm font-medium">{bidders}</span>
          </div>

          <Separator />

          {/* Action Section */}
          <div className="flex justify-between items-center">
            <span className={`text-sm font-medium ${isLive ? 'text-red-600' : 'text-orange-600'}`}>
              {isLive ? '🔴 Live Now' : endTime}
            </span>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              {isLive ? 'Place Bid' : 'View Details'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 