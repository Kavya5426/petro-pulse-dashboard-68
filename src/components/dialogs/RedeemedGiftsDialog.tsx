
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

interface RedeemedGiftsDialogProps {
  open: boolean;
  onClose: () => void;
}

const RedeemedGiftsDialog = ({ open, onClose }: RedeemedGiftsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Redeemed Gifts</DialogTitle>
        </DialogHeader>
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
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>CUST001</TableCell>
              <TableCell>+1234567890</TableCell>
              <TableCell>Sample Gift 1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>100</TableCell>
              <TableCell>2024-03-18</TableCell>
              <TableCell>9</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button className="mt-4" variant="outline" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RedeemedGiftsDialog;
