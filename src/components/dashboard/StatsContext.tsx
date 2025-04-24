
import React, { createContext, useContext, ReactNode } from 'react';

// Define types for our stats data
export interface StatsData {
  newCard: {
    issuedThisMonth: number;
    issuedThisYear: number;
    totalGenerated: number;
  };
  redemption: {
    eligibilityCriteria: string;
    customersEligible: number;
    giftsRedeemed: number;
  };
  duplicateCard: {
    deductionPoints: number;
    cardsIssued: number;
  };
  report: {
    giftStock: number;
    cardsAssigned: number;
    giftsRedeemed: number;
  };
}

export interface ChartData {
  name: string;
  cards: number;
  redeemed: number;
  stock: number;
}

export interface GiftDistribution {
  name: string;
  value: number;
}

interface StatsContextValue {
  statsData: StatsData;
  monthlyData: ChartData[];
  giftDistribution: GiftDistribution[];
  chartColors: string[];
  chartConfig: Record<string, { color: string; label: string }>;
}

// Create a mock data provider (in a real app, this would fetch from an API)
const defaultStatsContext: StatsContextValue = {
  statsData: {
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
  },
  monthlyData: [
    { name: 'Jan', cards: 65, redeemed: 40, stock: 240 },
    { name: 'Feb', cards: 59, redeemed: 43, stock: 226 },
    { name: 'Mar', cards: 80, redeemed: 45, stock: 281 },
    { name: 'Apr', cards: 81, redeemed: 60, stock: 221 },
    { name: 'May', cards: 56, redeemed: 45, stock: 214 },
    { name: 'Jun', cards: 55, redeemed: 48, stock: 266 },
    { name: 'Jul', cards: 72, redeemed: 61, stock: 250 },
  ],
  giftDistribution: [
    { name: 'Electronics', value: 400 },
    { name: 'Kitchenware', value: 300 },
    { name: 'Toys', value: 200 },
    { name: 'Accessories', value: 278 },
    { name: 'Others', value: 189 }
  ],
  chartColors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'],
  chartConfig: {
    cards: { color: "#0088FE", label: "Cards Issued" },
    redeemed: { color: "#00C49F", label: "Gifts Redeemed" },
    stock: { color: "#FFBB28", label: "Gift Stock" },
    Electronics: { color: "#0088FE", label: "Electronics" },
    Kitchenware: { color: "#00C49F", label: "Kitchenware" },
    Toys: { color: "#FFBB28", label: "Toys" },
    Accessories: { color: "#FF8042", label: "Accessories" },
    Others: { color: "#8884d8", label: "Others" },
  }
};

const StatsContext = createContext<StatsContextValue>(defaultStatsContext);

export const useStats = () => useContext(StatsContext);

export const StatsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // In a real app, you might fetch this data from an API
  return (
    <StatsContext.Provider value={defaultStatsContext}>
      {children}
    </StatsContext.Provider>
  );
};
