import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { Button } from './Button';

const Drawer = ({ isOpen, onClose, title, children, className }) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer Content */}
      <div 
        className={cn(
          "relative z-50 h-full w-full max-w-sm border-l bg-card p-6 shadow-lg transition-transform duration-300 ease-in-out sm:max-w-md",
          className
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="h-full overflow-y-auto pb-20">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Drawer;
