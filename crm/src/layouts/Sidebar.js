import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Settings, 
  LogOut,
  ShoppingCart,
  BarChart2,
  Package,
  MessageSquare
} from 'lucide-react';

const Sidebar = ({ className }) => {
  const { hasPermission, logout } = useAuth();

  const mainLinks = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      to: '/',
      permission: null,
    },
    {
      label: 'Orders',
      icon: ShoppingCart,
      to: '/orders',
      permission: null,
    },
    {
      label: 'Analytics',
      icon: BarChart2,
      to: '/analytics',
      permission: null,
    },
    {
      label: 'Inventory',
      icon: Package,
      to: '/inventory',
      permission: null,
    },
    {
      label: 'Users',
      icon: Users,
      to: '/users',
      permission: null,
    },
  ];

  return (
    <div className={cn("flex h-screen w-64 flex-col border-r bg-card", className)}>
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          CRM Panel
        </h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-4 overflow-y-auto">
        {mainLinks.map((link) => {
          if (link.permission && !hasPermission(link.permission)) return null;
          const Icon = link.icon;
          
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors mb-2",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )
          }
        >
          <Settings className="h-4 w-4" />
          Settings
        </NavLink>
        
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
