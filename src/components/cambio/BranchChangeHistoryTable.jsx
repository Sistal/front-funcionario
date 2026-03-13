import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table.jsx';
import { Badge } from '../ui/Badge.jsx';
import { formatDate } from '../../utils/date.js';

const statusConfig = {
	Pendiente: {
		label: 'Pendiente',
		className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
	},
	Aprobado: {
		label: 'Aprobado',
		className: 'bg-green-100 text-green-800 border-green-200',
	},
	Rechazado: {
		label: 'Rechazado',
		className: 'bg-red-100 text-red-800 border-red-200',
	},
};

export function BranchChangeHistoryTable({ history = [], loading = false }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-gray-900">
					Historial de cambios de sucursal
				</CardTitle>
			</CardHeader>
			<CardContent>
				{loading ? (
					<div className="flex items-center justify-center py-10 text-sm text-gray-500">Cargando historial...</div>
				) : (
				<div className="border border-gray-200 rounded-lg overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow className="bg-gray-50 border border-gray-200">
								<TableHead className="font-semibold text-gray-700">
									Fecha de solicitud
								</TableHead>
								<TableHead className="font-semibold text-gray-700">
									Sucursal anterior
								</TableHead>
								<TableHead className="font-semibold text-gray-700">
									Nueva sucursal
								</TableHead>
								<TableHead className="font-semibold text-gray-700">
									Estado
								</TableHead>
								<TableHead className="font-semibold text-gray-700">
									Fecha de resolución
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{history.map((record, index) => (
								<TableRow key={index} className="hover:bg-gray-50 border border-gray-200">
									<TableCell className="text-gray-600">
										{formatDate(record.fechaSolicitud)}
									</TableCell>
									<TableCell className="text-gray-900">
										{record.sucursalAnterior}
									</TableCell>
									<TableCell className="text-gray-900">
										{record.sucursalNueva}
									</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className={
												statusConfig[record.estado]?.className
											}
										>
											{
												statusConfig[record.estado]?.label || record.estado
											}
										</Badge>
									</TableCell>
									<TableCell className="text-gray-600">
										{formatDate(record.fechaEfectiva)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				)}
			</CardContent>
		</Card>
	);
}
