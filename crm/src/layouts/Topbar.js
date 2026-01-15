import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Bell, User } from 'lucide-react';
import { Button } from '../components/common/Button';
import NotificationPanel from '../features/notifications/NotificationPanel';
import Breadcrumbs from '../components/common/Breadcrumbs';

const Topbar = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-card px-6">
        <div className="flex flex-col justify-center">
          <Breadcrumbs />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <div className="relative">
            <Button variant="ghost" size="icon" onClick={() => setIsNotificationOpen(true)}>
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
            </Button>
          </div>

          <Link to="/profile" className="flex items-center gap-3 pl-4 border-l hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <User className="h-4 w-4" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role?.name || user?.role || 'Staff'}</p>
            </div>
          </Link>
        </div>
      </header>

      <NotificationPanel 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />
    </>
  );
};

export default Topbar;
