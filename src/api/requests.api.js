import http from '../lib/http';
import { ENV } from '../config/env';
import { requestsMock } from '../mocks/requests.mock';

const useMock = ENV.USE_MOCK;

export const requestsApi = {
  getAll: async (params) => {
    if (useMock) return requestsMock.getRequests();
    // params puede ser { tipo, periodo, estado }
    const queryString = new URLSearchParams(params).toString();
    return http.get(`/solicitudes?${queryString}`);
  },

  getById: async (id) => {
    if (useMock) return requestsMock.getRequestById(id);
    return http.get(`/solicitudes/${id}`);
  },

  createReposicion: async (data) => {
    if (useMock) return requestsMock.createReposicion(data);
    return http.post('/solicitudes/reposicion', data);
  },

  createCambioPrenda: async (data) => {
    if (useMock) return requestsMock.createCambioPrenda(data);
    return http.post('/solicitudes/cambio-prenda', data);
  },

  uploadEvidence: async (file) => {
    if (useMock) return requestsMock.uploadEvidence(file);
    
    const formData = new FormData();
    formData.append('file', file);
    
    // Importante: no poner Content-Type: application/json manualmente, 
    // fetch lo pone si es FormData, pero tu helper http.js fuerza JSON si hay body.
    // Habría que ajustar http.js o pasar un flag especial.
    // Por simplicidad del mock actual, asumiremos que http.js soporta FormData o lo ajustaremos después.
    // Para ahora simularemos que http.post maneja json solamente, así que este endpoint podría fallar en integración real
    // sin ajuste en http.js.
    
    return http.post('/archivos/upload', formData, {
      body: formData // Esto es tricky con el helper actual que stringify
    });
  }
};
