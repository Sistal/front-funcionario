import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select.jsx';
import { Info } from 'lucide-react';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const garments = [
  'Chaqueta de invierno',
  'Pantalón de trabajo',
  'Camisa corporativa',
  'Zapatos de seguridad',
  'Chaleco reflectante',
];

export function NewSelectionCard() {
  const [newSize, setNewSize] = useState('');
  const [newGarment, setNewGarment] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">3. Nueva selección</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className={'flex flex-col gap-2'}>
            <Label htmlFor="new-size">Nueva talla</Label>
            <Select value={newSize} onValueChange={setNewSize}>
              <SelectTrigger id="new-size" className="mt-2">
                <SelectValue placeholder="Seleccione la nueva talla"/>
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Label htmlFor="new-garment">Nueva prenda (opcional)</Label>
            <Select value={newGarment} onValueChange={setNewGarment}>
              <SelectTrigger id="new-garment" className="mt-2">
                <SelectValue placeholder="Seleccione si desea cambiar de prenda"/>
              </SelectTrigger>
              <SelectContent>
                {garments.map((garment) => (
                    <SelectItem key={garment} value={garment}>{garment}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900 font-medium">Información importante</p>
            <p className="text-sm text-blue-700 mt-1">El cambio está sujeto a validación según las reglas del sistema. El tiempo de procesamiento puede variar según disponibilidad de stock.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
