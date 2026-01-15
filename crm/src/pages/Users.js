import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Mail, Shield, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import Modal from '../components/common/Modal';
import CreateUserForm from '../features/users/CreateUserForm';

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const [users] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Staff', status: 'Inactive' },
    { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'Staff', status: 'Active' },
  ]);

  const handleCreateUser = (data) => {
    console.log("Creating user:", data);
    // Here we would call API
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage system access and roles.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>User List</CardTitle>
          <div className="w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                             <Mail className="h-3 w-3" /> {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-muted-foreground" />
                        <span>{user.role}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create New User"
      >
        <CreateUserForm 
          onSubmit={handleCreateUser} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};

export default UsersPage;
