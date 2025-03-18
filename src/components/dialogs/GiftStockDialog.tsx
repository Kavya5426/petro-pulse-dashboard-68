
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
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Current Gift Stock</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Number of Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Sample Gift 1</TableCell>
              <TableCell>2024-03-18</TableCell>
              <TableCell>10</TableCell>
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

export default GiftStockDialog;
