import { formatDate } from '../../utils/date.js';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table.jsx';
import { Badge } from '../ui/Badge.jsx';
import { Button } from '../ui/Button.jsx';
import { Eye, MapPin } from 'lucide-react';

const statusConfig = {
  preparing: { label: 'Preparando pedido', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  'in-transit': { label: 'En tránsito', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  delivered: { label: 'Entregado', className: 'bg-green-100 text-green-800 border-green-200' },
  incident: { label: 'Con incidencia', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
};

export function DeliveriesTable({ deliveries = [], onViewDetail = () => {} }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border border-gray-200">
            <TableHead className="font-semibold text-gray-700">N° Solicitud</TableHead>
            <TableHead className="font-semibold text-gray-700">Fecha de despacho</TableHead>
            <TableHead className="font-semibold text-gray-700">Prenda(s)</TableHead>
            <TableHead className="font-semibold text-gray-700">Dirección de entrega</TableHead>
            <TableHead className="font-semibold text-gray-700">Estado</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id || delivery.requestId} className="hover:bg-gray-50 border border-gray-200">
              <TableCell className="font-medium text-gray-900">{delivery.requestId}</TableCell>
              <TableCell className="text-gray-600">{formatDate(delivery.dispatchDate)}</TableCell>
              <TableCell className="text-gray-600">{delivery.garments}</TableCell>
              <TableCell>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{delivery.address}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={statusConfig[delivery.status]?.className}>
                  {statusConfig[delivery.status]?.label}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => onViewDetail(delivery)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver detalle
                  </Button>
                  {delivery.status === 'in-transit' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => onViewDetail(delivery)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Seguimiento
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
