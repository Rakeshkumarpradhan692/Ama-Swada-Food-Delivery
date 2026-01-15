import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Loader2 } from 'lucide-react';

const CreateUserForm = ({ onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Staff',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Full Name</label>
        <Input 
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Email Address</label>
        <Input 
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Role</label>
        <select 
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="Staff">Staff</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Temporary Password</label>
        <Input 
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1" isLoading={isLoading}>
          Create User
        </Button>
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CreateUserForm;
