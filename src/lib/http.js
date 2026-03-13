import { ENV } from '../config/env';
import storage from './storage';

function isFormData(value) {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

function buildErrorMessage(data, status) {
  if (!data) return `HTTP ${status}`;
  if (typeof data === 'string') return data;

  if (data.message) return data.message;
  if (data.error) return data.error;

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.map((item) => item.message).filter(Boolean).join(', ');
  }

  if (data.errors?.details) return data.errors.details;
  if (data.errors?.code) return data.errors.code;

  return `HTTP ${status}`;
}

function isUsuarioSinFuncionarioError(data, message) {
  const rawMessage = [
    message,
    data?.message,
    data?.error,
    data?.errors?.details,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return rawMessage.includes('sin funcionario asociado');
}

async function request(path, { method = 'GET', headers, body } = {}) {
  const url = `${ENV.API_BASE}${path}`;
  const isMultipart = isFormData(body);
  const requestHeaders = {
    ...(body && !isMultipart ? { 'Content-Type': 'application/json' } : null),
    ...(headers || null),
  };

  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers: requestHeaders,
    body: body ? (isMultipart ? body : JSON.stringify(body)) : undefined,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg = buildErrorMessage(data, res.status);
    const error = new Error(msg);
    error.status = res.status;
    error.data = data;
    
    // Si es 401, limpiar auth y redirigir al login
    if (res.status === 401) {
      const isNoFuncionario = isUsuarioSinFuncionarioError(data, msg);
      if (!isNoFuncionario) {
        storage.clearAuth();
        window.location.href = ENV.LOGIN_URL;
      }
    }
    
    throw error;
  }

  if (data && typeof data === 'object' && 'success' in data) {
    if (data.success === false) {
      throw new Error(buildErrorMessage(data, res.status));
    }

    return data.data ?? null;
  }

  return data;
}

const http = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  delete: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};

export default http;
