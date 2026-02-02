import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token is expired
    const expiresAt = localStorage.getItem('auth_expires_at');
    if (token && expiresAt) {
      if (new Date() > new Date(expiresAt)) {
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (username: string, password: string) => {
    const response = await api.login(username, password);
    const { token, expiresAt } = response;
    
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_expires_at', expiresAt);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_expires_at');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!token, 
      token, 
      login, 
      logout,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
