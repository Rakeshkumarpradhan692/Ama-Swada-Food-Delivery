import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../utils/cn';

const Breadcrumbs = ({ className }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const routeNameMap = {
    'users': 'User Management',
    'create': 'Create New',
    'profile': 'My Profile',
    'settings': 'System Settings',
    'orders': 'Orders',
    'analytics': 'Analytics',
    'inventory': 'Inventory',
    'messages': 'Messages'
  };

  return (
    <nav className={cn("flex items-center text-sm text-muted-foreground", className)}>
      <Link 
        to="/" 
        className="flex items-center hover:text-primary transition-colors"
      >
        <Home className="h-4 w-4 mr-1" />
        Dashboard
      </Link>
      
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const name = routeNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <React.Fragment key={to}>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
            
            {isLast ? (
              <span className="font-medium text-foreground">
                {name}
              </span>
            ) : (
              <Link 
                to={to} 
                className="hover:text-primary transition-colors"
              >
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
