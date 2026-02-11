import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { LogOut, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ENV } from '../../config/env';

export function AccountActionsCard() {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout();
      // Redirigir al frontend de login
      window.location.href = ENV.LOGIN_URL || 'http://localhost:5173';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">Acciones de la cuenta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-900 font-medium mb-1">Seguridad recomendada</p>
            <p className="text-sm text-amber-700">Si compartes tu equipo con otras personas, asegúrate de cerrar sesión al finalizar tu trabajo para proteger tu información personal.</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div>
            <p className="text-sm text-gray-700 font-medium">Cerrar sesión en este dispositivo</p>
            <p className="text-xs text-gray-500 mt-1">Finaliza tu sesión actual de forma segura</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
