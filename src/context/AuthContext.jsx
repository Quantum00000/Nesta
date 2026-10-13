import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const AuthContext = createContext();

const STORAGE_KEY = 'nesta_auth_user';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = async (email, password) => {
    try {
      // Backend uses username, we'll map email to username
      const res = await apiService.login(email, password);
      const user = {
        name: email.split('@')[0] || email,
        email: email,
        plan: 'Pro Architect',
      };
      setCurrentUser(user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return user;
    } catch (err) {
      throw new Error(err.message || 'Invalid credentials or backend not reachable.');
    }
  };

  const register = async (name, email, password) => {
    try {
      await apiService.register(email, password); // uses email as username
      return login(email, password);
    } catch (err) {
      throw new Error(err.message || 'Registration failed');
    }
  };

  const loginDemo = async () => {
    // try to register demo user if not exists, then log in
    try {
      return await register('Demo', 'demo@nesta.dev', 'password123');
    } catch {
      try {
        return await login('demo@nesta.dev', 'password123');
      } catch {
        // Fallback demo user if backend is offline/unreachable
        const demoUser = {
          name: 'Demo Architect',
          email: 'demo@nesta.dev',
          plan: 'Pro Architect',
        };
        setCurrentUser(demoUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
        return demoUser;
      }
    }
  };

  const logout = () => {
    apiService.logout();
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, loginDemo, logout, isAuthenticated: !!currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
