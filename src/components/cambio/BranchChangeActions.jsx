import React from 'react';
import { Button } from '../ui/Button.jsx';

export function BranchChangeActions() {
  const handleSubmit = () => {
    alert('Solicitud de cambio de sucursal enviada correctamente');
  };

  const handleCancel = () => {
    if (confirm('¿Está seguro que desea cancelar? Se perderán los cambios no guardados.')) {
      // reset or navigate back
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
      <Button variant="outline" onClick={handleCancel} className="px-6">
        Cancelar
      </Button>
      <Button onClick={handleSubmit} className="px-6 bg-blue-600 hover:bg-blue-700 text-white">
        Enviar solicitud de cambio
      </Button>
    </div>
  );
}
