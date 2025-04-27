
import { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Home,
  Gift,
  FileText,
  LogOut,
  User,
  CreditCard,
  Copy,
  ShoppingCart,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import ProfileDialog from '@/components/dialogs/ProfileDialog';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    if (user?.role === 'admin') {
      return [
        { icon: Home, label: 'Home', path: '/dashboard' },
        { icon: Gift, label: 'Gift Inventory', path: '/dashboard/inventory' },
        { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
      ];
    } else if (user?.role === 'employee') {
      return [
        { icon: Home, label: 'Home', path: '/dashboard' },
        { icon: CreditCard, label: 'New Card', path: '/dashboard/new-card' },
        { icon: Copy, label: 'Duplicate Card', path: '/dashboard/duplicate-card' },
        { icon: ShoppingCart, label: 'Redemption', path: '/dashboard/redemption' },
        { icon: FileText, label: 'Gift Reports', path: '/dashboard/gift-report' },
        { icon: FileText, label: 'Reports', path: '/dashboard/reports' }, // Added Reports page
      ];
    } else {
      return [
        { icon: Home, label: 'Home', path: '/dashboard' },
        { icon: CreditCard, label: 'New Card', path: '/dashboard/new-card' },
        { icon: Copy, label: 'Duplicate Card', path: '/dashboard/duplicate-card' },
        { icon: ShoppingCart, label: 'Redemption', path: '/dashboard/redemption' },
        { icon: Gift, label: 'Gift Inventory', path: '/dashboard/inventory' },
        { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="bg-white/80 backdrop-blur-sm">
          <SidebarContent>
            <SidebarGroup>
              <div className="p-4">
                <div className="flex justify-center w-full mb-4">
                  <img 
                    src="/lovable-uploads/5c4d73ad-6bdc-4bb7-b7b1-6bca1085a894.png" 
                    alt="hhp logo" 
                    className="w-36 h-auto"
                  />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
              </div>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.path}
                      >
                        <Link to={item.path} className="flex items-center gap-3 text-lg font-medium">
                          <item.icon className="w-6 h-6" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <header className="h-16 border-b flex items-center justify-between px-6 bg-white/80 backdrop-blur-sm shadow-sm">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-semibold text-primary">
                {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  <DropdownMenuItem 
                    className="flex items-center cursor-pointer" 
                    onClick={() => setIsProfileOpen(true)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="bg-gray-50 h-[calc(100vh-4rem)] overflow-auto p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
      
      {user && (
        <ProfileDialog 
          open={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
          user={user}
        />
      )}
    </SidebarProvider>
  );
};

export default DashboardLayout;
