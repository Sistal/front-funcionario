import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select.jsx';
import { Input } from '../ui/Input.jsx';
import { formatDate } from '../../utils/date.js';

export function RequestSelectionCard({ requests = [], value, onChange, loading = false }) {
	const selected = requests.find((request) => String(request.id || request.requestId) === String(value));

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-gray-900">1. Selección de solicitud base</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className={'flex flex-col gap-2'}>
					<Label htmlFor="original-request">Solicitud entregada</Label>
					<Select value={value} onValueChange={onChange}>
						<SelectTrigger id="original-request" className="mt-4">
							<SelectValue placeholder={loading ? 'Cargando entregas...' : 'Seleccione una solicitud entregada'} />
						</SelectTrigger>
						<SelectContent>
							{requests.map((request) => (
								<SelectItem key={request.id || request.requestId} value={String(request.id || request.requestId)}>
									{request.requestId || request.id} — {request.garments} — {request.status}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{selected && (
					<div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
						<div className={'flex flex-col gap-2'}>
							<span className="text-xs text-gray-600">Prenda original</span>
							<Input value={selected.garments} readOnly
								className="mt-1 bg-white focus:outline-none focus:ring-0"/>
						</div>
						<div className={'flex flex-col gap-2'}>
							<span className="text-xs text-gray-600">Talla original</span>
							<Input value={selected.type || '-'} readOnly
								className="mt-1 bg-white focus:outline-none focus:ring-0"/>
						</div>
						<div className={'flex flex-col gap-2'}>
							<span className="text-xs text-gray-600">Fecha de entrega</span>
							<Input value={formatDate(selected.dispatchDate)} readOnly
								className="mt-1 bg-white focus:outline-none focus:ring-0"/>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
