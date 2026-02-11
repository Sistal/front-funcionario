import { mockResponse } from './utils';

// Datos extendidos del usuario
let currentUser = {
  id: 123,
  nombre: 'Juan Pérez',
  email: 'juan.perez@empresa.com',
  cargo: 'Funcionario',
  sucursal: 'Casa Matriz',
  recoveryEmail: 'juan.personal@gmail.com',
  preferences: {
    notifications: {
      email: true,
      push: false,
      sms: true
    },
    theme: 'system'
  }
};

let activityLog = [
  { id: 1, action: 'Inicio de sesión', date: '2026-02-03 08:30', ip: '192.168.1.10', device: 'Chrome / Windows' },
  { id: 2, action: 'Cambio de contraseña', date: '2026-01-15 14:20', ip: '192.168.1.10', device: 'Chrome / Windows' },
  { id: 3, action: 'Actualización perfil', date: '2025-12-10 09:15', ip: '200.14.55.2', device: 'Safari / iPhone' }
];

export const funcionarioMock = {
  getMe: () => mockResponse(currentUser),
  
  updatePreferences: (prefs) => {
    currentUser.preferences = { ...currentUser.preferences, ...prefs };
    return mockResponse(currentUser.preferences);
  },

  updateSecurity: (data) => {
    if (data.recoveryEmail) currentUser.recoveryEmail = data.recoveryEmail;
    return mockResponse({ success: true, message: 'Seguridad actualizada' });
  },

  getActivity: () => mockResponse(activityLog)
};
