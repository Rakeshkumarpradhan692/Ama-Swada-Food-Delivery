import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import UsersPage from './pages/Users';
import ScreenSizeGuard from './components/common/ScreenSizeGuard';

// A simple placeholder for protected route logic if strict mode required
const ProtectedRoute = ({ children }) => {
  // In a real app, check auth state here
  return children; 
};

// Placeholder Components for new tabs
const PlaceholderPage = ({ title }) => (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">
            Content for {title} coming soon...
        </div>
    </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        {/* <ScreenSizeGuard> */}
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                
                {/* Feature Placeholders */}
                <Route path="orders" element={<PlaceholderPage title="Orders Management" />} />
                <Route path="analytics" element={<PlaceholderPage title="Analytics & Reports" />} />
                <Route path="inventory" element={<PlaceholderPage title="Inventory Management" />} />
                <Route path="messages" element={<PlaceholderPage title="Messages" />} />
                
                <Route path="users" element={<UsersPage />} />
                <Route path="settings" element={<PlaceholderPage title="Settings" />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        {/* </ScreenSizeGuard> */}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
