import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Input } from '../ui/Input.jsx';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';
import { User, Mail, Briefcase, Building2, CreditCard } from 'lucide-react';

export function PersonalInfoCard({ profile, onUpdate }) {
  // Función para formatear RUT
  const formatRut = (rut) => {
    if (!rut) return '-';
    const cleaned = rut.replace(/\D/g, '');
    if (cleaned.length <= 1) return cleaned;
    const dv = cleaned.slice(-1);
    const number = cleaned.slice(0, -1);
    return `${number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`;
  };

  // Construir nombre completo
  const fullName = profile 
    ? `${profile.nombres || ''} ${profile.apellido_paterno || ''} ${profile.apellido_materno || ''}`.trim()
    : '-';

  const email = profile?.email || '-';
  const rut = formatRut(profile?.rut_funcionario);
  const cargo = profile?.cargo?.nombre_cargo || '-';
  const sucursal = profile?.sucursal?.nombre_sucursal || '-';
  const estado = profile?.estado?.nombre_estado || 'Activo';

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
            <Input value={fullName} readOnly className="mt-2 bg-gray-50 border border-gray-200"/>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <CreditCard className="w-4 h-4"/>
              RUT
            </Label>
            <Input value={rut} readOnly className="mt-2 bg-gray-50 border border-gray-200"/>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <Mail className="w-4 h-4"/>
              Correo electrónico principal
            </Label>
            <Input value={email} readOnly className="mt-2 bg-gray-50 border border-gray-200"/>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <Briefcase className="w-4 h-4"/>
              Cargo
            </Label>
            <Input value={cargo} readOnly className="mt-2 bg-gray-50 border border-gray-200"/>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <Building2 className="w-4 h-4"/>
              Sucursal actual
            </Label>
            <Input value={sucursal} readOnly className="mt-2 bg-gray-50 border border-gray-200"/>
          </div>

          <div>
            <Label className="text-xs text-gray-600">Estado de la cuenta</Label>
            <div className="flex items-center h-10">
              <Badge className="bg-green-100 text-green-800 border-green-200">{estado}</Badge>
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
