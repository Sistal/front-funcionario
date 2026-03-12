import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select.jsx';
import { Input } from '../ui/Input.jsx';
import { Info, MapPin } from 'lucide-react';

const availableBranches = [
	{
		id: '1',
		name: 'Sucursal Providencia',
		address: 'Av. Providencia 1234, Oficina 501',
		region: 'Región Metropolitana',
		commune: 'Providencia',
	},
	{
		id: '2',
		name: 'Sucursal Las Condes',
		address: 'Av. Apoquindo 3000, Piso 10',
		region: 'Región Metropolitana',
		commune: 'Las Condes',
	},
	{
		id: '3',
		name: 'Sucursal Maipú',
		address: 'Av. Pajaritos 1956, Local 102',
		region: 'Región Metropolitana',
		commune: 'Maipú',
	},
	{
		id: '4',
		name: 'Sucursal Valparaíso',
		address: 'Av. Pedro Montt 2567',
		region: 'Región de Valparaíso',
		commune: 'Valparaíso',
	},
	{
		id: '5',
		name: 'Sucursal Concepción',
		address: "Av. O'Higgins 456",
		region: 'Región del Biobío',
		commune: 'Concepción',
	},
];

export function NewBranchSelectionCard() {
	const [selectedBranch, setSelectedBranch] = useState('');
	const branch = availableBranches.find((b) => b.id === selectedBranch);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-gray-900">
					2. Nueva sucursal solicitada
				</CardTitle>
			</CardHeader>
          <CardContent className="space-y-4">
            <div className={'flex flex-col gap-2'}>
              <Label htmlFor="new-branch">Nueva sucursal</Label>
              <Select
                  value={selectedBranch}
                  onValueChange={setSelectedBranch}
              >
                <SelectTrigger
                    id="new-branch"
                    className="mt-2 border border-gray-200"
                >
                  <SelectValue placeholder="Seleccione la nueva sucursal"/>
                </SelectTrigger>
                <SelectContent>
                  {availableBranches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {branch && (
                <>
                  <div>
                    <Label className="text-xs text-gray-600">Dirección</Label>
                    <div className="mt-2 flex items-start gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"/>
                      <span className="text-sm text-gray-900">
									{branch.direccion}
								</span>
                    </div>
                  </div>
                </>
            )}

            <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"/>
              <div>
                <p className="text-sm text-blue-900 font-medium">
                  Información importante
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  El cambio de sucursal se aplicará a futuras solicitudes y
                  despachos. Las solicitudes activas no se verán afectadas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
    );
}

