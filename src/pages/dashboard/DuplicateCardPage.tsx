
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DuplicateCardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerData, setCustomerData] = useState<any>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showCardBlock, setShowCardBlock] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  
  const resetForm = () => {
    setSearchTerm('');
    setCustomerData(null);
    setIsBlocked(false);
    setShowCardBlock(false);
    setNewCardNumber('');
    setShowSuccess(false);
  };

  const handleSearch = () => {
    if (!searchTerm) return;
    setCustomerData({
      name: 'John Doe',
      phoneNumber: '1234567890',
      customerId: 'CUST001',
      cardNumber: searchTerm,
      points: 150
    });
  };

  const handleBlockCard = () => {
    setIsBlocked(true);
    toast({
      title: "Card Blocked",
      description: "The card has been successfully blocked.",
    });
  };

  const handleGenerateNewCard = () => {
    const newNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
    setNewCardNumber(newNumber);
    setShowSuccess(true);
    toast({
      title: "New Card Generated",
      description: `New card number: ${newNumber}`,
    });
  };

  const handleDuplicate = () => {
    setShowCardBlock(true);
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Alert className="border-green-500 bg-green-50 text-green-800">
          <Check className="h-5 w-5 text-green-600" />
          <AlertTitle>Card Duplication Complete!</AlertTitle>
          <AlertDescription>
            New card has been generated successfully.<br />
            Card number: {newCardNumber}
          </AlertDescription>
        </Alert>
        <Button 
          onClick={resetForm} 
          className="w-full"
        >
          Duplicate Another Card
        </Button>
      </div>
    );
  }

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
                <Button 
                  onClick={handleSearch}
                  disabled={!searchTerm}
                >
                  Fetch Details
                </Button>
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
                
                {!showCardBlock ? (
                  <Button onClick={handleDuplicate} className="w-full mt-4">
                    Create Duplicate Card
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-4">
                        To create a duplicate card, first block the existing card:
                      </p>
                      {!isBlocked ? (
                        <Button 
                          onClick={handleBlockCard}
                          variant="destructive"
                          className="w-full"
                        >
                          Block Card {customerData.cardNumber}
                        </Button>
                      ) : (
                        <Button 
                          onClick={handleGenerateNewCard}
                          className="w-full"
                        >
                          Generate New Card
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DuplicateCardPage;
