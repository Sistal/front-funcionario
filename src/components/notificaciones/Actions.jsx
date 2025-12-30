import React from 'react';
import { Button } from '../ui/Button.jsx';
import { CheckCircle, Trash2 } from 'lucide-react';

export function NotificationsActions({ onMarkAllRead, onClear }) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={onMarkAllRead} className="flex items-center gap-2 border-gray-300 border text-[#0A0A0A]">
        <CheckCircle className="w-4 h-4" />
        Marcar todas como leídas
      </Button>

      <Button variant="ghost" size="sm" onClick={onClear} className="flex items-center gap-2 text-red-600">
        <Trash2 className="w-4 h-4" />
        Limpiar
      </Button>
    </div>
  );
}
