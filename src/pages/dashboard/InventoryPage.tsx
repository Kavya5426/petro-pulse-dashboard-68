import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import GiftInDialog from '@/components/dialogs/GiftInDialog';
import GiftStockDialog from '@/components/dialogs/GiftStockDialog';
import RedeemedGiftsDialog from '@/components/dialogs/RedeemedGiftsDialog';
import { Gift, Package, Award, Calendar, AlertCircle } from 'lucide-react';

const InventoryPage = () => {
  const [giftInOpen, setGiftInOpen] = useState(false);
  const [giftStockOpen, setGiftStockOpen] = useState(false);
  const [redeemedGiftsOpen, setRedeemedGiftsOpen] = useState(false);
  
  const inventoryStats = {
    totalItems: 50,
    lowStockItems: 3,
    lastCheckIn: "2024-04-10"
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-primary">Gift Inventory Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-blue-50 border-none shadow-sm">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-2">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">{inventoryStats.totalItems}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50 border-none shadow-sm">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-2">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold">{inventoryStats.lowStockItems}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-none shadow-sm">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-2">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">Last Check-in</p>
                <p className="text-2xl font-bold break-all text-center">{inventoryStats.lastCheckIn}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setGiftInOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105 flex gap-2"
              >
                <Gift className="w-4 h-4" />
                Gift In
              </Button>
              <Button 
                onClick={() => setGiftStockOpen(true)}
                variant="outline"
                className="hover:bg-gray-100 transition-all transform hover:scale-105 flex gap-2"
              >
                <Package className="w-4 h-4" />
                Gift Stock
              </Button>
              <Button 
                onClick={() => setRedeemedGiftsOpen(true)}
                variant="secondary"
                className="hover:bg-gray-200 transition-all transform hover:scale-105 flex gap-2"
              >
                <Award className="w-4 h-4" />
                Redeemed Gifts
              </Button>
            </div>
            
            <div className="rounded-lg border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Number of Items</TableHead>
                    <TableHead>Date of Arrival</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Sample Gift 1</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>2024-03-18</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sample Gift 2</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>2024-03-20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sample Gift 3</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>2024-03-21</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <GiftInDialog 
        open={giftInOpen} 
        onClose={() => setGiftInOpen(false)} 
      />
      <GiftStockDialog 
        open={giftStockOpen} 
        onClose={() => setGiftStockOpen(false)} 
      />
      <RedeemedGiftsDialog 
        open={redeemedGiftsOpen} 
        onClose={() => setRedeemedGiftsOpen(false)} 
      />
    </div>
  );
};

export default InventoryPage;
