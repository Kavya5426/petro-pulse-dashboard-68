
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DuplicateCardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerData, setCustomerData] = useState<any>(null);
  
  const handleSearch = () => {
    // In a real app, this would fetch data from a backend
    // For now, we'll simulate finding customer data
    setCustomerData({
      name: 'John Doe',
      phoneNumber: '1234567890',
      customerId: 'CUST001',
      cardNumber: 'CARD001',
      points: 150
    });
  };

  const handleDuplicate = () => {
    // In a real app, this would create a duplicate card
    console.log('Duplicate card created');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Duplicate Card</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="searchTerm">Enter Phone Number or Card Number</Label>
              <div className="flex gap-2">
                <Input 
                  id="searchTerm" 
                  placeholder="Enter phone number or card number" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleSearch}>Fetch Details</Button>
              </div>
            </div>
            
            {customerData && (
              <div className="space-y-4 mt-8">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Name</TableCell>
                      <TableCell>{customerData.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Phone Number</TableCell>
                      <TableCell>{customerData.phoneNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Customer ID</TableCell>
                      <TableCell>{customerData.customerId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Card Number</TableCell>
                      <TableCell>{customerData.cardNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Points</TableCell>
                      <TableCell>{customerData.points}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <Button onClick={handleDuplicate} className="w-full mt-4">
                  Create Duplicate Card
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DuplicateCardPage;
