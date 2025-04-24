
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from 'lucide-react';
import { useStats } from './StatsContext';

const ReportsStatsCard: React.FC = () => {
  const { statsData } = useStats();

  return (
    <Link to="/dashboard/reports">
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
  );
};

export default ReportsStatsCard;
