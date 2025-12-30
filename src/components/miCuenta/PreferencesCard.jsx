import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select.jsx';
import { Checkbox } from '../ui/Checkbox.jsx';
import { Settings } from 'lucide-react';

export function PreferencesCard() {
  const [language, setLanguage] = useState('es');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [textSize, setTextSize] = useState('medium');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-gray-900">Preferencias del sistema</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="language" className="text-sm text-gray-700 mb-2 block">Idioma de la interfaz</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language" className="w-full max-w-xs border border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="pt">Português</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm text-gray-700 mb-3 block">Preferencias de notificaciones</Label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox id="email-notifications" checked={emailNotifications} onChange={setEmailNotifications} />
              <span className="cursor-pointer font-normal">Recibir notificaciones por correo electrónico</span>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="system-notifications" checked={systemNotifications} onChange={setSystemNotifications} />
              <span className="cursor-pointer font-normal">Mostrar notificaciones dentro del sistema</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Las notificaciones te mantendrán informado sobre el estado de tus solicitudes y despachos</p>
        </div>

        <div>
          <Label htmlFor="text-size" className="text-sm text-gray-700 mb-2 block">Tamaño de texto (Accesibilidad)</Label>
          <Select value={textSize} onValueChange={setTextSize}>
            <SelectTrigger id="text-size" className="w-full max-w-xs border border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Pequeño</SelectItem>
              <SelectItem value="medium">Mediano (Predeterminado)</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
              <SelectItem value="extra-large">Muy grande</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-2">Ajusta el tamaño del texto para mejorar la legibilidad</p>
        </div>
      </CardContent>
    </Card>
  );
}
