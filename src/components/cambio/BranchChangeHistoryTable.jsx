import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table.jsx';
import { Badge } from '../ui/Badge.jsx';

const historyData = [
	{
		requestDate: '15/03/2024',
		previousBranch: 'Sucursal Las Condes',
		newBranch: 'Sucursal Santiago Centro',
		status: 'approved',
		resolutionDate: '18/03/2024',
	},
	{
		requestDate: '10/11/2023',
		previousBranch: 'Sucursal Providencia',
		newBranch: 'Sucursal Las Condes',
		status: 'approved',
		resolutionDate: '15/11/2023',
	},
	{
		requestDate: '22/08/2023',
		previousBranch: 'Sucursal Maipú',
		newBranch: 'Sucursal Providencia',
		status: 'rejected',
		resolutionDate: '25/08/2023',
	},
];

const statusConfig = {
	pending: {
		label: 'Pendiente',
		className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
	},
	approved: {
		label: 'Aprobado',
		className: 'bg-green-100 text-green-800 border-green-200',
	},
	rejected: {
		label: 'Rechazado',
		className: 'bg-red-100 text-red-800 border-red-200',
	},
};

export function BranchChangeHistoryTable() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-gray-900">
					Historial de cambios de sucursal
				</CardTitle>
			</CardHeader>
			<CardContent>
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
							{historyData.map((record, index) => (
								<TableRow key={index} className="hover:bg-gray-50 border border-gray-200">
									<TableCell className="text-gray-600">
										{record.requestDate}
									</TableCell>
									<TableCell className="text-gray-900">
										{record.previousBranch}
									</TableCell>
									<TableCell className="text-gray-900">
										{record.newBranch}
									</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className={
												statusConfig[record.status].className
											}
										>
											{
												statusConfig[record.status].label
											}
										</Badge>
									</TableCell>
									<TableCell className="text-gray-600">
										{record.resolutionDate}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}
