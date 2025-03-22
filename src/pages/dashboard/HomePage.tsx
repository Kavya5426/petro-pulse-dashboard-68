
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { CreditCard, Copy, ShoppingCart, Gift, FileText } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  if (user?.role === 'manager') {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Petro Pump Management System</h1>
        <p className="text-xl text-gray-600 mb-8">
          "Efficiency is doing things right; effectiveness is doing the right things."
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/dashboard/new-card">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">New Card</CardTitle>
                <CreditCard className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Register new customers and issue cards</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/duplicate-card">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">Duplicate Card</CardTitle>
                <Copy className="h-5 w-5 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Create duplicate cards for existing customers</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/redemption">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">Redemption</CardTitle>
                <ShoppingCart className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage customer points and gift redemptions</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/inventory">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">Gift Inventory</CardTitle>
                <Gift className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage gift stock and inventory</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/reports">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">Reports</CardTitle>
                <FileText className="h-5 w-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View customer reports and analytics</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    );
  }
  
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
