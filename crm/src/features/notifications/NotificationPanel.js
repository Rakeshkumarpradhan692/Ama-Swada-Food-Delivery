import React from 'react';
import Drawer from '../../components/common/Drawer';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

const notifications = [
  {
    id: 1,
    title: 'New Order Received',
    message: 'Order #1234 from John Doe has been placed.',
    time: '5 min ago',
    type: 'success',
    read: false,
  },
  {
    id: 2,
    title: 'Low Stock Alert',
    message: 'Item "Chicken Burger" is running low on stock.',
    time: '2 hours ago',
    type: 'warning',
    read: false,
  },
  {
    id: 3,
    title: 'System Update',
    message: 'System maintenance scheduled for tonight.',
    time: '1 day ago',
    type: 'info',
    read: true,
  },
];

const NotificationPanel = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Notifications">
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <Bell className="h-10 w-10 mb-2 opacity-20" />
            <p>No new notifications</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div 
              key={item.id} 
              className={cn(
                "p-4 rounded-lg border transition-colors hover:bg-accent/50",
                !item.read ? "bg-accent/10 border-primary/20" : "bg-card"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "mt-1 rounded-full p-1",
                  item.type === 'success' && "text-green-500 bg-green-500/10",
                  item.type === 'warning' && "text-yellow-500 bg-yellow-500/10",
                  item.type === 'info' && "text-blue-500 bg-blue-500/10",
                )}>
                  {item.type === 'success' && <CheckCircle className="h-4 w-4" />}
                  {item.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                  {item.type === 'info' && <Info className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.message}</p>
                  <span className="text-[10px] text-muted-foreground mt-2 block">{item.time}</span>
                </div>
                {!item.read && (
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Drawer>
  );
};

export default NotificationPanel;
