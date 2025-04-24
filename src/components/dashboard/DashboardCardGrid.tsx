
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import NewCardStatsCard from './NewCardStatsCard';
import DuplicateCardStatsCard from './DuplicateCardStatsCard';
import RedemptionStatsCard from './RedemptionStatsCard';
import GiftInventoryStatsCard from './GiftInventoryStatsCard';
import ReportsStatsCard from './ReportsStatsCard';

const DashboardCardGrid: React.FC = () => {
  const { user } = useAuth();

  // Only show the dashboard cards for admin and manager
  if (user?.role !== 'admin' && user?.role !== 'manager') {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="col-span-1">
        <NewCardStatsCard />
      </div>
      
      <div className="col-span-1">
        <DuplicateCardStatsCard />
      </div>
      
      <div className="col-span-1">
        <RedemptionStatsCard />
      </div>
      
      <div className="col-span-1 sm:col-span-2">
        <GiftInventoryStatsCard />
      </div>
      
      <div className="col-span-1">
        <ReportsStatsCard />
      </div>
    </div>
  );
};

export default DashboardCardGrid;
