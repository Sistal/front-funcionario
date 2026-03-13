import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createFuncionario } from '../api/funcionario.api';

function toNumberOrNull(value) {
  if (value === '' || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export default function RegistroFuncionario() {
  const navigate = useNavigate();
  const { user, completeFuncionarioRegistration, logout } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const initialData = useMemo(
    () => ({
      rut_funcionario: '',
      nombres: '',
      apellido_paterno: '',
      apellido_materno: '',
      celular: '',
      telefono: '',
      email: '',
      tallas_registradas: false,
      direccion: '',
      fecha_creacion: '',
      fecha_modificacion: '',
      id_genero: '',
      id_medidas: '',
      id_usuario: user?.id_usuario ? String(user.id_usuario) : '',
      id_estado: '1',
      id_sucursal: '',
      id_empresa_cliente: '',
      id_segmento: '',
      id_cargo: '',
    }),
    [user?.id_usuario]
  );

  const [formData, setFormData] = useState(initialData);

  const handleChange = (field) => (event) => {
    const value = field === 'tallas_registradas' ? event.target.checked : event.target.value;
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.id_usuario) {
      setError('No se pudo obtener el id_usuario desde la sesión actual.');
      return;
    }

    const payload = {
      rut_funcionario: formData.rut_funcionario.trim(),
      nombres: formData.nombres.trim(),
      apellido_paterno: formData.apellido_paterno.trim(),
      apellido_materno: formData.apellido_materno.trim() || null,
      celular: formData.celular.trim() || null,
      telefono: formData.telefono.trim() || null,
      email: formData.email.trim() || null,
      tallas_registradas: Boolean(formData.tallas_registradas),
      direccion: formData.direccion.trim() || null,
      fecha_creacion: formData.fecha_creacion || null,
      fecha_modificacion: formData.fecha_modificacion || null,
      id_genero: toNumberOrNull(formData.id_genero),
      id_medidas: toNumberOrNull(formData.id_medidas),
      id_usuario: toNumberOrNull(formData.id_usuario),
      id_estado: toNumberOrNull(formData.id_estado),
      id_sucursal: toNumberOrNull(formData.id_sucursal),
      id_empresa_cliente: toNumberOrNull(formData.id_empresa_cliente),
      id_segmento: toNumberOrNull(formData.id_segmento),
      id_cargo: toNumberOrNull(formData.id_cargo),
    };

    try {
      setSubmitting(true);
      await createFuncionario(payload);
      completeFuncionarioRegistration();
      navigate('/');
    } catch (submitError) {
      setError(submitError?.message || 'No se pudo registrar el funcionario.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto w-full max-w-5xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Registro de funcionario</h1>
            <p className="mt-2 text-sm text-slate-600">
              Tu usuario existe, pero no tiene un funcionario asociado. Completa los datos para continuar.
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            Cerrar sesion
          </button>
        </div>

        {error ? (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-8">
          <section>
            <h2 className="mb-4 text-base font-semibold text-slate-900">Datos personales</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="RUT funcionario" required>
                <input
                  value={formData.rut_funcionario}
                  onChange={handleChange('rut_funcionario')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                  placeholder="12345678-9"
                  required
                />
              </Field>
              <Field label="Nombres" required>
                <input
                  value={formData.nombres}
                  onChange={handleChange('nombres')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                  required
                />
              </Field>
              <Field label="Apellido paterno" required>
                <input
                  value={formData.apellido_paterno}
                  onChange={handleChange('apellido_paterno')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                  required
                />
              </Field>
              <Field label="Apellido materno">
                <input
                  value={formData.apellido_materno}
                  onChange={handleChange('apellido_materno')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
              <Field label="Celular">
                <input
                  value={formData.celular}
                  onChange={handleChange('celular')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
              <Field label="Telefono">
                <input
                  value={formData.telefono}
                  onChange={handleChange('telefono')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
              <Field label="Direccion">
                <input
                  value={formData.direccion}
                  onChange={handleChange('direccion')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-base font-semibold text-slate-900">Datos administrativos</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="ID usuario" required>
                <input
                  value={formData.id_usuario}
                  onChange={handleChange('id_usuario')}
                  className="w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2"
                  readOnly
                  required
                />
              </Field>
              <Field label="ID estado" required>
                <input
                  type="number"
                  value={formData.id_estado}
                  onChange={handleChange('id_estado')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                  required
                />
              </Field>
              <Field label="ID genero">
                <input
                  type="number"
                  value={formData.id_genero}
                  onChange={handleChange('id_genero')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
              <Field label="ID medidas">
                <input
                  type="number"
                  value={formData.id_medidas}
                  onChange={handleChange('id_medidas')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
              <Field label="ID sucursal">
                <input
                  type="number"
                  value={formData.id_sucursal}
                  onChange={handleChange('id_sucursal')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
              <Field label="ID empresa cliente">
                <input
                  type="number"
                  value={formData.id_empresa_cliente}
                  onChange={handleChange('id_empresa_cliente')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
              <Field label="ID segmento">
                <input
                  type="number"
                  value={formData.id_segmento}
                  onChange={handleChange('id_segmento')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
              <Field label="ID cargo">
                <input
                  type="number"
                  value={formData.id_cargo}
                  onChange={handleChange('id_cargo')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-base font-semibold text-slate-900">Fechas y estado</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Fecha creacion">
                <input
                  type="date"
                  value={formData.fecha_creacion}
                  onChange={handleChange('fecha_creacion')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
              <Field label="Fecha modificacion">
                <input
                  type="date"
                  value={formData.fecha_modificacion}
                  onChange={handleChange('fecha_modificacion')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </Field>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.tallas_registradas}
                  onChange={handleChange('tallas_registradas')}
                />
                Tallas registradas
              </label>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Registrando...' : 'Registrar funcionario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, required = false, children }) {
  return (
    <label className="block text-sm text-slate-700">
      <span className="mb-1 block font-medium">
        {label}
        {required ? ' *' : ''}
      </span>
      {children}
    </label>
  );
}
