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
  const { user, checkAuth, logout } = useAuth();
  
  const [empresas, setEmpresas] = useState([]);
  const [segmentos, setSegmentos] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const [idEmpresa, setIdEmpresa] = useState('');
  const [idSegmento, setIdSegmento] = useState('');
  const [idSucursal, setIdSucursal] = useState('');

  const [initialLoading, setInitialLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
    
    if (idEmpresa) {
      coreApi.getSucursales(idEmpresa)
        .then((data) => {
          setSucursales(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error('Error cargando sucursales:', err);
        });
    }
  }, [idEmpresa]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!idEmpresa || !idSegmento || !idSucursal) {
      setError('Debes seleccionar empresa, segmento y sucursal.');
      return;
    }

    const payload = {
      id_empresa_cliente: Number(idEmpresa),
      id_segmento: Number(idSegmento),
      id_sucursal: Number(idSucursal)
    };

    try {
      setSubmitting(true);
      await registerInitialFuncionario(payload);
      setShowSuccess(true);
      setTimeout(async () => {
        // Refrescar completame el estado llamando a checkAuth
        // Esto confirmará si aún requiere_medidas.
        await checkAuth(); 
        navigate('/');
      }, 2000);
    } catch (submitError) {
      setError(submitError?.message || 'No se pudo registrar el funcionario.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 sm:p-6 relative">
      {/* Toast/Popup de Éxito */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg shadow-emerald-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">El ingreso de empresa fue exitoso</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-xl mx-auto">
        {/* Decorative logo or icon above the card can go here if needed */}
        <div className="mb-8 text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4 shadow-sm border border-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bienvenido al portal</h1>
          <p className="mt-2 text-gray-500">Configura tu perfil para comenzar</p>
        </div>

        <Card className="bg-white rounded-2xl shadow-xl overflow-hidden border-0 border-t-4 border-t-blue-600 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5 px-6 sm:px-8 bg-white/50 pt-6">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">
                Detalles asignación
              </CardTitle>
              <CardDescription className="mt-1 text-sm text-gray-500 font-medium">
                Selecciona la unidad de negocio a la que perteneces o estás actualmente laborando.
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout} 
              className="shrink-0 text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors rounded-lg font-medium"
            >
              Cerrar sesión
            </Button>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex gap-3 items-start">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-red-800">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Empresa cliente</label>
                  <Select value={idEmpresa} onValueChange={setIdEmpresa} disabled={initialLoading || empresas.length === 0}>
                    <SelectTrigger className="w-full bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors h-12 rounded-xl focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder={initialLoading ? "Cargando empresas..." : "Selecciona una empresa"} />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100 shadow-lg">
                      {empresas.map((empresa) => (
                        <SelectItem key={empresa.id || empresa.id_empresa} value={String(empresa.id || empresa.id_empresa)} className="cursor-pointer hover:bg-blue-50">
                          {empresa.nombre || empresa.razon_social || `Empresa ${empresa.id || empresa.id_empresa}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Segmento</label>
                  <Select value={idSegmento} onValueChange={setIdSegmento} disabled={!idEmpresa || segmentos.length === 0}>
                    <SelectTrigger className="w-full bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors h-12 rounded-xl focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder={!idEmpresa ? "Primero selecciona una empresa" : "Selecciona un segmento"} />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100 shadow-lg">
                      {segmentos.map((segmento) => (
                        <SelectItem key={segmento.id_segmento} value={String(segmento.id_segmento)} className="cursor-pointer hover:bg-blue-50">
                          {segmento.nombre_segmento}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Sucursal asignada</label>
                  <Select value={idSucursal} onValueChange={setIdSucursal} disabled={!idSegmento || sucursales.length === 0}>
                    <SelectTrigger className="w-full bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors h-12 rounded-xl focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder={!idSegmento ? "Primero selecciona un segmento" : "Selecciona una sucursal"} />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100 shadow-lg">
                      {sucursales.map((sucursal) => (
                        <SelectItem key={sucursal.id_sucursal} value={String(sucursal.id_sucursal)} className="cursor-pointer hover:bg-blue-50">
                          {sucursal.nombre_sucursal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </div>

              <div className="pt-6 mt-2 border-t border-gray-100">
                <Button
                  type="submit"
                  disabled={submitting || !idSucursal}
                  className="w-full h-12 text-[15px] font-medium transition-all rounded-xl 
                    bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none
                    flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                       <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Configurando acceso...
                    </>
                  ) : (
                    <>
                      Confirmar configuración
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Podrás solicitar un cambio de asignación posteriormente desde tu perfil.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
