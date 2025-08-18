"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  // Mock user data
  const userStats = {
    totalBids: 47,
    activeBids: 8,
    wonAuctions: 12,
    totalSpent: 15420,
    watchlist: 23
  };

  const recentActivity = [
    {
      id: 1,
      type: "bid",
      item: "Vintage Rolex Submariner",
      amount: 8500,
      time: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      type: "won",
      item: "Antique Persian Rug",
      amount: 3200,
      time: "1 day ago",
      status: "completed"
    },
    {
      id: 3,
      type: "outbid",
      item: "Signed Baseball Collection",
      amount: 1600,
      time: "3 days ago",
      status: "outbid"
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "bid": return "💰";
      case "won": return "🏆";
      case "outbid": return "😔";
      default: return "📋";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active": return <Badge variant="default">Active</Badge>;
      case "completed": return <Badge variant="secondary">Completed</Badge>;
      case "outbid": return <Badge variant="destructive">Outbid</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here&apos;s what&apos;s happening with your auctions.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{userStats.totalBids}</div>
                <div className="text-sm text-slate-600">Total Bids</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{userStats.activeBids}</div>
                <div className="text-sm text-slate-600">Active Bids</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{userStats.wonAuctions}</div>
                <div className="text-sm text-slate-600">Won Auctions</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">${userStats.totalSpent.toLocaleString()}</div>
                <div className="text-sm text-slate-600">Total Spent</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{userStats.watchlist}</div>
                <div className="text-sm text-slate-600">Watchlist</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest bids and auction activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                        <div>
                          <div className="font-medium text-slate-900">{activity.item}</div>
                          <div className="text-sm text-slate-600">
                            ${activity.amount.toLocaleString()} • {activity.time}
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(activity.status)}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  🔍 Browse Auctions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💰 Place a Bid
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📝 Create Auction
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  ⭐ View Watchlist
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📊 View Reports
                </Button>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Verification</span>
                    <Badge variant="default">Verified ✓</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Payment Method</span>
                    <Badge variant="secondary">Credit Card</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Member Since</span>
                    <span className="text-sm text-slate-900">March 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 