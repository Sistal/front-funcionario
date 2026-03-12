import React from 'react';

export function DeliveryDetailModal({ delivery, open = false, onClose = () => {} }) {
  if (!open || !delivery) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 z-10">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-gray-900">Detalle despacho {delivery.requestId}</h3>
          <button onClick={onClose} className="text-gray-500">Cerrar</button>
        </div>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p><strong>Fecha despacho:</strong> {delivery.dispatchDate}</p>
          <p><strong>Prendas:</strong> {delivery.garments}</p>
          <p><strong>Dirección:</strong> {delivery.address}</p>
          <p><strong>Estado:</strong> {delivery.status}</p>
          <p><strong>Código rastreo:</strong> {delivery.trackingCode}</p>
        </div>
      </div>
    </div>
  );
}

