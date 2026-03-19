import React, { useState, useEffect } from 'react';
import { updateMyMedidas } from '../../api/funcionario.api';

export function UpdateSizesModal({ sizes, open = false, onClose = () => {}, onUpdate = () => {} }) {
  const [formData, setFormData] = useState({
    estatura: '',
    pecho: '',
    cintura: '',
    cadera: '',
    manga: ''
  });

  useEffect(() => {
    if (sizes) {
      setFormData({
        estatura: sizes.estatura?.toString().replace(' m', '') || '',
        pecho: sizes.pecho?.toString().replace(' cm', '') || '',
        cintura: sizes.cintura?.toString().replace(' cm', '') || '',
        cadera: sizes.cadera?.toString().replace(' cm', '') || '',
        manga: sizes.manga?.toString().replace(' cm', '') || ''
      });
    }
  }, [sizes]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir strings a números cuando aplique antes de enviarlos, según el payload que espera
      const payload = {
        estatura_m: parseFloat(formData.estatura) || 0,
        pecho_cm: parseFloat(formData.pecho) || 0,
        cintura_cm: parseFloat(formData.cintura) || 0,
        cadera_cm: parseFloat(formData.cadera) || 0,
        manga_cm: parseFloat(formData.manga) || 0,
      };
      
      await updateMyMedidas(payload);
      onUpdate(payload);
      onClose();
    } catch (error) {
      console.error("Error al actualizar las medidas:", error);
      alert("Hubo un error al actualizar las tallas");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden z-10 animate-fade-in-up">
        
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Actualizar medidas
          </h3>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-6 bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-3 items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Ingresa tus medidas corporales (en centímetros o centímetros) para asegurarnos de que el uniforme sea de tu talla ideal.</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Estatura <span className="font-normal text-gray-500">(m)</span></label>
                <div className="relative">
                  <input 
                    type="number" step="0.01"
                    value={formData.estatura} 
                    onChange={handleChange('estatura')}
                    className="w-full border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
                    placeholder="Ej: 1.75" 
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 font-medium text-sm">m</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pecho <span className="font-normal text-gray-500">(cm)</span></label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={formData.pecho} 
                    onChange={handleChange('pecho')}
                    className="w-full border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
                    placeholder="Ej: 96" 
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 font-medium text-sm">cm</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cintura <span className="font-normal text-gray-500">(cm)</span></label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={formData.cintura} 
                    onChange={handleChange('cintura')}
                    className="w-full border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
                    placeholder="Ej: 82" 
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 font-medium text-sm">cm</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cadera <span className="font-normal text-gray-500">(cm)</span></label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={formData.cadera} 
                    onChange={handleChange('cadera')}
                    className="w-full border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
                    placeholder="Ej: 98" 
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 font-medium text-sm">cm</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Manga <span className="font-normal text-gray-500">(cm)</span></label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={formData.manga} 
                    onChange={handleChange('manga')}
                    className="w-full border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" 
                    placeholder="Ej: 65" 
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 font-medium text-sm">cm</div>
                </div>
              </div>

            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                Guardar medidas
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}