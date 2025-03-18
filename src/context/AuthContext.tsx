
import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types/auth';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string, role: UserRole) => {
    // In a real app, this would validate against a backend
    setUser({
      id: '1',
      username,
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
