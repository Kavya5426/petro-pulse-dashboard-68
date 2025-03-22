
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewCardPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to a backend
    console.log('New card form submitted');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Register New Card</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input id="customerName" placeholder="Enter customer's full name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" placeholder="Enter phone number" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerId">Customer ID</Label>
              <Input id="customerId" placeholder="Enter customer ID" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="Enter card number" />
            </div>
            
            <Button type="submit" className="w-full">
              Register New Card
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCardPage;
