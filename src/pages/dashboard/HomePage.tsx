import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { CreditCard, Copy, ShoppingCart, Gift, FileText, TrendingUp, ArrowUpRight } from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";

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

  // Monthly data for the charts
  const monthlyData = [
    { name: 'Jan', cards: 65, redeemed: 40, stock: 240 },
    { name: 'Feb', cards: 59, redeemed: 43, stock: 226 },
    { name: 'Mar', cards: 80, redeemed: 45, stock: 281 },
    { name: 'Apr', cards: 81, redeemed: 60, stock: 221 },
    { name: 'May', cards: 56, redeemed: 45, stock: 214 },
    { name: 'Jun', cards: 55, redeemed: 48, stock: 266 },
    { name: 'Jul', cards: 72, redeemed: 61, stock: 250 },
  ];

  // Pie chart data
  const giftDistribution = [
    { name: 'Electronics', value: 400 },
    { name: 'Kitchenware', value: 300 },
    { name: 'Toys', value: 200 },
    { name: 'Accessories', value: 278 },
    { name: 'Others', value: 189 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const chartConfig = {
    cards: { color: "#0088FE", label: "Cards Issued" },
    redeemed: { color: "#00C49F", label: "Gifts Redeemed" },
    stock: { color: "#FFBB28", label: "Gift Stock" },
    Electronics: { color: "#0088FE", label: "Electronics" },
    Kitchenware: { color: "#00C49F", label: "Kitchenware" },
    Toys: { color: "#FFBB28", label: "Toys" },
    Accessories: { color: "#FF8042", label: "Accessories" },
    Others: { color: "#8884d8", label: "Others" },
  };

  if (user?.role === 'manager' || user?.role === 'employee') {
    return (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Petro Pump Management System</h1>
        <p className="text-xl text-gray-600 mb-8">
          "Efficiency is doing things right; effectiveness is doing the right things."
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Link to="/dashboard/new-card" className="col-span-1">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full border-2 border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">New Card Stats</CardTitle>
                <CreditCard className="h-6 w-6 text-blue-500" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-48">
                  <ChartContainer config={chartConfig} className="h-full">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} />
                      <YAxis fontSize={12} axisLine={false} tickLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="cards" name="Cards Issued" fill="#0088FE" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="mt-4 grid gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <TrendingUp className="text-green-500 mr-1 h-4 w-4" />
                      Cards issued this month
                    </p>
                    <p className="text-lg font-semibold">{statsData.newCard.issuedThisMonth}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Total generated</p>
                    <p className="text-lg font-semibold">{statsData.newCard.totalGenerated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/duplicate-card" className="col-span-1">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full border-2 border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">Duplicate Card Stats</CardTitle>
                <Copy className="h-6 w-6 text-indigo-500" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-indigo-500">{statsData.duplicateCard.cardsIssued}</div>
                    <div className="text-sm text-gray-500 mt-2">Total duplicate cards issued</div>
                    <div className="mt-4 flex justify-center">
                      <div className="bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        +12% from last month
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Deduction points</p>
                    <p className="text-lg font-semibold">{statsData.duplicateCard.deductionPoints}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/redemption" className="col-span-1">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full border-2 border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">Redemption Stats</CardTitle>
                <ShoppingCart className="h-6 w-6 text-green-500" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-48">
                  <ChartContainer config={chartConfig} className="h-full">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} />
                      <YAxis fontSize={12} axisLine={false} tickLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="redeemed" name="Gifts Redeemed" stroke="#00C49F" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ChartContainer>
                </div>
                <div className="mt-4 grid gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Eligibility criteria</p>
                    <p className="text-lg font-semibold">{statsData.redemption.eligibilityCriteria}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Customers eligible</p>
                    <p className="text-lg font-semibold">{statsData.redemption.customersEligible}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/inventory" className="col-span-1 sm:col-span-2">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full border-2 border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">Gift Inventory Stats</CardTitle>
                <Gift className="h-6 w-6 text-purple-500" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64 w-full">
                  <ChartContainer config={chartConfig} className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <div className="flex flex-col sm:flex-row items-center h-full gap-4">
                        <div className="w-full sm:w-1/2 h-full">
                          <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} />
                            <YAxis fontSize={12} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="stock" name="Gift Stock" stroke="#FFBB28" strokeWidth={2} />
                          </LineChart>
                        </div>
                        <div className="w-full sm:w-1/2 h-full">
                          <PieChart>
                            <Pie
                              data={giftDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {giftDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </div>
                      </div>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/reports" className="col-span-1">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full border-2 border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-bold">Reports Stats</CardTitle>
                <FileText className="h-6 w-6 text-amber-500" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-48 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">Gift Stock</span>
                        <span className="text-sm font-medium">{statsData.report.giftStock}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">Cards Assigned</span>
                        <span className="text-sm font-medium">{statsData.report.cardsAssigned}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">Gifts Redeemed</span>
                        <span className="text-sm font-medium">{statsData.report.giftsRedeemed}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
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
