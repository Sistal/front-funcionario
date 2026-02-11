import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select.jsx';

export function DeliveryFilters({ status = 'all', type = 'all', period = '30-days', onChangeStatus = () => {}, onChangeType = () => {}, onChangePeriod = () => {} }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Select value={status} onValueChange={onChangeStatus}>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Estado del despacho" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="preparing">Preparando pedido</SelectItem>
          <SelectItem value="in-transit">En tránsito</SelectItem>
          <SelectItem value="delivered">Entregado</SelectItem>
          <SelectItem value="incident">Con incidencia</SelectItem>
        </SelectContent>
      </Select>

      <Select value={type} onValueChange={onChangeType}>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Tipo de solicitud" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los tipos</SelectItem>
          <SelectItem value="full-uniform">Uniforme completo</SelectItem>
          <SelectItem value="replacement">Reposición</SelectItem>
          <SelectItem value="size-change">Cambio de talla</SelectItem>
          <SelectItem value="garment-change">Cambio de prenda</SelectItem>
        </SelectContent>
      </Select>

      <Select value={period} onValueChange={onChangePeriod}>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30-days">Últimos 30 días</SelectItem>
          <SelectItem value="3-months">Últimos 3 meses</SelectItem>
          <SelectItem value="all">Todo el período</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
