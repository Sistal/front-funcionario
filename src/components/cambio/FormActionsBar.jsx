import React from 'react';
import { Button } from '../ui/Button.jsx';

export function FormActionsBar({ onSubmit, onCancel, loading = false }) {
  return (
    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
      <Button variant="outline" onClick={onCancel} className="px-6">Cancelar</Button>
      <Button onClick={onSubmit} className="px-6 bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar solicitud de cambio'}
      </Button>
    </div>
  );
}
