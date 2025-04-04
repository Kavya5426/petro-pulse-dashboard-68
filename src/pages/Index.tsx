
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-2xl p-10 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-primary">CASCADE Technologies Solutions</h1>
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
