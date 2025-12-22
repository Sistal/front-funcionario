import { FileText } from 'lucide-react';
import { Button } from '../ui/Button.jsx';

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No tienes solicitudes registradas</h3>
            <p className="text-gray-500 text-sm mb-6">
                Comienza creando tu primera solicitud de uniforme
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
                Solicitar uniforme
            </Button>
        </div>
    );
}

