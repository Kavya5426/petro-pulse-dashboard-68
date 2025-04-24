
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { StatsProvider } from '@/components/dashboard/StatsContext';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import DashboardCardGrid from '@/components/dashboard/DashboardCardGrid';

const HomePage = () => {
  const { user } = useAuth();
  const showCards = user?.role === 'admin' || user?.role === 'manager';

  return (
    <StatsProvider>
      <div className="space-y-6">
        <WelcomeBanner />
        {showCards && <DashboardCardGrid />}
      </div>
    </StatsProvider>
  );
};

export default HomePage;
