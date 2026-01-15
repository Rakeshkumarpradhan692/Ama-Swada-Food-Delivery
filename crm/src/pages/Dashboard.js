import React, { useEffect, useState } from 'react';
import StatsCard from '../features/dashboard/StatsCard';
import ChartWidget from '../features/dashboard/ChartWidget';
import { Users, DollarSign, Activity, ShoppingBag } from 'lucide-react';
import { socket, connectSocket, joinAdminRoom, disconnectSocket } from '../services/socket';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 1250,
    revenue: 45200,
    active: 320,
    leads: 85
  });

  // Example real-time listener
  useEffect(() => {
    connectSocket();
    joinAdminRoom();

    socket.on('stats-update', (data) => {
      setStats(prev => ({ ...prev, ...data }));
    });

    socket.on('lead-created', () => {
      setStats(prev => ({ ...prev, leads: prev.leads + 1 }));
    });

    return () => {
      socket.off('stats-update');
      socket.off('lead-created');
      disconnectSocket();
    };
  }, []);

  const revenueData = [
    { name: 'Revenue', data: [31, 40, 28, 51, 42, 109, 100] }
  ];
  
  const visitorData = [
    { name: 'Visitors', data: [11, 32, 45, 32, 34, 52, 41] },
    { name: 'Leads', data: [3, 11, 21, 14, 18, 26, 22] }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Revenue" 
          value={`$${stats.revenue.toLocaleString()}`} 
          icon={DollarSign} 
          trend={12} 
        />
        <StatsCard 
          title="Active Users" 
          value={stats.users} 
          icon={Users} 
          trend={+4.5} 
        />
        <StatsCard 
          title="New Leads" 
          value={stats.leads} 
          icon={ShoppingBag} 
          trend={-2} 
        />
        <StatsCard 
          title="Active Now" 
          value={stats.active} 
          icon={Activity} 
          className="bg-primary text-primary-foreground"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <ChartWidget 
            title="Revenue Overview" 
            series={revenueData} 
            type="area" 
            height={350}
          />
        </div>
        <div className="col-span-3">
          <ChartWidget 
            title="Traffic Sources" 
            series={visitorData} 
            type="bar" 
            height={350} 
            options={{ colors: ['#3b82f6', '#f59e0b'] }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
