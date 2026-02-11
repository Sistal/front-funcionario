import http from '../lib/http';
import { ENV } from '../config/env';
import { deliveriesMock } from '../mocks/deliveries.mock';

const useMock = ENV.USE_MOCK;

export const deliveriesApi = {
  getAll: async () => {
    if (useMock) return deliveriesMock.getDeliveries();
    return http.get('/entregas');
  },

  getById: async (id) => {
    if (useMock) return deliveriesMock.getDeliveryById(id);
    return http.get(`/entregas/${id}`);
  },

  confirmReceipt: async (id) => {
    if (useMock) return deliveriesMock.confirmReceipt(id);
    return http.post(`/entregas/${id}/confirmar`);
  }
};
