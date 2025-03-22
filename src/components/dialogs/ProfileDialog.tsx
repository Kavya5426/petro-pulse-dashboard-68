
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
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Briefcase, Edit2, Save } from "lucide-react";
import { User as UserType } from '@/types/auth';

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
  user: UserType;
}

const ProfileDialog = ({ open, onClose, user }: ProfileDialogProps) => {
  const [editing, setEditing] = useState(false);
  
  // Sample profile data - would come from API in real app
  const [profile, setProfile] = useState({
    name: user.username || "John Doe",
    email: "john.doe@cascade-tech.com",
    phone: "+91 9876543210",
    address: "123 Tech Park, Bengaluru, India",
    department: "Customer Relations",
    joiningDate: "01 Jan 2022",
    employeeId: "EMP" + Math.floor(1000 + Math.random() * 9000),
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Would save changes to API in real implementation
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary flex items-center gap-2">
            <User className="h-5 w-5" />
            User Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile avatar and name section */}
          <div className="flex flex-col items-center space-y-2 pt-2 pb-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
          
          {/* Profile details section */}
          <div className="space-y-4">
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                <Mail className="h-4 w-4 text-gray-500" />
                {editing ? (
                  <Input 
                    name="email" 
                    value={profile.email} 
                    onChange={handleChange} 
                  />
                ) : (
                  <p className="text-sm">{profile.email}</p>
                )}
              </div>
              
              <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                <Phone className="h-4 w-4 text-gray-500" />
                {editing ? (
                  <Input 
                    name="phone" 
                    value={profile.phone} 
                    onChange={handleChange} 
                  />
                ) : (
                  <p className="text-sm">{profile.phone}</p>
                )}
              </div>
              
              <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                <MapPin className="h-4 w-4 text-gray-500" />
                {editing ? (
                  <Input 
                    name="address" 
                    value={profile.address} 
                    onChange={handleChange} 
                  />
                ) : (
                  <p className="text-sm">{profile.address}</p>
                )}
              </div>
              
              <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                <Briefcase className="h-4 w-4 text-gray-500" />
                {editing ? (
                  <Input 
                    name="department" 
                    value={profile.department} 
                    onChange={handleChange} 
                  />
                ) : (
                  <p className="text-sm">{profile.department}</p>
                )}
              </div>
              
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="border rounded-md p-3 bg-gray-50">
                  <p className="text-xs text-gray-500">Employee ID</p>
                  <p className="font-medium">{profile.employeeId}</p>
                </div>
                <div className="border rounded-md p-3 bg-gray-50">
                  <p className="text-xs text-gray-500">Joining Date</p>
                  <p className="font-medium">{profile.joiningDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          {editing ? (
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={handleEdit} variant="outline" className="gap-2">
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
