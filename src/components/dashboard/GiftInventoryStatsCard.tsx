
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { useStats } from './StatsContext';

const GiftInventoryStatsCard: React.FC = () => {
  const { monthlyData, giftDistribution, chartColors, chartConfig } = useStats();

  return (
    <Link to="/dashboard/inventory">
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
                          <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
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
  );
};

export default GiftInventoryStatsCard;
