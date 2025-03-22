
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">Current Gift Stock</DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-auto">
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
