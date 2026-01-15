import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  // In a real app, loading check is crucial here
  // if (loading) return <LoadingScreen />;
  
  // For dev purposes, if no backend, we might want to bypass or mock
  // but strictly, we redirect if no user.
  // const token = localStorage.getItem('accessToken');
  // if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen bg-background text-foreground">
        {/* Mobile drawer implementation would ideally go here with a state toggle */}
        <Sidebar className="hidden md:flex" /> 
        
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
          <footer className="border-t bg-card p-4 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Ama Swada Food Delivery. All rights reserved.
          </footer>
        </div>
    </div>
  );
};

export default DashboardLayout;
