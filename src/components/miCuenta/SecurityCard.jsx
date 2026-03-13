import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card.jsx';
import { Label } from '../ui/Label.jsx';
import { Input } from '../ui/Input.jsx';
import { Button } from '../ui/Button.jsx';
import { Separator } from '../ui/Separator.jsx';
import { Shield, Mail, Lock, Info } from 'lucide-react';
import { updateSecurity } from '../../api/funcionario.api.js';
import { changePassword } from '../../api/auth.api.js';

export function SecurityCard({ profile }) {
  const [recoveryEmail, setRecoveryEmail] = useState(profile?.recoveryEmail || '');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    password_actual: '',
    password_nueva: '',
    password_confirmacion: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleChangePasswordField = (field) => (event) => {
    setPasswordForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleChangePassword = async () => {
    try {
      setPasswordLoading(true);
      await changePassword(passwordForm);
      setPasswordForm({
        password_actual: '',
        password_nueva: '',
        password_confirmacion: '',
      });
      window.alert('Contraseña actualizada correctamente');
    } catch (error) {
      console.error(error);
      window.alert(error.message || 'No se pudo actualizar la contraseña');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSaveRecoveryEmail = async () => {
    try {
      setLoading(true);
      await updateSecurity({ recoveryEmail });
      setIsEditingEmail(false);
      alert('Correo de recuperación actualizado correctamente');
    } catch (e) {
      console.error(e);
      alert('Error actualizando correo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-gray-900">Seguridad de la cuenta</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="recovery-email" className="text-xs text-gray-600 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Correo electrónico de recuperación
          </Label>
          <div className="flex gap-3 mt-2">
            <Input
              id="recovery-email"
              type="email"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              readOnly={!isEditingEmail}
              className={!isEditingEmail ? 'bg-gray-50 border border-gray-200' : 'border border-gray-200'}
            />
            {!isEditingEmail ? (
              <Button
                variant="outline"
                onClick={() => setIsEditingEmail(true)}
                className="whitespace-nowrap"
                disabled={loading}
              >
                Editar correo
              </Button>
            ) : (
              <Button
                onClick={handleSaveRecoveryEmail}
                className="whitespace-nowrap bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">Este correo se utilizará para recuperar tu cuenta en caso de olvido de contraseña</p>
        </div>

        <Separator />

        <div>
          <div className="space-y-3">
            <Label className="text-xs text-gray-600 flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4" />
              Contraseña
            </Label>
            <Input
              type="password"
              value={passwordForm.password_actual}
              onChange={handleChangePasswordField('password_actual')}
              placeholder="Contraseña actual"
              className="border border-gray-200"
            />
            <Input
              type="password"
              value={passwordForm.password_nueva}
              onChange={handleChangePasswordField('password_nueva')}
              placeholder="Nueva contraseña"
              className="border border-gray-200"
            />
            <Input
              type="password"
              value={passwordForm.password_confirmacion}
              onChange={handleChangePasswordField('password_confirmacion')}
              placeholder="Confirmar nueva contraseña"
              className="border border-gray-200"
            />
            <div className="flex justify-end">
              <Button onClick={handleChangePassword} className="bg-blue-600 hover:bg-blue-700 text-white" disabled={passwordLoading}>
                {passwordLoading ? 'Actualizando...' : 'Cambiar contraseña'}
              </Button>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">Por seguridad, se recomienda cambiar la contraseña periódicamente y usar una combinación de letras, números y símbolos.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
