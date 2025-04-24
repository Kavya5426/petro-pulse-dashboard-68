
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from 'lucide-react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useStats } from './StatsContext';

const RedemptionStatsCard: React.FC = () => {
  const { statsData, monthlyData, chartConfig } = useStats();

  return (
    <Link to="/dashboard/redemption">
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
  );
};

export default RedemptionStatsCard;
