import { mockResponse } from './utils';

const branches = [
  { id: 1, name: 'Casa Matriz - Santiago', region: 'RM' },
  { id: 2, name: 'Sucursal Norte - Antofagasta', region: 'II' },
  { id: 3, name: 'Sucursal Sur - Concepción', region: 'VIII' },
  { id: 4, name: 'Oficina Valparaíso', region: 'V' }
];

let changeHistory = [
  {
    id: 1,
    fechaSolicitud: '2023-11-15',
    fechaEfectiva: '2024-01-01',
    sucursalAnterior: 'Sucursal Norte - Antofagasta',
    sucursalNueva: 'Casa Matriz - Santiago',
    motivo: 'Traslado personal',
    estado: 'Aprobado'
  }
];

export const branchesMock = {
  getAllBranches: () => mockResponse(branches),

  getChangeHistory: () => mockResponse(changeHistory),

  requestChange: (data) => {
    const newReq = {
      id: Date.now(),
      fechaSolicitud: new Date().toISOString().split('T')[0],
      fechaEfectiva: data.effectiveDate || '2026-03-01',
      sucursalAnterior: 'Casa Matriz - Santiago', // Asumido actual
      sucursalNueva: branches.find(b => b.id == data.branchId)?.name || 'Desconocida',
      motivo: data.reason,
      estado: 'Pendiente'
    };
    changeHistory = [newReq, ...changeHistory];
    return mockResponse(newReq);
  }
};
