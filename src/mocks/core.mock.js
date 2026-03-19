import { mockResponse } from './utils';

const catalogs = {
  campanaActiva: {
    id: 'CAM-2026',
    nombre: 'Temporada Invierno 2026',
    fechaInicio: '2026-05-01',
    fechaFin: '2026-08-31',
    activa: true
  },
  tallas: [
    { id: 'XS', label: 'XS - Extra Pequeño' },
    { id: 'S', label: 'S - Pequeño' },
    { id: 'M', label: 'M - Mediano' },
    { id: 'L', label: 'L - Grande' },
    { id: 'XL', label: 'XL - Extra Grande' },
    { id: 'XXL', label: 'XXL - Doble Extra Grande' }
  ],
  motivosCambio: [
    { id: 'TALLA', label: 'Talla incorrecta' },
    { id: 'DEFECTO', label: 'Producto defectuoso' },
    { id: 'ERROR_ENVIO', label: 'Producto no corresponde' },
    { id: 'OTRO', label: 'Otro motivo' }
  ],
  tiposPrenda: [
    { id: 'POLERA', label: 'Polera Institucional' },
    { id: 'PANTALON', label: 'Pantalón Cargo' },
    { id: 'ZAPATOS', label: 'Zapatos de Seguridad' },
    { id: 'CHAQUETA', label: 'Chaqueta Softshell' },
    { id: 'GORRO', label: 'Gorro Corporativo' }
  ]
};

export const coreMock = {
  getCampanaActiva: () => mockResponse(catalogs.campanaActiva),
  getTallas: () => mockResponse(catalogs.tallas),
  getMotivosCambio: () => mockResponse(catalogs.motivosCambio),
  getTiposPrenda: () => mockResponse(catalogs.tiposPrenda),
};
