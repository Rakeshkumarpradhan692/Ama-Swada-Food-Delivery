import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Edit2 } from 'lucide-react';
import { cn } from '../utils/cn';

const Profile = () => {
  const { user } = useAuth();
  
  const activityLog = [
    { action: 'Created new order #1024', time: '2 hours ago' },
    { action: 'Updated user permissions for "John Doe"', time: 'Yesterday' },
    { action: 'Exported monthly sales report', time: '3 days ago' },
    { action: 'Login from new device', time: '1 week ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header / Cover */}
      <div className="relative h-48 w-full rounded-xl bg-gradient-to-r from-primary/80 to-blue-600/80">
        <div className="absolute -bottom-12 left-8 flex items-end">
          <div className="h-24 w-24 rounded-full border-4 border-background bg-card flex items-center justify-center text-primary shadow-xl">
            <User className="h-12 w-12" />
          </div>
          <div className="mb-2 ml-4">
            <h1 className="text-2xl font-bold text-foreground">{user?.name || 'Admin User'}</h1>
            <p className="text-sm text-muted-foreground">{user?.role?.name || 'Administrator'}</p>
          </div>
        </div>
        <div className="absolute bottom-4 right-8">
            <Button size="sm" variant="secondary">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Cover
            </Button>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {/* Personal Info */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            <Button variant="ghost" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-xs text-muted-foreground">Email Address</p>
                        <p className="text-sm font-medium">{user?.email || 'admin@example.com'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-xs text-muted-foreground">Phone Number</p>
                        <p className="text-sm font-medium">+1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">New York, USA</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-xs text-muted-foreground">Joined Date</p>
                        <p className="text-sm font-medium">Jan 15, 2024</p>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <h3 className="font-semibold mb-2">Bio</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Senior Administrator responsible for managing user roles, system configurations, and daily operations. 
                    Passionate about efficiency and clean architecture.
                </p>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-6 border-l pl-6 ml-2">
                {activityLog.map((log, index) => (
                    <div key={index} className="relative">
                        <span className={cn(
                            "absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-background",
                            index === 0 ? "bg-green-500" : "bg-muted-foreground"
                        )} />
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">{log.time}</p>
                    </div>
                ))}
            </div>
            <Button variant="link" className="w-full mt-4 text-xs">View All Activity</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
