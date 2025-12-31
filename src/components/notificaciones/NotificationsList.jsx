import React from 'react';
import { NotificationItem } from './NotificationItem.jsx';

export function NotificationsList({ notifications, onToggleRead }) {
  return (
    <div className="divide-y divide-gray-200 bg-white">
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} onToggleRead={onToggleRead} />
      ))}
    </div>
  );
}
