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
        // Leemos la propiedad requiere_registro de la respuesta (por defecto falso si no viene)
        const requiereRegistro = response?.requiere_registro || false;
        
        setNeedsFuncionarioRegistration(requiereRegistro);
        
        // Si no requiere registro, intentamos obtener su perfil para el contexto de la sesión
        if (!requiereRegistro) {
          await getMyProfile().catch(err => console.warn('Error al precargar perfil:', err));
        }
        
        console.log(ENV.VITE_API_BASE, ENV.VITE_LOGIN_URL);
      } catch (error) {
        // Fallback en caso de que el nuevo endpoint falle mientras el backend lo implementa
        // Opcional: mantener retrocompatibilidad o simplemente relanzar el error
        console.warn('No se pudo verificar el estado de registro, cayendo a validación de perfil (fallback):', error);
        
        try {
          await getMyProfile();
          setNeedsFuncionarioRegistration(false);
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
