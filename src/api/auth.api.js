import { ENV } from '../config/env';

async function authRequest(path, { method = 'GET', headers, body } = {}) {
  const url = `${ENV.API_AUTH_BASE}${path}`;
  
  // Get token from storage
  const token = localStorage.getItem('auth_token');

  const res = await fetch(url, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : null),
      ...(token ? { 'Authorization': `Bearer ${token}` } : null),
      ...(headers || null),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

export function validateToken() {
  return authRequest('/auth/validate');
}

export function getMe() {
  return authRequest('/auth/me');
}

export function logout() {
  // Limpiar localStorage
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  
  // Redirigir al login
  window.location.href = ENV.LOGIN_URL;
}
