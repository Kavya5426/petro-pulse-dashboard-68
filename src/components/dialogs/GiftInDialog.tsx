
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GiftInDialogProps {
  open: boolean;
  onClose: () => void;
}

const GiftInDialog = ({ open, onClose }: GiftInDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Gift</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="itemName">Item Name</Label>
              <Input id="itemName" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pointsNeeded">Points Needed</Label>
              <Input id="pointsNeeded" type="number" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="numberOfItems">Number of Items</Label>
              <Input id="numberOfItems" type="number" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="arrivalDate">Date of Arrival</Label>
              <Input id="arrivalDate" type="date" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GiftInDialog;
