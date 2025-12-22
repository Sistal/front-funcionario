import { Button } from '../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/Select.jsx';
import { Plus } from 'lucide-react';

export function FilterBar({ filters = {}, onChange }) {
    const handleChange = (key) => (value) => {
        if (typeof onChange === 'function') {
            onChange({ ...filters, [key]: value });
        }
    };

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
                <Select value={filters.status ?? 'all'} onValueChange={handleChange('status')}>
                    <SelectTrigger className="w-48 border-gray-200 focus-visible:none">
                        <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent className={'border-gray-200 bg-white'}>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="approved">Aprobado</SelectItem>
                        <SelectItem value="in-progress">En proceso</SelectItem>
                        <SelectItem value="delivered">Entregado</SelectItem>
                        <SelectItem value="rejected">Rechazado</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filters.type ?? 'all'} onValueChange={handleChange('type')}>
                    <SelectTrigger className="w-48 border-gray-200 ">
                        <SelectValue placeholder="Tipo de solicitud" />
                    </SelectTrigger>
                    <SelectContent className={'border-gray-200 bg-white'}>
                        <SelectItem value="all">Todos los tipos</SelectItem>
                        <SelectItem value="uniform">Uniforme completo</SelectItem>
                        <SelectItem value="replacement">Reposición</SelectItem>
                        <SelectItem value="size-change">Cambio de talla</SelectItem>
                        <SelectItem value="garment-change">Cambio de prenda</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filters.period ?? 'all'} onValueChange={handleChange('period')}>
                    <SelectTrigger className="w-48 border-gray-200 ">
                        <SelectValue placeholder="Periodo" />
                    </SelectTrigger>
                    <SelectContent className={'border-gray-200 bg-white'}>
                        <SelectItem value="all">Todo el periodo</SelectItem>
                        <SelectItem value="current-month">Mes actual</SelectItem>
                        <SelectItem value="last-3-months">Últimos 3 meses</SelectItem>
                        <SelectItem value="last-6-months">Últimos 6 meses</SelectItem>
                        <SelectItem value="current-year">Año actual</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer">
                <Plus className="w-4 h-4 mr-2" />
                Nueva solicitud
            </Button>
        </div>
    );
}

