
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input 
              type="search" 
              placeholder="Search by customer name, phone, or ID..." 
              className="max-w-sm"
            />
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Card Number</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Gifts Redeemed</TableHead>
                  <TableHead>Points Consumed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>+1234567890</TableCell>
                  <TableCell>CUST001</TableCell>
                  <TableCell>CARD001</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>1000</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>500</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
