
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewCardPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    customerId: '',
    cardNumber: ''
  });
  const [otpValue, setOtpValue] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  // Generate random ID and card number on component mount
  useEffect(() => {
    // Generate a random customer ID between 10000-99999
    const randomCustomerId = Math.floor(10000 + Math.random() * 90000).toString();
    
    // Generate a random card number (8 digits)
    const randomCardNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
    
    setFormData(prev => ({
      ...prev,
      customerId: randomCustomerId,
      cardNumber: randomCardNumber
    }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate the form and send to a backend
    console.log('Form data submitted:', formData);
    // Move to OTP step
    setStep(2);
    
    // Simulate sending an OTP
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to the registered phone number.",
    });
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would verify the OTP with a backend
    console.log('OTP verification with code:', otpValue);
    
    // Show success message
    setStep(3);
    setShowSuccess(true);
    
    toast({
      title: "Success",
      description: "Card has been registered successfully!",
      variant: "default",
    });
  };

  const resetForm = () => {
    // Generate new random IDs when resetting the form
    const randomCustomerId = Math.floor(10000 + Math.random() * 90000).toString();
    const randomCardNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
    
    setFormData({
      customerName: '',
      phoneNumber: '',
      customerId: randomCustomerId,
      cardNumber: randomCardNumber
    });
    setOtpValue("");
    setStep(1);
    setShowSuccess(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {showSuccess && (
        <Alert className="mb-6 border-green-500 bg-green-50 text-green-800">
          <Check className="h-5 w-5 text-green-600" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            New card has been registered successfully.
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {step === 1 ? "Register New Card" : step === 2 ? "Verify OTP" : "Registration Complete"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form onSubmit={handleSubmitForm} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input 
                  id="customerName" 
                  placeholder="Enter customer's full name" 
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerId">Customer ID</Label>
                <Input 
                  id="customerId" 
                  placeholder="Auto-generated"
                  value={formData.customerId}
                  readOnly
                  className="bg-gray-100"
                />
                <p className="text-xs text-muted-foreground">Auto-generated customer ID</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input 
                  id="cardNumber" 
                  placeholder="Auto-generated"
                  value={formData.cardNumber}
                  readOnly
                  className="bg-gray-100"
                />
                <p className="text-xs text-muted-foreground">Auto-generated card number</p>
              </div>
              
              <Button type="submit" className="w-full">
                Register Card
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <Label htmlFor="otp">Enter Verification Code</Label>
                  <p className="text-sm text-muted-foreground">
                    A 6-digit code has been sent to your phone number
                  </p>
                </div>
                
                <InputOTP 
                  maxLength={6}
                  value={otpValue}
                  onChange={setOtpValue} 
                  className="flex justify-center gap-2"
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={otpValue.length !== 6}
              >
                Verify Code
              </Button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Card Registration Complete</h3>
                <p className="text-muted-foreground">
                  The card has been successfully registered in the system.
                </p>
              </div>
              
              <Button 
                onClick={resetForm} 
                className="w-full"
              >
                Register Another Card
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCardPage;
