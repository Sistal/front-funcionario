import http from '../lib/http';
import { ENV } from '../config/env';
import { requestsMock } from '../mocks/requests.mock';

const useMock = ENV.USE_MOCK;

export const requestsApi = {
  getAll: async (params) => {
    if (useMock) return requestsMock.getRequests();
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return http.get(`/solicitudes${queryString ? `?${queryString}` : ''}`);
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

    return http.post('/archivos/upload', formData);
  }
};
