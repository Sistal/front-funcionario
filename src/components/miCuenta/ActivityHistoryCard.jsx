import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table.jsx';
import { Clock, Monitor, Smartphone, Globe } from 'lucide-react';

const activityData = [
	{
		date: '14/12/2024',
		time: '14:32',
		action: 'Inicio de sesión exitoso',
		origin: 'Santiago, Chile',
		device: 'desktop',
	},
	{
		date: '13/12/2024',
		time: '09:15',
		action: 'Solicitud de cambio de talla enviada',
		origin: 'Santiago, Chile',
		device: 'web',
	},
	{
		date: '12/12/2024',
		time: '16:45',
		action: 'Inicio de sesión exitoso',
		origin: 'Santiago, Chile',
		device: 'mobile',
	},
	{
		date: '10/12/2024',
		time: '11:20',
		action: 'Cambio de contraseña exitoso',
		origin: 'Santiago, Chile',
		device: 'desktop',
	},
	{
		date: '08/12/2024',
		time: '10:05',
		action: 'Inicio de sesión exitoso',
		origin: 'Santiago, Chile',
		device: 'desktop',
	},
	{
		date: '05/12/2024',
		time: '15:30',
		action: 'Solicitud de uniforme enviada',
		origin: 'Santiago, Chile',
		device: 'web',
	},
];

const getDeviceIcon = (device) => {
	switch (device) {
		case 'desktop':
			return <Monitor className="w-4 h-4 text-gray-500" />;
		case 'mobile':
			return <Smartphone className="w-4 h-4 text-gray-500" />;
		case 'web':
			return <Globe className="w-4 h-4 text-gray-500" />;
	}
};

export function ActivityHistoryCard() {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Clock className="w-5 h-5 text-blue-600" />
					<CardTitle className="text-gray-900">
						Actividad reciente de la cuenta
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent>
				<div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
					<Table>
						<TableHeader>
							<TableRow className="bg-gray-50 border border-gray-200">
								<TableHead className="font-semibold text-gray-700">
									Fecha y hora
								</TableHead>
								<TableHead className="font-semibold text-gray-700">
									Acción
								</TableHead>
								<TableHead className="font-semibold text-gray-700">
									Origen
								</TableHead>
								<TableHead className="font-semibold text-gray-700">
									Dispositivo
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{activityData.map((record, index) => (
								<TableRow key={index} className="hover:bg-gray-50 border border-gray-200">
									<TableCell className="text-gray-600">
										{record.date} - {record.time}
									</TableCell>
									<TableCell className="text-gray-900">
										{record.action}
									</TableCell>
									<TableCell className="text-gray-600">
										{record.origin}
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											{getDeviceIcon(record.device)}
											<span className="text-gray-600 capitalize">
												{record.device === 'web'
													? 'Navegador'
													: record.device === 'desktop'
													? 'Escritorio'
													: 'Móvil'}
											</span>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<p className="text-xs text-gray-500">
					Este historial es solo informativo y no editable. Si detectas
					actividad sospechosa, contacta inmediatamente al administrador del
					sistema.
				</p>
			</CardContent>
		</Card>
	);
}

