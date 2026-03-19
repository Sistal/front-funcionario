import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { registerInitialMedidas } from '../api/funcionario.api';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';

export default function RegistroMedidas() {
  const navigate = useNavigate();
  const { completeMedidasRegistration, logout } = useAuth();
  
  const [formData, setFormData] = useState({
    estatura: '',
    pecho: '',
    cintura: '',
    cadera: '',
    manga: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.estatura || !formData.pecho || !formData.cintura || !formData.cadera || !formData.manga) {
      setError('Por favor completa todos los campos de medidas.');
      return;
    }

    const payload = {
      estatura_m: parseFloat(formData.estatura) || 0,
      pecho_cm: parseFloat(formData.pecho) || 0,
      cintura_cm: parseFloat(formData.cintura) || 0,
      cadera_cm: parseFloat(formData.cadera) || 0,
      manga_cm: parseFloat(formData.manga) || 0,
    };

    try {
      setSubmitting(true);
      await registerInitialMedidas(payload); // Endpoint POST para registrar medidas iniciales
      setShowSuccess(true);
      setTimeout(() => {
        completeMedidasRegistration();
        navigate('/');
      }, 2000);
    } catch (submitError) {
      setError(submitError?.message || 'No se pudieron registrar las medidas.');
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
            <span className="font-medium">El ingreso de medidas fue exitoso</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-xl mx-auto">
        <div className="mb-8 text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4 shadow-sm border border-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Casi terminamos</h1>
          <p className="mt-2 text-gray-500">Necesitamos tus medidas para las prendas de tu uniforme</p>
        </div>

        <Card className="bg-white rounded-2xl shadow-xl overflow-hidden border-0 border-t-4 border-t-blue-600 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5 px-6 sm:px-8 bg-white/50 pt-6">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">
                Registro de Medidas
              </CardTitle>
              <CardDescription className="mt-1 text-sm text-gray-500 font-medium">
                Ingresa tus medidas corporales para asegurarnos de que el uniforme sea de tu talla ideal.
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
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-red-800">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">Estatura <span className="font-normal text-gray-500">(m)</span></label>
                  <div className="relative">
                    <input 
                      type="number" step="0.01"
                      value={formData.estatura} 
                      onChange={handleChange('estatura')}
                      className="w-full border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-gray-50 hover:bg-white focus:bg-white" 
                      placeholder="Ej: 1.75" 
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 font-medium text-sm">m</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">Pecho <span className="font-normal text-gray-500">(cm)</span></label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formData.pecho} 
                      onChange={handleChange('pecho')}
                      className="w-full border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-gray-50 hover:bg-white focus:bg-white" 
                      placeholder="Ej: 96" 
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 font-medium text-sm">cm</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">Cintura <span className="font-normal text-gray-500">(cm)</span></label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formData.cintura} 
                      onChange={handleChange('cintura')}
                      className="w-full border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-gray-50 hover:bg-white focus:bg-white" 
                      placeholder="Ej: 82" 
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 font-medium text-sm">cm</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">Cadera <span className="font-normal text-gray-500">(cm)</span></label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formData.cadera} 
                      onChange={handleChange('cadera')}
                      className="w-full border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-gray-50 hover:bg-white focus:bg-white" 
                      placeholder="Ej: 98" 
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 font-medium text-sm">cm</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 ml-1 mb-1.5">Manga <span className="font-normal text-gray-500">(cm)</span></label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formData.manga} 
                      onChange={handleChange('manga')}
                      className="w-full border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-gray-50 hover:bg-white focus:bg-white" 
                      placeholder="Ej: 65" 
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 font-medium text-sm">cm</div>
                  </div>
                </div>

              </div>

              <div className="pt-6 mt-2 border-t border-gray-100">
                <Button
                  type="submit"
                  disabled={submitting}
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
                      Guardando medidas...
                    </>
                  ) : (
                    <>
                      Guardar y Entrar
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Podrás actualizar tus medidas posteriormente desde tu perfil.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
