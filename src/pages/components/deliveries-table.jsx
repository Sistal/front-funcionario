import React from 'react';

export function DeliveriesTable({ deliveries = [], onViewDetail = () => {} }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-sm text-gray-500">Solicitud</th>
            <th className="px-4 py-3 text-sm text-gray-500">Despacho</th>
            <th className="px-4 py-3 text-sm text-gray-500">Prendas</th>
            <th className="px-4 py-3 text-sm text-gray-500">Dirección</th>
            <th className="px-4 py-3 text-sm text-gray-500">Estado</th>
            <th className="px-4 py-3 text-sm text-gray-500">Fecha estimada</th>
            <th className="px-4 py-3 text-sm text-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((d) => (
            <tr key={d.requestId} className="border-t">
              <td className="px-4 py-3 text-sm text-gray-700">{d.requestId}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{d.dispatchDate}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{d.garments}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{d.address}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{d.status}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{d.estimatedDate}</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                <button
                  onClick={() => onViewDetail(d)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Ver detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

