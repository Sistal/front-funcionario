import React, { useState } from 'react';
import { UpdateSizesModal } from './UpdateSizesModal';

export default function SizesCard({ sizes }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-[14px] shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col gap-6 py-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">Mis tallas</h3>
          <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 flex flex-col p-3 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500 uppercase font-medium tracking-wider">Talla general</span>
            <span className="text-lg font-semibold text-gray-900 mt-1">{sizes.general}</span>
          </div>
          <div className="bg-gray-50 flex flex-col p-3 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500 uppercase font-medium tracking-wider">Estatura</span>
            <span className="text-lg font-semibold text-gray-900 mt-1">{sizes.estatura}</span>
          </div>
          <div className="bg-gray-50 flex flex-col p-3 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500 uppercase font-medium tracking-wider">Pecho</span>
            <span className="text-lg font-semibold text-gray-900 mt-1">{sizes.pecho}</span>
          </div>
          <div className="bg-gray-50 flex flex-col p-3 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500 uppercase font-medium tracking-wider">Cintura</span>
            <span className="text-lg font-semibold text-gray-900 mt-1">{sizes.cintura}</span>
          </div>
          <div className="bg-gray-50 flex flex-col p-3 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500 uppercase font-medium tracking-wider">Cadera</span>
            <span className="text-lg font-semibold text-gray-900 mt-1">{sizes.cadera}</span>
          </div>
          <div className="bg-gray-50 flex flex-col p-3 rounded-xl border border-gray-100">
            <span className="text-xs text-gray-500 uppercase font-medium tracking-wider">Manga</span>
            <span className="text-lg font-semibold text-gray-900 mt-1">{sizes.manga}</span>
          </div>
        </div>

        <button 
          onClick={() => setModalOpen(true)}
          className="mt-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Actualizar mis tallas
        </button>
      </div>
      
      <UpdateSizesModal 
        sizes={sizes} 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        onUpdate={async (newData) => {
          // Si tienes un estado o un contexto para refrescar, lo ideal es llamarlo aquí
          // Por el momento, recargamos la página o dejamos que la lógica padre lo actualice.
          window.location.reload(); 
        }}
      /> 
      />
    </>
  );
}

