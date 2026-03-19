import http from '../lib/http';

export const requestsApi = {
  getAll: async (params) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return http.get(`/solicitudes${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return http.get(`/solicitudes/${id}`);
  },

  getUniformesDisponibles: async () => {
    return http.get('/catalogo/uniformes');
  },

  createUniforme: async (data) => {
    return http.post('/solicitudes/uniforme', data);
  },

  createReposicion: async (data) => {
    return http.post('/solicitudes/reposicion', data);
  },

  createCambioPrenda: async (data) => {
    return http.post('/solicitudes/cambio-prenda', data);
  },

  uploadEvidence: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return http.post('/archivos/upload', formData);
  }
};
