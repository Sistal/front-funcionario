import React from 'react';
import { Truck, Calendar, CheckCircle } from 'lucide-react';
import deliveriesData from '../../data/deliveries.json';
import { StatCard } from '../cards/StatCard.jsx';
import { parseDateDMY } from '../../utils/date.js';

export function DeliveryStatsCards({ deliveries = deliveriesData }) {
  const inTransit = deliveries.filter((d) => d.status === 'in-transit').length;
  const delivered = deliveries.filter((d) => d.status === 'delivered').length;

  const now = new Date();
  const future = deliveries
    .map(d => ({...d, est: parseDateDMY(d.dispatchDate)}))
    .filter(d => d.est >= now)
    .sort((a,b)=>a.est-b.est);

  const next = future.length ? future[0] : null;

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Despachos en tránsito"
        value={inTransit}
        description="Entregas en camino"
        icon={<Truck className="w-5 h-5 text-blue-600" />}
      />

      <StatCard
        title="Próxima entrega"
        value={next ? next.dispatchDate : '-'}
        description={next ? next.garments : 'N/A'}
        variant="highlight"
        icon={<Calendar className="w-5 h-5 text-blue-600" />}
        iconBgClass="bg-blue-100"
      />

      <StatCard
        title="Despachos entregados"
        value={delivered}
        description="Completados exitosamente"
        icon={<CheckCircle className="w-5 h-5 text-green-600" />}
      />
    </div>
  );
}
