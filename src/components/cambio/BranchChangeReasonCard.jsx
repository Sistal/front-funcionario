import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select.jsx';
import { Textarea } from '../ui/Textarea.jsx';

const changeReasons = [
	{ value: 'workplace-change', label: 'Cambio de lugar de trabajo' },
	{ value: 'permanent-relocation', label: 'Traslado permanente' },
	{ value: 'geographic-proximity', label: 'Cercanía geográfica' },
	{ value: 'other', label: 'Otro' },
];

export function BranchChangeReasonCard() {
	const [reason, setReason] = useState('');
	const [description, setDescription] = useState('');

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-gray-900">3. Motivo del cambio</CardTitle>
			</CardHeader>
          <CardContent className="space-y-4">
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor="change-reason">Motivo del cambio</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger id="change-reason" className="mt-2 border border-gray-200">
                  <SelectValue placeholder="Seleccione el motivo del cambio"/>
                </SelectTrigger>
                <SelectContent>
                  {changeReasons.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={'flex flex-col gap-2'}>
              <Label htmlFor="description">Descripción del motivo</Label>
              <Textarea
                  id="description"
                  placeholder="Describe brevemente el motivo del cambio de sucursal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 min-h-24 border border-gray-200"
              />
              <p className="text-xs text-gray-500 mt-2">
                La información proporcionada será utilizada para validar la solicitud
              </p>
            </div>
          </CardContent>
        </Card>
    );
}
