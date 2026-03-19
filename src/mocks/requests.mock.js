import { mockResponse } from './utils';

// Lista inicial de solicitudes simulada
let requests = [
  {
    id: 'SOL-001',
    tipo: 'Reposición',
    fecha: '2026-01-15',
    estado: 'En Proceso',
    items: ['Polera Institucional', 'Pantalón Cargo'],
    motivo: 'Desgaste natural'
  },
  {
    id: 'SOL-002',
    tipo: 'Cambio de Talla',
    fecha: '2026-01-20',
    estado: 'Pendiente',
    items: ['Zapatos de Seguridad'],
    motivo: 'Talla incorrecta'
  }
];

export const requestsMock = {
  getRequests: () => mockResponse(requests),

  getRequestById: (id) => {
    const req = requests.find(r => r.id === id);
    return mockResponse(req || null);
  },

  createUniforme: (data) => {
    const newReq = {
      id: `SOL-00${requests.length + 1}`,
      tipo: 'Uniforme',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      items: data?.items || ['Uniforme Completo'],
      ...data
    };
    requests.unshift(newReq);
    return mockResponse(newReq);
  },

  createReposicion: (data) => {
    const newReq = {
      id: `SOL-${Date.now()}`,
      tipo: 'Reposición',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      items: data.items,
      motivo: data.reason
    };
    requests.push(newReq);
    return mockResponse(newReq);
  },

  createCambioPrenda: (data) => {
    const newReq = {
      id: `SOL-${Date.now()}`,
      tipo: 'Cambio de Talla',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      items: [data.prenda],
      motivo: data.reason,
      nuevoTalle: data.newSize
    };
    requests.push(newReq);
    return mockResponse(newReq);
  },
  
  uploadEvidence: (file) => {
    // Simular subida de archivo
    return mockResponse({
      fileId: `FILE-${Date.now()}`,
      url: URL.createObjectURL(file), // URL efímera local para preview
      name: file.name
    }, 1500);
  }
};
