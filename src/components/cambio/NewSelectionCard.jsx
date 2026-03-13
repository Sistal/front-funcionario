import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select.jsx';
import { Info } from 'lucide-react';

export function NewSelectionCard({ sizes = [], garments = [], newSize, newGarment, onSizeChange, onGarmentChange }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">3. Nueva selección</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className={'flex flex-col gap-2'}>
            <Label htmlFor="new-size">Nueva talla</Label>
            <Select value={newSize} onValueChange={onSizeChange}>
              <SelectTrigger id="new-size" className="mt-2">
                <SelectValue placeholder="Seleccione la nueva talla"/>
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                    <SelectItem key={size.id} value={size.label}>{size.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Label htmlFor="new-garment">Nueva prenda (opcional)</Label>
            <Select value={newGarment} onValueChange={onGarmentChange}>
              <SelectTrigger id="new-garment" className="mt-2">
                <SelectValue placeholder="Seleccione si desea cambiar de prenda"/>
              </SelectTrigger>
              <SelectContent>
                {garments.map((garment) => (
                    <SelectItem key={garment.id} value={garment.label}>{garment.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900 font-medium">Información importante</p>
            <p className="text-sm text-blue-700 mt-1">El cambio está sujeto a validación según las reglas del sistema. El tiempo de procesamiento puede variar según disponibilidad de stock.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
