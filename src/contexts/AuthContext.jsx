import React, { createContext, useContext, useState, useEffect } from 'react';
import storage from '../lib/storage';
import { validateToken, logout as logoutApi } from '../api/auth.api';
import { getMyProfile } from '../api/funcionario.api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsFuncionarioRegistration, setNeedsFuncionarioRegistration] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const claims = await validateToken();
      storage.saveUser(claims);
      setUser(claims);
      setIsAuthenticated(true);

      try {
        await getMyProfile();
        setNeedsFuncionarioRegistration(false);
      } catch (error) {
        const message = String(error?.message || '').toLowerCase();
        const backendMessage = String(error?.data?.message || '').toLowerCase();
        const hasNoFuncionario =
          error?.status === 401 &&
          (message.includes('sin funcionario asociado') || backendMessage.includes('sin funcionario asociado'));

        if (hasNoFuncionario) {
          setNeedsFuncionarioRegistration(true);
          return;
        }

        throw error;
      }
    } catch (error) {
      console.error('Error validating token:', error);
      storage.clearAuth();
      setIsAuthenticated(false);
      setNeedsFuncionarioRegistration(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function login(userData) {
    storage.saveUser(userData);
    setUser(userData);
    setIsAuthenticated(true);
    setNeedsFuncionarioRegistration(false);
  }

  async function logout() {
    storage.clearAuth();
    setUser(null);
    setIsAuthenticated(false);
    setNeedsFuncionarioRegistration(false);
    await logoutApi();
  }

  function completeFuncionarioRegistration() {
    setNeedsFuncionarioRegistration(false);
  }

  const value = {
    user,
    isAuthenticated,
    needsFuncionarioRegistration,
    loading,
    login,
    logout,
    checkAuth,
    completeFuncionarioRegistration,
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
