import React from 'react';
import { Card, CardContent } from '../../components/common/Card';
import { cn } from '../../utils/cn';

const StatsCard = ({ title, value, icon: Icon, trend, className }) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
            <span className="text-2xl font-bold">
              {value}
            </span>
          </div>
          <div className={cn("p-2 rounded-full bg-primary/10", className)}>
            {Icon && <Icon className="h-6 w-6 text-primary" />}
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center text-xs">
            <span className={cn(
              "font-medium",
              trend > 0 ? "text-green-500" : "text-red-500"
            )}>
              {trend > 0 ? "+" : ""}{trend}%
            </span>
            <span className="ml-2 text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
