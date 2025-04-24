
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/dashboard/HomePage";
import InventoryPage from "./pages/dashboard/InventoryPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import NewCardPage from "./pages/dashboard/NewCardPage";
import DuplicateCardPage from "./pages/dashboard/DuplicateCardPage";
import RedemptionPage from "./pages/dashboard/RedemptionPage";
import GiftReportPage from "./pages/dashboard/GiftReportPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<HomePage />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="new-card" element={<NewCardPage />} />
              <Route path="duplicate-card" element={<DuplicateCardPage />} />
              <Route path="redemption" element={<RedemptionPage />} />
              <Route path="gift-report" element={<GiftReportPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
