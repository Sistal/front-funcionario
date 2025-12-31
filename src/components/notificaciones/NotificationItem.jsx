import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '../ui/Button.jsx';

export function NotificationItem({ notification, onToggleRead }) {
  const typeConfig = {
    approved: { iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    alert: { iconBg: 'bg-red-100', iconColor: 'text-red-600' },
    update: { iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    delivery: { iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    info: { iconBg: 'bg-gray-100', iconColor: 'text-gray-600' },
  };

  const cfg = typeConfig[notification.type] || typeConfig.info;

  return (
    <div className={`p-4 md:p-6 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50/30' : 'bg-white'}`}>
      <div className="flex gap-4">
        <div className={`w-12 h-12 rounded-lg ${cfg.iconBg} ${cfg.iconColor} flex items-center justify-center flex-shrink-0`}>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{notification.title}</h3>
              {!notification.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title={notification.isRead ? 'Marcar como no leída' : 'Marcar como leída'} onClick={() => onToggleRead(notification.id)}>
                <svg className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Eliminar notificación">
                <svg className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3">{notification.message}</p>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{notification.timestamp}</span>
            </div>

            {notification.actionLabel && (
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                {notification.actionLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
