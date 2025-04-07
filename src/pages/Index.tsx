
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-2xl p-10 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/154a4711-7830-4e91-a6d0-3f368433c31d.png" 
            alt="hhp logo" 
            className="h-24 w-auto"
          />
        </div>
        <p className="text-xl text-gray-600 mb-8">Petro Pump Management System</p>
        
        <div className="space-y-4">
          <Link to="/login">
            <Button size="lg" className="w-full">Login to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
