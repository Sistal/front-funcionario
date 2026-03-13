import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Input } from '../ui/Input.jsx';
import { Building2, MapPin, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/date.js';

export function CurrentBranchCard({ branch, loading = false }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">1. Información actual</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-medium mb-1">Sucursal actual</p>
              <p className="text-blue-700">Esta es tu sucursal de adscripción actual</p>
            </div>
          </div>
        </div>

          <div className="grid grid-cols-2 gap-4">
              <div className={'flex flex-col gap-2'}>
                  <Label className="text-xs text-gray-600">Sucursal actual</Label>
                  <Input value={loading ? 'Cargando...' : branch?.nombre_sucursal || '-'} readOnly className="mt-2 bg-gray-50 border border-gray-200"/>
              </div>

              <div className={'flex flex-col gap-2'}>
                  <Label className="text-xs text-gray-600">Fecha de última actualización</Label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                      <Calendar className="w-4 h-4 text-gray-400"/>
                      <span className="text-sm text-gray-900">{formatDate(new Date())}</span>
                  </div>
              </div>

              <div className="col-span-2">
                  <Label className="text-xs text-gray-600">Dirección</Label>
                  <div className="mt-2 flex items-start gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"/>
                      <span className="text-sm text-gray-900">{branch?.direccion || '-'}</span>
                  </div>
              </div>
          </div>
      </CardContent>
    </Card>
  );
}
