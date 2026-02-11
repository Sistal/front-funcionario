import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup.jsx';
import { Textarea } from '../ui/Textarea.jsx';

const reasons = [
	{ id: 'wrong-size', label: 'Talla incorrecta' },
	{ id: 'defective', label: 'Prenda defectuosa' },
	{ id: 'dispatch-error', label: 'Error en despacho' },
	{ id: 'other', label: 'Otro' },
];

export function ChangeReasonCard() {
	const [selectedReason, setSelectedReason] = useState('');
	const [description, setDescription] = useState('');

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-gray-900">2. Motivo del cambio</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<span className="text-sm font-medium">Seleccione el motivo</span>
					<RadioGroup
						value={selectedReason}
						onValueChange={setSelectedReason}
						className="mt-3 space-y-3"
					>
						{reasons.map((reason) => (
							<div key={reason.id} className="flex items-center gap-2">
								<RadioGroupItem value={reason.id} id={reason.id}/>
								<Label
									htmlFor={reason.id}
									className="cursor-pointer font-normal"
								>
									{reason.label}
								</Label>
							</div>
						))}
					</RadioGroup>
				</div>

				<div className={'flex flex-col gap-2'}>
					<Label htmlFor="description">Descripción del motivo</Label>
					<Textarea
						id="description"
						placeholder="Describe brevemente el motivo del cambio"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="mt-2 min-h-24"
					/>
					<p className="text-xs text-gray-500 mt-2">
						Proporcione detalles específicos que ayuden a validar la solicitud
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
