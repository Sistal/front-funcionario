import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup.jsx';
import { Textarea } from '../ui/Textarea.jsx';

export function ChangeReasonCard({ reasons = [], value, description, onReasonChange, onDescriptionChange }) {

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-gray-900">2. Motivo del cambio</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<span className="text-sm font-medium">Seleccione el motivo</span>
					<RadioGroup
						value={value}
						onValueChange={onReasonChange}
						className="mt-3 space-y-3"
					>
						{reasons.map((reason) => (
							<div key={reason.id} className="flex items-center gap-2">
								<RadioGroupItem value={reason.label} id={String(reason.id)}/>
								<Label
									htmlFor={String(reason.id)}
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
						onChange={(e) => onDescriptionChange(e.target.value)}
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
