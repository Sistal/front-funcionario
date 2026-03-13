import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Input } from '../ui/Input.jsx';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';
import { User, Mail, Briefcase, Building2, CreditCard, Phone, MapPin } from 'lucide-react';
import { updateMyProfile } from '../../api/funcionario.api.js';

export function PersonalInfoCard({ profile, onUpdate }) {
  const [formData, setFormData] = useState({
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    celular: '',
    telefono: '',
    direccion: '',
  });
  const [loading, setLoading] = useState(false);

  const formatRut = (rut) => {
    if (!rut) return '-';
    const cleaned = rut.replace(/\D/g, '');
    if (cleaned.length <= 1) return cleaned;
    const dv = cleaned.slice(-1);
    const number = cleaned.slice(0, -1);
    return `${number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`;
  };

  useEffect(() => {
    setFormData({
      nombres: profile?.nombres || '',
      apellido_paterno: profile?.apellido_paterno || '',
      apellido_materno: profile?.apellido_materno || '',
      email: profile?.email || '',
      celular: profile?.celular || '',
      telefono: profile?.telefono || '',
      direccion: profile?.direccion || '',
    });
  }, [profile]);

  const handleChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateMyProfile(formData);
      if (typeof onUpdate === 'function') {
        await onUpdate();
      }
      window.alert('Información actualizada correctamente');
    } catch (error) {
      console.error(error);
      window.alert(error.message || 'No se pudo actualizar la información');
    } finally {
      setLoading(false);
    }
  };

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

          <div className={'flex flex-col gap-2'}>
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <Phone className="w-4 h-4"/>
              Celular
            </Label>
            <Input value={formData.celular} onChange={handleChange('celular')} className="mt-2 border border-gray-200"/>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <Phone className="w-4 h-4"/>
              Teléfono
            </Label>
            <Input value={formData.telefono} onChange={handleChange('telefono')} className="mt-2 border border-gray-200"/>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <Mail className="w-4 h-4"/>
              Correo de contacto
            </Label>
            <Input value={formData.email} onChange={handleChange('email')} className="mt-2 border border-gray-200"/>
          </div>

          <div className="col-span-2 flex flex-col gap-2">
            <Label className="text-xs text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4"/>
              Dirección
            </Label>
            <Input value={formData.direccion} onChange={handleChange('direccion')} className="mt-2 border border-gray-200"/>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            Puedes actualizar tus datos de contacto directamente desde esta pantalla.
          </p>
          <Button className={'w-max'} onClick={handleSave} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </CardContent>
    </Card>
);
}
