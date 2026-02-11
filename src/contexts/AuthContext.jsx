import React, { createContext, useContext, useState, useEffect } from 'react';
import storage from '../lib/storage';
import { validateToken, logout as logoutApi } from '../api/auth.api';
import { ENV } from '../config/env';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = storage.getToken();
    const savedUser = storage.getUser();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Validar el token con el servidor
      const response = await validateToken();
      
      if (response.valid) {
        setUser(savedUser);
        setIsAuthenticated(true);
      } else {
        storage.clearAuth();
      }
    } catch (error) {
      console.error('Error validating token:', error);
      storage.clearAuth();
    } finally {
      setLoading(false);
    }
  }

  function login(token, userData) {
    storage.saveToken(token);
    storage.saveUser(userData);
    setUser(userData);
    setIsAuthenticated(true);
  }

  function logout() {
    storage.clearAuth();
    setUser(null);
    setIsAuthenticated(false);
    logoutApi();
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
