
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift } from 'lucide-react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { useStats } from './StatsContext';

const GiftInventoryStatsCard: React.FC = () => {
  const { monthlyData, giftDistribution, chartConfig } = useStats();

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
                  <div className="w-full h-full min-h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={giftDistribution}
                        margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
                        <XAxis 
                          type="number"
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false}
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis 
                          type="category"
                          dataKey="name"
                          fontSize={10} 
                          axisLine={false} 
                          tickLine={false}
                          tick={{ fontSize: 10 }}
                          width={80}
                        />
                        <Tooltip />
                        <Bar 
                          dataKey="value" 
                          name="Quantity" 
                          fill="#8884d8" 
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
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
