import http from '../lib/http';
import { ENV } from '../config/env';
import { notificationsMock } from '../mocks/notifications.mock';

const useMock = ENV.USE_MOCK;

export const notificationsApi = {
  getAll: async () => {
    if (useMock) return notificationsMock.getNotifications();
    return http.get('/notificaciones');
  },

  markAsRead: async (id) => {
    if (useMock) return notificationsMock.markAsRead(id);
    return http.patch(`/notificaciones/${id}/leida`);
  },

  markAllAsRead: async () => {
    if (useMock) return notificationsMock.markAllAsRead();
    return http.patch('/notificaciones/leer-todas');
  }
};
