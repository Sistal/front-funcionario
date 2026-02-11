import http from '../lib/http';
import { ENV } from '../config/env';
import { branchesMock } from '../mocks/branches.mock';

const useMock = ENV.USE_MOCK;

export const branchesApi = {
  getAll: async () => {
    if (useMock) return branchesMock.getAllBranches();
    return http.get('/sucursales');
  },

  getHistory: async () => {
    if (useMock) return branchesMock.getChangeHistory();
    return http.get('/solicitudes/cambio-sucursal/historial');
  },

  requestChange: async (data) => {
    if (useMock) return branchesMock.requestChange(data);
    return http.post('/solicitudes/cambio-sucursal', data);
  }
};
