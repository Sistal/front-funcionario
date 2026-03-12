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
    const savedUser = storage.getUser();

    try {
      // Validar la sesión con el servidor (la cookie HTTP-only se envía automáticamente)
      const response = await validateToken();
      
      if (response && response.valid !== false) { // Asumimos que si no lanza error, o devuelve un ok, la sesión es válida
        setUser(savedUser);
        setIsAuthenticated(true);
      } else {
        storage.clearAuth();
      }
    } catch (error) {
      console.error('Error validating token:', error);
      storage.clearAuth();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function login(userData) {
    storage.saveUser(userData);
    setUser(userData);
    setIsAuthenticated(true);
  }

  async function logout() {
    storage.clearAuth();
    setUser(null);
    setIsAuthenticated(false);
    await logoutApi();
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
