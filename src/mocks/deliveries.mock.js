import { mockResponse, mockError } from './utils';
import deliveriesData from '../data/deliveries.json';

let deliveries = [...deliveriesData];

export const deliveriesMock = {
  getDeliveries: () => mockResponse(deliveries),

  getDeliveryById: (id) => {
    const delivery = deliveries.find(d => d.id === id);
    if (!delivery) return mockError('Entrega no encontrada', 404);
    return mockResponse(delivery);
  },

  confirmReceipt: (id) => {
    const index = deliveries.findIndex(d => d.id === id);
    if (index === -1) return mockError('Entrega no encontrada', 404);
    
    // Actualizar estado a completado
    deliveries[index] = {
      ...deliveries[index],
      status: 'Entregado',
      timeline: [
        {
          status: 'Confirmado por usuario',
          date: new Date().toISOString().split('T')[0],
          completed: true
        },
        ...deliveries[index].timeline
      ]
    };
    
    return mockResponse(deliveries[index]);
  }
};
