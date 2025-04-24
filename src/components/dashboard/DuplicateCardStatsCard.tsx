
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ArrowUpRight } from 'lucide-react';
import { useStats } from './StatsContext';

const DuplicateCardStatsCard: React.FC = () => {
  const { statsData } = useStats();

  return (
    <Link to="/dashboard/duplicate-card">
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
  );
};

export default DuplicateCardStatsCard;
