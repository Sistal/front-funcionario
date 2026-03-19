import { useState, useEffect } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select.jsx';
import { requestsApi } from '../../api/requests.api.js';

export function EmptyState({ onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [uniformes, setUniformes] = useState([]);
    const [selectedUniforme, setSelectedUniforme] = useState('');
    const [loadingUniformes, setLoadingUniformes] = useState(false);

    useEffect(() => {
        if (modalOpen) {
            loadUniformes();
        }
    }, [modalOpen]);

    const loadUniformes = async () => {
        try {
            setLoadingUniformes(true);
            const data = await requestsApi.getUniformesDisponibles();
            // Si data es un array, se asume que cada item puede tener al menos un "id" y un "nombre" o "descripcion"
            setUniformes(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error al cargar uniformes:', error);
            // Si falla podríamos optar por alguna data por defecto o dejar vacío
            setUniformes([{ id: 'uniforme_completo', nombre: 'Uniforme Completo' }, { id: 'verano', nombre: 'Uniforme de Verano' }]);
        } finally {
            setLoadingUniformes(false);
        }
    };

    const handleSolicitarUniforme = async () => {
        if (!selectedUniforme) {
            alert('Por favor selecciona un uniforme');
            return;
        }
        
        try {
            setLoading(true);
            // Si el backend espera un string o un objeto, enviamos el ID o un nombre dependiendo
            const unif = uniformes.find(u => u.id === selectedUniforme || u.nombre === selectedUniforme);
            const itemNombre = unif ? (unif.nombre || unif.descripcion || unif.id) : selectedUniforme;
            
            await requestsApi.createUniforme({ items: [itemNombre] });
            setModalOpen(false);
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error al solicitar uniforme:', error);
            alert('Hubo un error al crear la solicitud');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No tienes solicitudes registradas</h3>
            <p className="text-gray-500 text-sm mb-6">
                Comienza creando tu primera solicitud de uniforme
            </p>
            <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white" 
                onClick={() => setModalOpen(true)}
            >
                Solicitar uniforme
            </Button>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => setModalOpen(false)} />
                    <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden z-10 animate-fade-in-up">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <FileText className="h-6 w-6" />
                                Solicitar Uniforme
                            </h3>
                            <button 
                                onClick={() => setModalOpen(false)}
                                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <div className="mb-6">
                                <p className="text-sm text-gray-600 mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-3 items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <span>Selecciona el tipo de uniforme que deseas solicitar para la temporada actual.</span>
                                </p>
                                
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Uniforme a solicitar</label>
                                <Select value={selectedUniforme} onValueChange={setSelectedUniforme} disabled={loadingUniformes}>
                                    <SelectTrigger className="w-full border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                                        <SelectValue placeholder={loadingUniformes ? "Cargando opciones..." : "Seleccionar uniforme"} />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {uniformes.length === 0 && !loadingUniformes ? (
                                            <SelectItem value="none" disabled>No hay opciones disponibles</SelectItem>
                                        ) : (
                                            uniformes.map((u, i) => {
                                                const val = u.id || u.nombre || `opt-${i}`;
                                                const label = u.nombre || u.descripcion || val;
                                                return <SelectItem key={val} value={val}>{label}</SelectItem>;
                                            })
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-3 justify-end mt-8 pt-4 border-t border-gray-100">
                                <Button 
                                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-5" 
                                    onClick={() => setModalOpen(false)}
                                    disabled={loading}
                                >
                                    Cancelar
                                </Button>
                                <Button 
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-sm" 
                                    onClick={handleSolicitarUniforme}
                                    disabled={loading || !selectedUniforme}
                                >
                                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {loading ? 'Solicitando...' : 'Confirmar solicitud'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

