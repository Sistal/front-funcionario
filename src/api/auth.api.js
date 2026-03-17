import { ENV } from '../config/env';
import http from '../lib/http';

export function validateToken() {
  return http.get('/api/v1/auth/validate');
}

export function getMe() {
  return http.get('/api/v1/auth/me');
}

export function checkRegistrationStatus() {
  return http.get('/api/v1/auth/status');
}

export function changePassword(data) {
  return http.put('/api/v1/auth/change-password', data);
}

export async function logout() {
  try {
    await http.post('/api/v1/auth/logout');
  } catch (err) {
    console.error('Logout error:', err);
  }
  
  // Limpiar localStorage (solo usuario)
  localStorage.removeItem('auth_user');
  
  // Redirigir al login
  window.location.href = ENV.LOGIN_URL;
}

