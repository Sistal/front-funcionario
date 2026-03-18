import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { registerInitialFuncionario } from '../api/funcionario.api';
import { coreApi } from '../api/core.api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/common/Select';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';

export default function RegistroFuncionario() {
  const navigate = useNavigate();
  const { user, completeFuncionarioRegistration, logout } = useAuth();
  
  const [empresas, setEmpresas] = useState([]);
  const [segmentos, setSegmentos] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const [idEmpresa, setIdEmpresa] = useState('');
  const [idSegmento, setIdSegmento] = useState('');
  const [idSucursal, setIdSucursal] = useState('');

  const [initialLoading, setInitialLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    coreApi.getEmpresas()
      .then((data) => {
        setEmpresas(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Error cargando empresas:', err);
      })
      .finally(() => {
        setInitialLoading(false);
      });
  }, []);

  useEffect(() => {
    setIdSegmento('');
    setIdSucursal('');
    setSegmentos([]);
    setSucursales([]);
    
    if (idEmpresa) {
      coreApi.getSegmentos(idEmpresa)
        .then((data) => {
          setSegmentos(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error('Error cargando segmentos:', err);
        });
    }
  }, [idEmpresa]);

  useEffect(() => {
    setIdSucursal('');
    setSucursales([]);
    
    if (idSegmento) {
      coreApi.getSucursales(idSegmento)
        .then((data) => {
          setSucursales(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error('Error cargando sucursales:', err);
        });
    }
  }, [idSegmento]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!idEmpresa || !idSegmento || !idSucursal) {
      setError('Debes seleccionar empresa, segmento y sucursal.');
      return;
    }

    const payload = {
      id_empresa: Number(idEmpresa),
      id_segmento: Number(idSegmento),
      id_sucursal: Number(idSucursal)
    };

    try {
      setSubmitting(true);
      await registerInitialFuncionario(payload);
      completeFuncionarioRegistration();
      navigate('/');
    } catch (submitError) {
      setError(submitError?.message || 'No se pudo registrar el funcionario.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 flex flex-col items-center">
      <Card className="w-full max-w-xl shadow-sm border-slate-200">
        <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Registro de funcionario
            </CardTitle>
            <CardDescription className="mt-2 text-sm text-slate-600">
              Bienvenido. Por favor, selecciona la unidad de negocio a la que perteneces para continuar.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="shrink-0 text-slate-700">
            Cerrar sesión
          </Button>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Empresa *</label>
                <Select value={idEmpresa} onValueChange={setIdEmpresa} disabled={initialLoading || empresas.length === 0}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={initialLoading ? "Cargando empresas..." : "Selecciona una empresa"} />
                  </SelectTrigger>
                  <SelectContent>
                    {empresas.map((empresa) => (
                      <SelectItem key={empresa.id || empresa.id_empresa} value={String(empresa.id || empresa.id_empresa)}>
                        {empresa.nombre || empresa.razon_social || `Empresa ${empresa.id || empresa.id_empresa}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Segmento *</label>
                <Select value={idSegmento} onValueChange={setIdSegmento} disabled={!idEmpresa || segmentos.length === 0}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={!idEmpresa ? "Primero selecciona una empresa" : "Selecciona un segmento"} />
                  </SelectTrigger>
                  <SelectContent>
                    {segmentos.map((segmento) => (
                      <SelectItem key={segmento.id || segmento.id_segmento} value={String(segmento.id || segmento.id_segmento)}>
                        {segmento.nombre || `Segmento ${segmento.id || segmento.id_segmento}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Sucursal *</label>
                <Select value={idSucursal} onValueChange={setIdSucursal} disabled={!idSegmento || sucursales.length === 0}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={!idSegmento ? "Primero selecciona un segmento" : "Selecciona una sucursal"} />
                  </SelectTrigger>
                  <SelectContent>
                    {sucursales.map((sucursal) => (
                      <SelectItem key={sucursal.id || sucursal.id_sucursal} value={String(sucursal.id || sucursal.id_sucursal)}>
                        {sucursal.nombre || `Sucursal ${sucursal.id || sucursal.id_sucursal}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <Button
                type="submit"
                disabled={submitting || !idSucursal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                {submitting ? 'Confirmando...' : 'Confirmar y Entrar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
