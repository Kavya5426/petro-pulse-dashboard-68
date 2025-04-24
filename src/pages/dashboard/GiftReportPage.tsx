
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface GiftReport {
  id: string;
  customerName: string;
  customerId: string;
  phoneNumber: string;
  itemName: string;
  itemsRedeemed: number;
  pointsConsumed: number;
  dateOfRedemption: string;
  itemsRemaining: number;
}

const GiftReportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for demonstration
  const reportData: GiftReport[] = [
    {
      id: '1',
      customerName: 'John Doe',
      customerId: 'CUST001',
      phoneNumber: '9876543210',
      itemName: 'Water Bottle',
      itemsRedeemed: 2,
      pointsConsumed: 200,
      dateOfRedemption: '2025-04-20',
      itemsRemaining: 18
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      customerId: 'CUST002',
      phoneNumber: '8765432109',
      itemName: 'Coffee Mug',
      itemsRedeemed: 1,
      pointsConsumed: 150,
      dateOfRedemption: '2025-04-19',
      itemsRemaining: 9
    },
    {
      id: '3',
      customerName: 'Robert Johnson',
      customerId: 'CUST003',
      phoneNumber: '7654321098',
      itemName: 'Keychain',
      itemsRedeemed: 5,
      pointsConsumed: 100,
      dateOfRedemption: '2025-04-18',
      itemsRemaining: 15
    },
    {
      id: '4',
      customerName: 'Sarah Williams',
      customerId: 'CUST004',
      phoneNumber: '6543210987',
      itemName: 'Tote Bag',
      itemsRedeemed: 3,
      pointsConsumed: 300,
      dateOfRedemption: '2025-04-17',
      itemsRemaining: 7
    },
    {
      id: '5',
      customerName: 'Michael Brown',
      customerId: 'CUST005',
      phoneNumber: '5432109876',
      itemName: 'T-Shirt',
      itemsRedeemed: 2,
      pointsConsumed: 400,
      dateOfRedemption: '2025-04-16',
      itemsRemaining: 28
    }
  ];
  
  // Filter data based on search term
  const filteredData = reportData.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.customerName.toLowerCase().includes(searchLower) ||
      item.customerId.toLowerCase().includes(searchLower) ||
      item.phoneNumber.includes(searchTerm) ||
      item.itemName.toLowerCase().includes(searchLower)
    );
  });
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Gift Redemption Report</h1>
      
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search by customer name, ID, phone number, or item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>
      
      {/* Report table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Redeemed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.customerId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.itemName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.itemsRedeemed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.pointsConsumed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.dateOfRedemption}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.itemsRemaining}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GiftReportPage;
