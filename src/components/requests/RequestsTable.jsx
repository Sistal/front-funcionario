import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Eye } from 'lucide-react';
import { formatDate } from '../../utils/date.js';

const statusConfig = {
    Pendiente: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    Aprobado: { label: 'Aprobado', className: 'bg-green-100 text-green-800 border-green-200' },
    'En proceso': { label: 'En proceso', className: 'bg-blue-100 text-blue-800 border-blue-200' },
    Entregado: { label: 'Entregado', className: 'bg-gray-100 text-gray-800 border-gray-200' },
    Rechazado: { label: 'Rechazado', className: 'bg-red-100 text-red-800 border-red-200' },
};

export function RequestsTable({ requests }) {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50 border-gray-200">
                        <TableHead className="font-semibold text-gray-700">Número Solicitud</TableHead>
                        <TableHead className="font-semibold text-gray-700">Fecha</TableHead>
                        <TableHead className="font-semibold text-gray-700">Tipo</TableHead>
                        <TableHead className="font-semibold text-gray-700">Descripción</TableHead>
                        <TableHead className="font-semibold text-gray-700">Estado</TableHead>
                        <TableHead className="font-semibold text-gray-700">Motivo</TableHead>
                        <TableHead className="font-semibold text-gray-700 text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((request) => (
                        <TableRow key={request.id} className="hover:bg-gray-50 border-gray-200">
                            <TableCell className="font-medium text-gray-900">{request.id}</TableCell>
                            <TableCell className="text-gray-600">{formatDate(request.fecha)}</TableCell>
                            <TableCell className="text-gray-600">{request.tipo}</TableCell>
                            <TableCell className="text-gray-600">{Array.isArray(request.items) ? request.items.join(', ') : '-'}</TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={statusConfig[request.estado]?.className}
                                >
                                    {statusConfig[request.estado]?.label || request.estado}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-gray-600">{request.motivo || '-'}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                    <Eye className="w-4 h-4 mr-2" />
                                    Ver detalle
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

