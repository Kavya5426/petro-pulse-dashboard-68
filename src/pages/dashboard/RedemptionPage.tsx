
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Download, Printer, X } from "lucide-react";
import { format } from "date-fns";

const RedemptionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [addPointsOpen, setAddPointsOpen] = useState(false);
  const [checkGiftsOpen, setCheckGiftsOpen] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [billDialogOpen, setBillDialogOpen] = useState(false);
  const [billPreviewOpen, setBillPreviewOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [pointsToAdd, setPointsToAdd] = useState('0');
  const [otp, setOtp] = useState('');
  const [billData, setBillData] = useState({
    openingPoints: '0',
    deductionPoints: '0',
    additionalPoints: '0',
  });
  
  const billRef = useRef<HTMLDivElement>(null);
  
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
  
  const handleBillDataChange = (field: keyof typeof billData, value: string) => {
    setBillData(prev => ({
      ...prev,
      [field]: value.replace(/[^0-9]/g, '')
    }));
  };
  
  const generateBill = () => {
    // Open bill dialog to input points
    setBillDialogOpen(true);
  };
  
  const handleSubmitBill = () => {
    setBillDialogOpen(false);
    setBillPreviewOpen(true);
  };
  
  const downloadBill = () => {
    if (billRef.current) {
      const content = billRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = content.offsetWidth * 2;
      canvas.height = content.offsetHeight * 2;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Higher resolution
        context.scale(2, 2);
        
        // Use html2canvas to convert the div to an image
        import('html2canvas').then(html2canvas => {
          html2canvas.default(content, { 
            scale: 2,
            backgroundColor: null,
            logging: false
          }).then(canvas => {
            const link = document.createElement('a');
            link.download = `loyalty-bill-${format(new Date(), 'yyyy-MM-dd')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            toast.success("Bill downloaded successfully");
          });
        });
      }
    }
  };

  const printBill = () => {
    if (billRef.current) {
      // Create a new window
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        const content = billRef.current.innerHTML;
        
        printWindow.document.write(`
          <html>
            <head>
              <title>Loyalty Bill</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                }
                .bill-container {
                  width: 400px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  background-color: white;
                }
                h1, h2 {
                  text-align: center;
                  margin-bottom: 10px;
                }
                .divider {
                  border-top: 1px solid #ddd;
                  margin: 15px 0;
                }
                .row {
                  display: flex;
                  justify-content: space-between;
                  margin: 10px 0;
                }
                @media print {
                  .no-print {
                    display: none;
                  }
                }
              </style>
            </head>
            <body>
              <div class="bill-container">
                ${content}
              </div>
              <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button onclick="window.print()">Print</button>
                <button onclick="window.close()">Close</button>
              </div>
              <script>
                window.onload = function() {
                  setTimeout(function() {
                    window.print();
                  }, 500);
                }
              </script>
            </body>
          </html>
        `);
        
        printWindow.document.close();
        toast.success("Bill sent to printer");
      }
    }
  };

  // Calculate total points
  const totalPoints = parseInt(billData.openingPoints) - parseInt(billData.deductionPoints) + parseInt(billData.additionalPoints);

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

      {/* Bill Data Dialog */}
      <Dialog open={billDialogOpen} onOpenChange={setBillDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Bill</DialogTitle>
            <DialogDescription>
              Enter the points information to generate a loyalty bill.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="openingPoints">Opening Points</Label>
              <Input 
                id="openingPoints" 
                value={billData.openingPoints}
                onChange={(e) => handleBillDataChange('openingPoints', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deductionPoints">Deduction Points</Label>
              <Input 
                id="deductionPoints" 
                value={billData.deductionPoints}
                onChange={(e) => handleBillDataChange('deductionPoints', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalPoints">Additional Points</Label>
              <Input 
                id="additionalPoints" 
                value={billData.additionalPoints}
                onChange={(e) => handleBillDataChange('additionalPoints', e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setBillDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitBill}>Generate Bill</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bill Preview Dialog */}
      <Dialog open={billPreviewOpen} onOpenChange={setBillPreviewOpen}>
        <DialogContent className="sm:max-w-[500px] p-8">
          <div ref={billRef} className="bg-white p-6 rounded-lg">
            <div className="text-center text-3xl font-bold">Loyalty Scheme</div>
            <div className="text-center text-xl font-semibold mb-4">BALAJI HIGHWAY PETROLEUM</div>
            
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm">Bill No: L{Math.floor(Math.random() * 10000)}</div>
              <div className="text-sm">Date: {format(new Date(), 'dd/MM/yyyy')}</div>
            </div>
            
            <div className="border-t border-b border-gray-300 py-2 my-3">
              <div className="flex justify-between items-center">
                <div className="font-semibold">Phone:</div>
                <div>7224554934</div>
              </div>
            </div>
            
            <div className="my-6 space-y-3">
              <div className="flex justify-between items-center">
                <div className="font-medium">Opening Points:</div>
                <div>{billData.openingPoints}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="font-medium">Deduction Points:</div>
                <div>-{billData.deductionPoints}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="font-medium">Additional Points:</div>
                <div>+{billData.additionalPoints}</div>
              </div>
            </div>
            
            <div className="border-t border-gray-300 pt-3 mt-3">
              <div className="flex justify-between items-center font-bold">
                <div>Total Points:</div>
                <div>{totalPoints}</div>
              </div>
            </div>
            
            <div className="border-t border-gray-300 pt-3 mt-6 mb-2">
              <div className="flex justify-between items-center font-bold">
                <div>Redeemable Points:</div>
                <div>{totalPoints}</div>
              </div>
            </div>
            
            <div className="mt-8 pt-4 text-center text-sm text-gray-500">
              Thank you for your business!
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-4">
            <Button 
              onClick={printBill}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button 
              onClick={downloadBill}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button 
              variant="destructive"
              onClick={() => setBillPreviewOpen(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RedemptionPage;
