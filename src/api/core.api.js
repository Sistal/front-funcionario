import http from '../lib/http';
import { ENV } from '../config/env';
import { coreMock } from '../mocks/core.mock';

const useMock = ENV.USE_MOCK;

export const coreApi = {
  getCampanaActiva: async () => {
    if (useMock) return coreMock.getCampanaActiva();
    return http.get('/campanas/activa');
  },
  
  getTallas: async () => {
    if (useMock) return coreMock.getTallas();
    return http.get('/catalogo/tallas');
  },

  getMotivosCambio: async () => {
    if (useMock) return coreMock.getMotivosCambio();
    return http.get('/catalogo/motivos-cambio');
  },

  getTiposPrenda: async () => {
    if (useMock) return coreMock.getTiposPrenda();
    return http.get('/catalogo/prenda-tipos');
  },
  
  getEmpresas: async () => {
    // Sin mocks para este flujo según requerimientos
    return http.get('/api/v1/empresas');
  },

  getSegmentos: async (idEmpresa) => {
    return http.get(`/api/v1/empresas/${idEmpresa}/segmentos`);
  },

  getSucursales: async (idSegmento) => {
    return http.get(`/api/v1/segmentos/${idSegmento}/sucursales`);
  }
};
