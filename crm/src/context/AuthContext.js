import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, role, permissions: [] }
  const [loading, setLoading] = useState(true);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const { data } = await api.get('/auth/me'); // Get user data
          setUser(data.user);
        }
      } catch (error) {
        console.error("Auth check failed", error);
        localStorage.removeItem('accessToken');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
      window.location.href = '/login';
    }
  };

  // Permission Check Helper
  const hasPermission = (permissionKey) => {
    if (!user) return false;
    // Admin override or specific check
    if (user.role?.name === 'admin' || user.role === 'admin') return true; 
    return user.permissions?.includes(permissionKey);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
