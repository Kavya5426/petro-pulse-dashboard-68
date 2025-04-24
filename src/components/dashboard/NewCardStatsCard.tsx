
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, TrendingUp } from 'lucide-react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useStats } from './StatsContext';

const NewCardStatsCard: React.FC = () => {
  const { statsData, monthlyData, chartConfig } = useStats();

  return (
    <Link to="/dashboard/new-card">
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
  );
};

export default NewCardStatsCard;
