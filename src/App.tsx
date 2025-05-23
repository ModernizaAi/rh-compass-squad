
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./hooks/use-theme";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeDetails from "./pages/EmployeeDetails";
import Recruitment from "./pages/Recruitment";
import JobPostingForm from "./pages/JobPostingForm";
import JobPostingDetails from "./pages/JobPostingDetails";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Performance from "./pages/Performance";
import Training from "./pages/Training";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Documents from "./pages/Documents";
import Payroll from "./pages/Payroll";
import EmployeePortal from "./pages/EmployeePortal";
import NotificationsAdmin from "./pages/NotificationsAdmin";
import PublicJobListings from "./pages/PublicJobListings";
import PublicJobDetails from "./pages/PublicJobDetails";
import AccessDenied from "./pages/AccessDenied";
import UserManagement from "./pages/UserManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Páginas públicas */}
              <Route path="/public/job-listings" element={<PublicJobListings />} />
              <Route path="/public/job/:id" element={<PublicJobDetails />} />
              
              <Route path="/auth/*" element={<Auth />} />
              <Route path="/access-denied" element={<AccessDenied />} />
              
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employees" 
                element={
                  <ProtectedRoute requiredRole="manager">
                    <Employees />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employees/new" 
                element={
                  <ProtectedRoute requiredRole="manager">
                    <EmployeeForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employees/:id" 
                element={
                  <ProtectedRoute requiredRole="manager">
                    <EmployeeDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/recruitment" 
                element={
                  <ProtectedRoute requiredRole="manager">
                    <Recruitment />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/recruitment/create" 
                element={
                  <ProtectedRoute requiredRole="manager">
                    <JobPostingForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/recruitment/job/:id" 
                element={
                  <ProtectedRoute requiredRole="manager">
                    <JobPostingDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/performance" 
                element={
                  <ProtectedRoute requiredRole="manager">
                    <Performance />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/training" 
                element={
                  <ProtectedRoute>
                    <Training />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/calendar" 
                element={
                  <ProtectedRoute>
                    <Calendar />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute requiredRole="manager">
                    <Reports />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/documents" 
                element={
                  <ProtectedRoute>
                    <Documents />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/payroll" 
                element={
                  <ProtectedRoute requiredRole="manager">
                    <Payroll />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employee-portal" 
                element={
                  <ProtectedRoute>
                    <EmployeePortal />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/notifications" 
                element={
                  <ProtectedRoute>
                    <NotificationsAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user-management" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <UserManagement />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
