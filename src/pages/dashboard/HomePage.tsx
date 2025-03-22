
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { CreditCard, Copy, ShoppingCart, Gift, FileText } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  // Stats data (would come from API in real app)
  const statsData = {
    newCard: {
      issuedThisMonth: 125,
      issuedThisYear: 1280,
      totalGenerated: 5742
    },
    redemption: {
      eligibilityCriteria: 'Min 100 points',
      customersEligible: 324,
      giftsRedeemed: 876
    },
    duplicateCard: {
      deductionPoints: 50,
      cardsIssued: 432
    },
    report: {
      giftStock: 1245,
      cardsAssigned: 3217,
      giftsRedeemed: 876
    }
  };

  // Show the same interface for both manager and employee roles
  if (user?.role === 'manager' || user?.role === 'employee') {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Petro Pump Management System</h1>
        <p className="text-xl text-gray-600 mb-8">
          "Efficiency is doing things right; effectiveness is doing the right things."
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/dashboard/new-card">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full border-2 border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">New Card Stats</CardTitle>
                <CreditCard className="h-6 w-6 text-blue-500" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-md text-muted-foreground">Cards issued this month</p>
                    <p className="text-lg font-semibold">{statsData.newCard.issuedThisMonth}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-md text-muted-foreground">Cards issued this year</p>
                    <p className="text-lg font-semibold">{statsData.newCard.issuedThisYear}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-md text-muted-foreground">Total generated</p>
                    <p className="text-lg font-semibold">{statsData.newCard.totalGenerated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/duplicate-card">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full border-2 border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">Duplicate Card Stats</CardTitle>
                <Copy className="h-6 w-6 text-indigo-500" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-md text-muted-foreground">Deduction points</p>
                    <p className="text-lg font-semibold">{statsData.duplicateCard.deductionPoints}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-md text-muted-foreground">Cards issued</p>
                    <p className="text-lg font-semibold">{statsData.duplicateCard.cardsIssued}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/redemption">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full border-2 border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">Redemption Stats</CardTitle>
                <ShoppingCart className="h-6 w-6 text-green-500" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-md text-muted-foreground">Eligibility criteria</p>
                    <p className="text-lg font-semibold">{statsData.redemption.eligibilityCriteria}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-md text-muted-foreground">Customers eligible</p>
                    <p className="text-lg font-semibold">{statsData.redemption.customersEligible}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-md text-muted-foreground">Gifts redeemed</p>
                    <p className="text-lg font-semibold">{statsData.redemption.giftsRedeemed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/inventory">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full border-2 border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">Gift Inventory Stats</CardTitle>
                <Gift className="h-6 w-6 text-purple-500" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-md text-muted-foreground">Current gift stock</p>
                    <p className="text-lg font-semibold">{statsData.report.giftStock}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/reports">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full border-2 border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">Reports Stats</CardTitle>
                <FileText className="h-6 w-6 text-amber-500" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-md text-muted-foreground">Gift stock</p>
                    <p className="text-lg font-semibold">{statsData.report.giftStock}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-md text-muted-foreground">Cards assigned</p>
                    <p className="text-lg font-semibold">{statsData.report.cardsAssigned}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-md text-muted-foreground">Gifts redeemed</p>
                    <p className="text-lg font-semibold">{statsData.report.giftsRedeemed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    );
  }
  
  // Fallback for admin or other roles
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to Petro Pump Management System</h1>
      <p className="text-xl text-gray-600">
        "Efficiency is doing things right; effectiveness is doing the right things."
      </p>
    </div>
  );
};

export default HomePage;
