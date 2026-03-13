import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ENV } from '../../config/env';

export default function ProtectedRoute({ children, allowWithoutFuncionario = false }) {
  const { isAuthenticated, loading, needsFuncionarioRegistration } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirigir al login
    window.location.href = ENV.LOGIN_URL;
    return null;
  }

  if (needsFuncionarioRegistration && !allowWithoutFuncionario) {
    return <Navigate to="/registro-funcionario" replace />;
  }

  if (!needsFuncionarioRegistration && allowWithoutFuncionario) {
    return <Navigate to="/" replace />;
  }

  return children;
}
