
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail, Phone, Lock, AlertTriangle, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ForgotPasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

type ResetStep = 'email' | 'otp' | 'newPassword';

const ForgotPasswordDialog = ({ open, onClose }: ForgotPasswordDialogProps) => {
  const [step, setStep] = useState<ResetStep>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const { toast } = useToast();

  const handleReset = () => {
    // Validate contact info before proceeding
    if (contactMethod === 'email' && !email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    if (contactMethod === 'phone' && !phone) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive", 
      });
      return;
    }
    
    // In a real app, this would send an OTP via email or SMS
    setStep('otp');
  };
  
  const handleVerifyOtp = () => {
    // In a real app, this would verify the OTP with a backend service
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    setStep('newPassword');
  };
  
  const handlePasswordUpdate = () => {
    // Validate password strength
    if (password.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }
    
    // Check passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would update the password via API call
    toast({
      title: "Success!",
      description: "Your password has been updated successfully.",
    });
    
    // Reset form state
    setStep('email');
    setEmail('');
    setPhone('');
    setOtp('');
    setPassword('');
    setConfirmPassword('');
    
    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === 'email' && "Reset Your Password"}
            {step === 'otp' && "Enter Verification Code"}
            {step === 'newPassword' && "Set New Password"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {step === 'email' && (
            <div className="space-y-4">
              <div className="flex space-x-2 mb-4">
                <Button 
                  type="button" 
                  variant={contactMethod === 'email' ? 'default' : 'outline'} 
                  className="flex-1"
                  onClick={() => setContactMethod('email')}
                >
                  Email
                </Button>
                <Button 
                  type="button" 
                  variant={contactMethod === 'phone' ? 'default' : 'outline'} 
                  className="flex-1"
                  onClick={() => setContactMethod('phone')}
                >
                  Phone
                </Button>
              </div>
              
              {contactMethod === 'email' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-blue-50"
                    />
                  </div>
                </div>
              )}
              
              {contactMethod === 'phone' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-blue-50"
                    />
                  </div>
                </div>
              )}
              
              <Button onClick={handleReset} className="w-full bg-amber-500 hover:bg-amber-600">
                Reset Password
              </Button>
            </div>
          )}
          
          {step === 'otp' && (
            <div className="space-y-6">
              <p className="text-center text-sm text-muted-foreground">
                Please enter the 6-digit verification code sent to your 
                {contactMethod === 'email' ? ` email (${email})` : ` phone (${phone})`}
              </p>
              
              <div className="flex justify-center py-4">
                <InputOTP 
                  maxLength={6} 
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={onClose} className="flex-1 gap-2">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleVerifyOtp} className="flex-1 gap-2 bg-amber-500 hover:bg-amber-600">
                  <Check className="h-4 w-4" />
                  Verify
                </Button>
              </div>
            </div>
          )}
          
          {step === 'newPassword' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-blue-50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-blue-50"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handlePasswordUpdate} 
                className="w-full bg-amber-500 hover:bg-amber-600"
              >
                Update Password
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
