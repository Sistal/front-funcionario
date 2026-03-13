import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select.jsx';
import { Info, MapPin } from 'lucide-react';

export function NewBranchSelectionCard({ branches = [], value, onChange }) {
  const branch = branches.find((item) => String(item.id) === String(value));

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
                  value={value}
                  onValueChange={onChange}
              >
                <SelectTrigger
                    id="new-branch"
                    className="mt-2 border border-gray-200"
                >
                  <SelectValue placeholder="Seleccione la nueva sucursal"/>
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                      <SelectItem key={branch.id} value={String(branch.id)}>
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
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0"/>
                      <span className="text-sm text-gray-900">
									{branch.direccion}
								</span>
                    </div>
                  </div>
                </>
            )}

            <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5"/>
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

