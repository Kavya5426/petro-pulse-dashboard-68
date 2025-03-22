
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Package, ArrowDown } from "lucide-react";

interface GiftStockDialogProps {
  open: boolean;
  onClose: () => void;
}

const GiftStockDialog = ({ open, onClose }: GiftStockDialogProps) => {
  // Sample data - in a real app this would come from a database
  const giftStockItems = [
    { name: "Sample Gift 1", date: "2024-03-18", quantity: 10 },
    { name: "Sample Gift 2", date: "2024-03-20", quantity: 15 },
    { name: "Sample Gift 3", date: "2024-03-21", quantity: 5 },
    { name: "Sample Gift A", date: "2024-03-15", quantity: 8 },
    { name: "Sample Gift B", date: "2024-03-12", quantity: 12 },
  ];

  // Sample stock information
  const stockInfo = {
    lastCheckIn: "2024-04-10",
    nextCheckIn: "2024-04-25",
    totalItems: 50,
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">Current Gift Stock</DialogTitle>
        </DialogHeader>
        
        {/* Stock summary cards - Made more prominent */}
        <div className="grid grid-cols-3 gap-4 mb-4 mt-2">
          <Card className="bg-blue-50 shadow-md">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-2">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Last stock check-in</p>
              <p className="text-xl font-bold">{stockInfo.lastCheckIn}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 shadow-md">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-2">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Next stock check-in</p>
              <p className="text-xl font-bold">{stockInfo.nextCheckIn}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 shadow-md">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-2">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">No. of items</p>
              <p className="text-xl font-bold">{stockInfo.totalItems}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="max-h-[400px] overflow-auto border rounded-lg shadow-inner">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Number of Items</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {giftStockItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button className="mt-4" variant="outline" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default GiftStockDialog;
