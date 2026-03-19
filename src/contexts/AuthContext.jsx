import React, { createContext, useContext, useState, useEffect } from 'react';
import storage from '../lib/storage';
import { validateToken, logout as logoutApi, checkRegistrationStatus } from '../api/auth.api';
import { getMyProfile } from '../api/funcionario.api';
import { ENV } from '../config/env';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsFuncionarioRegistration, setNeedsFuncionarioRegistration] = useState(false);
  const [needsMedidasRegistration, setNeedsMedidasRegistration] = useState(false);
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
        const response = await checkRegistrationStatus();
        const requiereRegistro = response?.requiere_registro || false;
        const requiereMedidas = response?.requiere_medidas || false;
        
        setNeedsFuncionarioRegistration(requiereRegistro);
        setNeedsMedidasRegistration(requiereMedidas);
        
        if (!requiereRegistro) {
          await getMyProfile().catch(err => console.warn('Error al precargar perfil:', err));
        }
        
        console.log(ENV.VITE_API_BASE, ENV.VITE_LOGIN_URL);
      } catch (error) {
        // Fallback en caso de que el nuevo endpoint falle mientras el backend lo implementa
        // Opcional: mantener retrocompatibilidad o simplemente relanzar el error
        console.warn('No se pudo verificar el estado de registro, cayendo a validación de perfil (fallback):', error);
        
        try {
          // Si el perfil falla, asumimos que no hay funcionario
          // O si falta medidas, lo leeríamos del perfil
          const profile = await getMyProfile();
          setNeedsFuncionarioRegistration(false);
          const needsMedidas = (!profile?.tallas && !profile?.medidas) ? true : false; // Heurística simple
          setNeedsMedidasRegistration(needsMedidas);
        } catch (profileError) {
          const message = String(profileError?.message || '').toLowerCase();
          const backendMessage = String(profileError?.data?.message || '').toLowerCase();
          const hasNoFuncionario =
            profileError?.status === 401 &&
            (message.includes('sin funcionario asociado') || backendMessage.includes('sin funcionario asociado'));

          if (hasNoFuncionario) {
            setNeedsFuncionarioRegistration(true);
            return;
          }
          throw profileError;
        }
      }
    } catch (error) {
      console.error('Error validating token:', error);
      storage.clearAuth();
      setIsAuthenticated(false);
      setNeedsFuncionarioRegistration(false);
      setNeedsMedidasRegistration(false);
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
    setNeedsMedidasRegistration(false);
  }

  async function logout() {
    storage.clearAuth();
    setUser(null);
    setIsAuthenticated(false);
    setNeedsFuncionarioRegistration(false);
    setNeedsMedidasRegistration(false);
    await logoutApi();
  }

  function completeFuncionarioRegistration() {
    setNeedsFuncionarioRegistration(false);
  }

  function completeMedidasRegistration() {
    setNeedsMedidasRegistration(false);
  }

  const value = {
    user,
    isAuthenticated,
    needsFuncionarioRegistration,
    needsMedidasRegistration,
    loading,
    login,
    logout,
    checkAuth,
    completeFuncionarioRegistration,
    completeMedidasRegistration,
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
