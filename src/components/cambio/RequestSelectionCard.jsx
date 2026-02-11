import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select.jsx';
import { Input } from '../ui/Input.jsx';

const deliveredRequests = [
	{ id: 'SOL-2024-1201', garment: 'Chaqueta de invierno', size: 'M', deliveryDate: '25/10/2024' },
	{ id: 'SOL-2024-1089', garment: 'Zapatos de seguridad', size: '42', deliveryDate: '02/10/2024' },
	{ id: 'SOL-2024-0845', garment: 'Pantalón de trabajo', size: 'L', deliveryDate: '15/09/2024' },
	{ id: 'SOL-2024-0723', garment: 'Camisa corporativa', size: 'M', deliveryDate: '30/08/2024' },
];

export function RequestSelectionCard() {
	const [selectedRequest, setSelectedRequest] = useState('');

	let selected = undefined;
	for (let i = 0; i < deliveredRequests.length; i++) {
		if (deliveredRequests[i].id === selectedRequest) {
			selected = deliveredRequests[i];
			break;
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-gray-900">1. Selección de solicitud base</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className={'flex flex-col gap-2'}>
					<Label htmlFor="original-request">Solicitud entregada</Label>
					<Select value={selectedRequest} onValueChange={setSelectedRequest}>
						<SelectTrigger id="original-request" className="mt-4">
							<SelectValue placeholder="Seleccione una solicitud entregada" />
						</SelectTrigger>
						<SelectContent>
							{deliveredRequests.map((request) => (
								<SelectItem key={request.id} value={request.id}>
									{request.id} — {request.garment} — Entregada
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{selected && (
					<div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
						<div className={'flex flex-col gap-2'}>
							<span className="text-xs text-gray-600">Prenda original</span>
							<Input value={selected.garment} readOnly
								className="mt-1 bg-white focus:outline-none focus:ring-0"/>
						</div>
						<div className={'flex flex-col gap-2'}>
							<span className="text-xs text-gray-600">Talla original</span>
							<Input value={selected.size} readOnly
								className="mt-1 bg-white focus:outline-none focus:ring-0"/>
						</div>
						<div className={'flex flex-col gap-2'}>
							<span className="text-xs text-gray-600">Fecha de entrega</span>
							<Input value={selected.deliveryDate} readOnly
								className="mt-1 bg-white focus:outline-none focus:ring-0"/>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
