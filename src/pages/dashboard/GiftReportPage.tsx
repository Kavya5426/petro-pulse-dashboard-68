
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const GiftReportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - in a real app, this would come from your backend
  const giftReports = [
    {
      customerName: "John Doe",
      customerId: "CUST001",
      phoneNumber: "1234567890",
      itemName: "Gift A",
      itemsRedeemed: 2,
      pointsConsumed: 200,
      dateOfRedemption: "2024-04-24",
      itemsRemaining: 8
    },
    // Add more sample data as needed
  ];

  const filteredReports = giftReports.filter(report => {
    const searchLower = searchTerm.toLowerCase();
    return (
      report.customerName.toLowerCase().includes(searchLower) ||
      report.customerId.toLowerCase().includes(searchLower) ||
      report.phoneNumber.includes(searchTerm) ||
      report.itemName.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Gift Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input 
              type="search" 
              placeholder="Search by customer name, ID, phone number, or item name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            
            <div className="rounded-lg border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Items Redeemed</TableHead>
                    <TableHead>Points Consumed</TableHead>
                    <TableHead>Date of Redemption</TableHead>
                    <TableHead>Items Remaining</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell>{report.customerName}</TableCell>
                      <TableCell>{report.customerId}</TableCell>
                      <TableCell>{report.phoneNumber}</TableCell>
                      <TableCell>{report.itemName}</TableCell>
                      <TableCell>{report.itemsRedeemed}</TableCell>
                      <TableCell>{report.pointsConsumed}</TableCell>
                      <TableCell>{report.dateOfRedemption}</TableCell>
                      <TableCell>{report.itemsRemaining}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GiftReportPage;
