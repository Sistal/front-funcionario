import React from 'react';

export function DeliveryFilters() {
  return (
    <div className="flex items-center gap-4 my-6">
      <select className="rounded-md border border-gray-200 px-3 py-1 text-sm">
        <option value="">Todas las sucursales</option>
        <option value="santiago">Santiago</option>
        <option value="providencia">Providencia</option>
      </select>

      <select className="rounded-md border border-gray-200 px-3 py-1 text-sm">
        <option value="">Todos los estados</option>
        <option value="in-transit">En tránsito</option>
        <option value="delivered">Entregado</option>
      </select>

      <input type="date" className="rounded-md border border-gray-200 px-3 py-1 text-sm" />

      <div className="ml-auto" />
    </div>
  );
}

