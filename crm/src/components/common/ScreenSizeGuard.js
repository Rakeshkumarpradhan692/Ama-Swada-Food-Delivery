import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

const ScreenSizeGuard = ({ children }) => {
  const [deviceType, setDeviceType] = useState('desktop');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const checkScreenSize = () => {
      const w = window.innerWidth;
      setWidth(w);
      
      if (w < 768) {
        setDeviceType('mobile');
      } else if (w < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Initial check
    checkScreenSize();

    // Listener
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (deviceType !== 'desktop') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center text-foreground">
        <div className="mb-8 rounded-full bg-destructive/10 p-6 text-destructive animate-pulse">
            {deviceType === 'mobile' ? (
              <Smartphone className="h-16 w-16" />
            ) : (
              <Tablet className="h-16 w-16" />
            )}
        </div>
        <h1 className="mb-4 text-3xl font-bold">
          {deviceType === 'mobile' ? 'Mobile Device Detected' : 'Tablet Device Detected'}
        </h1>
        <p className="max-w-md text-muted-foreground mb-4">
          To ensure the best experience and functionality, this CRM Admin Panel is optimized for 
          <span className="font-semibold text-foreground"> Laptops and Desktops</span> only.
        </p>
        <div className="flex items-center gap-2 rounded-lg border bg-card p-4 text-sm font-medium">
             <Monitor className="h-5 w-5 text-primary" />
             Min Width: 1024px (Current: {width}px)
        </div>
      </div>
    );
  }

  return children;
};

export default ScreenSizeGuard;
