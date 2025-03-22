
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole } from '@/types/auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('employee');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password, role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with background image */}
      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-r from-blue-900 to-blue-700 relative">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/4f0bc545-159c-4494-8993-951c80a4f20d.png')] bg-no-repeat bg-center bg-contain opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-7xl font-serif font-bold text-sky-300" style={{ fontFamily: 'cursive' }}>Petro Pump</h1>
            <p className="text-3xl mt-4 text-white font-semibold">Highway Petroleum</p>
          </div>
        </div>
      </div>
      
      {/* Right side with login form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-blue-700 mb-2">Welcome to BHP</h2>
          </div>
          
          <Card className="p-8 shadow-lg border-0">
            <h3 className="text-2xl font-bold text-center mb-6">Login</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username:</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="bg-blue-50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password:</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-blue-50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Role:</label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger className="bg-blue-50">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-right">
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  Forgot Password?
                </a>
              </div>
              
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">
                Login
              </Button>
              
              <Button type="button" variant="outline" className="w-full mt-4 border-amber-500 text-amber-500 hover:bg-amber-50">
                Create Account
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
