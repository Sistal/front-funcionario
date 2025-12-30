import React from 'react';

export function DeliveryStatsCards({ deliveries = [] }) {
  const total = deliveries.length;
  const inTransit = deliveries.filter((d) => d.status === 'in-transit').length;
  const delivered = deliveries.filter((d) => d.status === 'delivered').length;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500">Total despachos</p>
        <p className="text-2xl font-semibold text-gray-900">{total}</p>
      </div>
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500">En tránsito</p>
        <p className="text-2xl font-semibold text-gray-900">{inTransit}</p>
      </div>
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500">Entregados</p>
        <p className="text-2xl font-semibold text-gray-900">{delivered}</p>
      </div>
    </div>
  );
}

