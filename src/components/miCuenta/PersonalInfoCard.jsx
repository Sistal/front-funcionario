import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Input } from '../ui/Input.jsx';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';
import { User, Mail, Briefcase, Building2, CreditCard } from 'lucide-react';

export function PersonalInfoCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">Información personal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className={'flex flex-col gap-2'}>
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <User className="w-4 h-4"/>
              Nombre completo
            </Label>
            <Input value="Juan Carlos Pérez González" readOnly className="mt-2 bg-gray-50 border border-gray-200"/>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <CreditCard className="w-4 h-4"/>
              RUT
            </Label>
            <Input value="18.456.789-2" readOnly className="mt-2 bg-gray-50 border border-gray-200"/>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <Mail className="w-4 h-4"/>
              Correo electrónico principal
            </Label>
            <Input value="juan.perez@empresa.cl" readOnly className="mt-2 bg-gray-50 border border-gray-200"/>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <Briefcase className="w-4 h-4"/>
              Cargo
            </Label>
            <Input value="Analista de Operaciones" readOnly className="mt-2 bg-gray-50 border border-gray-200"/>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <Building2 className="w-4 h-4"/>
              Sucursal actual
            </Label>
            <Input value="Sucursal Santiago Centro" readOnly className="mt-2 bg-gray-50 border border-gray-200"/>
          </div>

          <div>
            <Label className="text-xs text-gray-600">Estado de la cuenta</Label>
            <div className="flex items-center h-10">
              <Badge className="bg-green-100 text-green-800 border-green-200">Activo</Badge>
            </div>
          </div>
        </div>

          <div className="pt-4 border-t border-gray-200 flex flex-col gap-2">
            <p className="text-sm text-gray-600 mb-3">
              Si necesitas actualizar tu información personal, debes solicitar la actualización al departamento de
              Recursos Humanos.
            </p>
            <Button className={'w-max'} variant="outline">Solicitar actualización de datos</Button>
          </div>
      </CardContent>
    </Card>
);
}
