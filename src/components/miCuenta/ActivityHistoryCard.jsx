import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table.jsx';
import { Clock, Monitor, Smartphone, Globe } from 'lucide-react';
import { getActivity } from '../../api/funcionario.api.js';
import { formatDateTime } from '../../utils/date.js';

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
	const [activityData, setActivityData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadActivity();
	}, []);

	async function loadActivity() {
		try {
			setLoading(true);
			const data = await getActivity();
			setActivityData(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error('Error loading activity:', error);
			setActivityData([]);
		} finally {
			setLoading(false);
		}
	}

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
				{loading ? (
					<div className="flex items-center justify-center py-10 text-sm text-gray-500">
						Cargando actividad...
					</div>
				) : (
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
							{activityData.map((record) => (
								<TableRow key={index} className="hover:bg-gray-50 border border-gray-200">
									<TableCell className="text-gray-600">
										{formatDateTime(record.date)}
									</TableCell>
									<TableCell className="text-gray-900">
										{record.action}
									</TableCell>
									<TableCell className="text-gray-600">
										{record.ip || '-'}
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											{getDeviceIcon(record.device)}
											<span className="text-gray-600 capitalize">
												{record.device === 'web'
													? 'Navegador'
													: record.device === 'desktop'
													? 'Escritorio'
													: record.device?.toLowerCase().includes('iphone') || record.device?.toLowerCase().includes('android')
													? 'Móvil'
													: record.device || 'Navegador'}
											</span>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				)}
				<p className="text-xs text-gray-500">
					Este historial es solo informativo y no editable. Si detectas
					actividad sospechosa, contacta inmediatamente al administrador del
					sistema.
				</p>
			</CardContent>
		</Card>
	);
}

