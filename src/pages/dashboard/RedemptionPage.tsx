
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const RedemptionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [addPointsOpen, setAddPointsOpen] = useState(false);
  const [checkGiftsOpen, setCheckGiftsOpen] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [pointsToAdd, setPointsToAdd] = useState('0');
  const [otp, setOtp] = useState('');
  
  // Sample data
  const customers = [
    { name: 'John Doe', phone: '1234567890', customerId: 'CUST001', cardNumber: 'CARD001', points: 150 },
    { name: 'Jane Smith', phone: '9876543210', customerId: 'CUST002', cardNumber: 'CARD002', points: 100 },
    { name: 'Sam Wilson', phone: '5678901234', customerId: 'CUST003', cardNumber: 'CARD003', points: 200 },
  ];
  
  const gifts = [
    { item: 'Gift A', pointsNeeded: 100 },
    { item: 'Gift B', pointsNeeded: 150 },
    { item: 'Gift C', pointsNeeded: 200 },
  ];
  
  const handleAddPoints = (customer: any) => {
    setSelectedCustomer(customer);
    setAddPointsOpen(true);
  };
  
  const handleCheckGifts = (customer: any) => {
    setSelectedCustomer(customer);
    setCheckGiftsOpen(true);
  };
  
  const handleSubmitPoints = () => {
    // In a real app, this would update points in the backend
    console.log(`Added ${pointsToAdd} points to ${selectedCustomer.name}`);
    toast.success(`Added ${pointsToAdd} points to ${selectedCustomer.name}`);
    setAddPointsOpen(false);
    setPointsToAdd('0');
  };
  
  const handleBuyGift = (gift: any) => {
    // Set the selected gift and open the OTP dialog
    setSelectedGift(gift);
    setOtpDialogOpen(true);
  };

  const handleVerifyOtp = () => {
    // In a real app, this would verify the OTP against a backend
    if (otp.length === 4) {
      // Process the redemption after OTP verification
      console.log(`${selectedCustomer.name} redeemed ${selectedGift.item}`);
      toast.success(`Successfully redeemed ${selectedGift.item}`);
      setOtpDialogOpen(false);
      setCheckGiftsOpen(false);
      setOtp('');
    } else {
      toast.error("Please enter a valid 4-digit OTP");
    }
  };
  
  const generateBill = () => {
    // In a real app, this would generate a bill
    console.log('Generating bill');
    toast.success("Bill generated successfully!");
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-primary">Customer Redemption</CardTitle>
          <Button onClick={generateBill}>Generate Bill</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input 
              placeholder="Search by name, phone, ID or card number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Card Number</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Add Points</TableHead>
                  <TableHead>Gift Eligibility</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.customerId}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.customerId}</TableCell>
                    <TableCell>{customer.cardNumber}</TableCell>
                    <TableCell>{customer.points}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAddPoints(customer)}
                      >
                        Add Points
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCheckGifts(customer)}
                      >
                        Check Gifts
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add Points Dialog */}
      <Dialog open={addPointsOpen} onOpenChange={setAddPointsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Points</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <p>Customer: {selectedCustomer.name} ({selectedCustomer.cardNumber})</p>
              <p>Initial Points: {selectedCustomer.points}</p>
              
              <div className="space-y-2">
                <Label htmlFor="points">Points to Add</Label>
                <Input 
                  id="points" 
                  type="number" 
                  value={pointsToAdd}
                  onChange={(e) => setPointsToAdd(e.target.value)}
                />
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddPointsOpen(false)}>
                  Close
                </Button>
                <Button onClick={handleSubmitPoints}>Submit</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Check Gifts Dialog */}
      <Dialog open={checkGiftsOpen} onOpenChange={setCheckGiftsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Gift Eligibility</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <p>Customer: {selectedCustomer.name} ({selectedCustomer.points} points)</p>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Points Needed</TableHead>
                    <TableHead>Eligible</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gifts.map((gift) => (
                    <TableRow key={gift.item}>
                      <TableCell>{gift.item}</TableCell>
                      <TableCell>{gift.pointsNeeded}</TableCell>
                      <TableCell>
                        {selectedCustomer.points >= gift.pointsNeeded ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleBuyGift(gift)}
                          >
                            Buy
                          </Button>
                        ) : (
                          <span className="text-red-500">Not Eligible</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setCheckGiftsOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* OTP Verification Dialog */}
      <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Please enter the 4-digit OTP sent to your registered mobile number to confirm redemption of{" "}
              {selectedGift?.item}.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input 
                id="otp" 
                maxLength={4}
                className="text-center text-xl tracking-widest"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').substring(0, 4))}
                placeholder="• • • •"
              />
            </div>
          </div>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button 
              variant="outline" 
              onClick={() => {
                setOtpDialogOpen(false);
                setOtp('');
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleVerifyOtp}>Verify</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RedemptionPage;
