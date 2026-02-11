import { mockResponse } from './utils';
import notificationsData from '../data/notifications.json'; // Usamos data existente como base

let notifications = [...notificationsData];

export const notificationsMock = {
  getNotifications: () => mockResponse(notifications),
  
  markAsRead: (id) => {
    notifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    return mockResponse({ success: true });
  },

  markAllAsRead: () => {
    notifications = notifications.map(n => ({ ...n, read: true }));
    return mockResponse({ success: true, count: notifications.length });
  }
};
