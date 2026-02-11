import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Checkbox } from '../ui/Checkbox.jsx';
import { AlertCircle } from 'lucide-react';

export function ConfirmationRulesCard() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">4. Confirmación y reglas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-900 font-medium mb-2">Consideraciones importantes</p>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>El cambio está sujeto a aprobación del administrador.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>El proceso de validación puede tardar algunos días hábiles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Las solicitudes activas no se verán afectadas por este cambio.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Solo podrás realizar un cambio de sucursal cada 90 días.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <Checkbox id="confirm" checked={confirmed} onChange={setConfirmed}/>
          <span className="cursor-pointer font-normal leading-relaxed" aria-hidden>{" "}Confirmo que la información ingresada es correcta y que he leído las consideraciones del cambio de sucursal</span>
        </div>
      </CardContent>
    </Card>
  );
}
