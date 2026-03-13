import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select.jsx';
import { Checkbox } from '../ui/Checkbox.jsx';
import { Button } from '../ui/Button.jsx';
import { Settings } from 'lucide-react';
import { updatePreferences } from '../../api/funcionario.api.js';

export function PreferencesCard({ profile, onUpdate }) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmailNotifications(Boolean(profile?.preferences?.notifications?.email));
    setSystemNotifications(Boolean(profile?.preferences?.notifications?.push));
    setSmsNotifications(Boolean(profile?.preferences?.notifications?.sms));
    setTheme(profile?.preferences?.theme || 'light');
  }, [profile]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = {
        notifications: {
          email: emailNotifications,
          push: systemNotifications,
          sms: smsNotifications,
        },
        theme,
      };
      const response = await updatePreferences(payload);
      
      if (response && response.notifications) {
        setEmailNotifications(response.notifications.email);
        setSystemNotifications(response.notifications.push);
        setSmsNotifications(response.notifications.sms);
      }
      if (response && response.theme) {
        setTheme(response.theme);
      }
      if (typeof onUpdate === 'function') {
        await onUpdate();
      }
      window.alert('Preferencias guardadas exitosamente');
    } catch (e) {
      console.error(e);
      window.alert(e.message || 'Error guardando preferencias');
    } finally {
      setLoading(false);
    }
  };

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
            <div className="flex items-center gap-3">
              <Checkbox id="sms-notifications" checked={smsNotifications} onChange={setSmsNotifications} />
              <span className="cursor-pointer font-normal">Recibir alertas por SMS</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Las notificaciones te mantendrán informado sobre el estado de tus solicitudes y despachos</p>
        </div>

        <div>
          <Label htmlFor="theme" className="text-sm text-gray-700 mb-2 block">Tema de la aplicación</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger id="theme" className="w-full max-w-xs border border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Claro</SelectItem>
              <SelectItem value="dark">Oscuro</SelectItem>
              <SelectItem value="system">Sistema</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-2">Se sincroniza con las preferencias disponibles del funcionario en el BFF</p>
        </div>
        <div className="pt-4 mt-6">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar preferencias'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
