import { ENV } from '../config/env';
import storage from './storage';

async function request(path, { method = 'GET', headers, body } = {}) {
  const url = `http://localhost:8080${path}`;
  const requestHeaders = {
    ...(body ? { 'Content-Type': 'application/json' } : null),
    ...(headers || null),
  };

  console.log(`[HTTP Request]`, {
    endpoint: path,
    host: 'http://localhost:8080',
    method,
    headers: requestHeaders,
    body: body || null,
    credentials: 'include',
    cookies: document.cookie,
  });

  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers: requestHeaders,
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
    
    // Si es 401, limpiar auth y redirigir al login
    if (res.status === 401) {
      storage.clearAuth();
      window.location.href = ENV.LOGIN_URL;
    }
    
    throw new Error(msg);
  }

  return data;
}

const http = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};

export default http;
