import React, { useState, useEffect } from 'react';
import { NotificationsFilters } from '../components/notificaciones/Filters.jsx';
import { NotificationsList } from '../components/notificaciones/NotificationsList.jsx';
import notificationsData from '../data/notifications.json';
import { Bell, CheckCircle, AlertCircle, RefreshCw, Package } from 'lucide-react';
import { NotificationsActions } from '../components/notificaciones/Actions.jsx';
import { notificationsApi } from '../api/notifications.api';

export function Notificaciones() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      setLoading(true);
      const data = await notificationsApi.getAll();
      setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications, using static data:', error);
      setNotifications(notificationsData);
    } finally {
      setLoading(false);
    }
  }

  const filters = [
    { id: 'all', label: 'Todas', count: notifications.length, icon: <Bell className="w-4 h-4 text-gray-600" /> },
    { id: 'unread', label: 'No leídas', count: notifications.filter(n => !n.isRead).length, icon: <Bell className="w-4 h-4 text-blue-600" /> },
    { id: 'approved', label: 'Aprobaciones', count: notifications.filter(n => n.type === 'approved').length, icon: <CheckCircle className="w-4 h-4 text-green-600" /> },
    { id: 'alerts', label: 'Alertas', count: notifications.filter(n => n.type === 'alert').length, icon: <AlertCircle className="w-4 h-4 text-amber-600" /> },
    { id: 'updates', label: 'Actualizaciones', count: notifications.filter(n => n.type === 'update').length, icon: <RefreshCw className="w-4 h-4 text-blue-600" /> },
    { id: 'deliveries', label: 'Entregas', count: notifications.filter(n => n.type === 'delivery').length, icon: <Package className="w-4 h-4 text-purple-600" /> },
  ];

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !n.isRead;
    if (activeFilter === 'approved') return n.type === 'approved';
    if (activeFilter === 'alerts') return n.type === 'alert';
    if (activeFilter === 'updates') return n.type === 'update';
    if (activeFilter === 'deliveries') return n.type === 'delivery';
    return true;
  });

  const toggleRead = async (id) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Actualizar optimísticamente de todos modos
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  return (
    <main>
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Notificaciones</h1>
          <div className="flex items-center gap-2">
            <NotificationsActions
              onMarkAllRead={markAllAsRead}
              onClear={() => setNotifications([])}
            />
          </div>
        </div>

        <NotificationsFilters filters={filters} activeFilter={activeFilter} onSelect={setActiveFilter} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="ml-3 text-gray-600">Cargando notificaciones...</p>
        </div>
      ) : (
        <NotificationsList notifications={filtered} onToggleRead={toggleRead} />
      )}
    </main>
  );
}

export default Notificaciones;
