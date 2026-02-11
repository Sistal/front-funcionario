import {useState} from "react";
import {StatCard} from "../components/cards/StatCard.jsx";
import {FilterBar} from "../components/requests/FilterBar.jsx";
import {EmptyState} from "../components/requests/EmptyState.jsx";
import {RequestsTable} from "../components/requests/RequestsTable.jsx";


const MOCK_REQUEST = [
    {
        id: 'SOL-2024-1547',
        date: '12/12/2024',
        type: 'Uniforme completo',
        description: 'Camisa, pantalón, zapatos - Talla M',
        status: 'in-progress',
        lastUpdate: '13/12/2024 - 14:30'
    },
    {
        id: 'SOL-2024-1432',
        date: '28/11/2024',
        type: 'Reposición',
        description: 'Pantalón de trabajo - Talla M',
        status: 'approved',
        lastUpdate: '05/12/2024 - 10:15'
    },
    {
        id: 'SOL-2024-1389',
        date: '15/11/2024',
        type: 'Cambio de talla',
        description: 'Camisa corporativa - De M a L',
        status: 'pending',
        lastUpdate: '15/11/2024 - 16:45'
    },
    {
        id: 'SOL-2024-1201',
        date: '03/10/2024',
        type: 'Uniforme completo',
        description: 'Kit completo de invierno - Talla M',
        status: 'delivered',
        lastUpdate: '25/10/2024 - 09:00'
    },
    {
        id: 'SOL-2024-1089',
        date: '18/09/2024',
        type: 'Reposición',
        description: 'Zapatos de seguridad - Talla 42',
        status: 'delivered',
        lastUpdate: '02/10/2024 - 11:30'
    },
    {
        id: 'SOL-2024-0956',
        date: '05/08/2024',
        type: 'Cambio de prenda',
        description: 'Chaqueta de invierno - Talla L',
        status: 'rejected',
        lastUpdate: '12/08/2024 - 15:20'
    },
];

function normalizeString(str) {
    if (!str) return '';
    try {
        return str
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase();
    } catch {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }
}

function getTypeKey(type) {
    const norm = normalizeString(type);
    if (norm.includes('uniforme')) return 'uniform';
    if (norm.includes('repos') || norm.includes('reposición') || norm.includes('reposición')) return 'replacement';
    if (norm.includes('cambio') && norm.includes('talla')) return 'size-change';
    if (norm.includes('cambio') && norm.includes('prenda')) return 'garment-change';
    return 'all';
}

export default function MisSolicitudes(){
    const [showEmpty] = useState(false);

    const [filters, setFilters] = useState({
        status: 'all',
        type: 'all',
        period: 'all'
    });

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    const filteredRequests = MOCK_REQUEST.filter((r) => {
        if (filters.status && filters.status !== 'all' && r.status !== filters.status) return false;

        const typeKey = getTypeKey(r.type);
        if (filters.type && filters.type !== 'all' && typeKey !== filters.type) return false;

        if (filters.period && filters.period !== 'all') {
            const [day, month, year] = r.date.split('/').map(Number);
            const reqDate = new Date(year, month - 1, day);
            const now = new Date();

            switch (filters.period) {
                case 'current-month': {
                    if (!(reqDate.getFullYear() === now.getFullYear() && reqDate.getMonth() === now.getMonth())) return false;
                    break;
                }
                case 'last-3-months': {
                    const past = new Date();
                    past.setMonth(now.getMonth() - 3);
                    if (reqDate < past) return false;
                    break;
                }
                case 'last-6-months': {
                    const past = new Date();
                    past.setMonth(now.getMonth() - 6);
                    if (reqDate < past) return false;
                    break;
                }
                case 'current-year': {
                    if (reqDate.getFullYear() !== now.getFullYear()) return false;
                    break;
                }
                default:
                    break;
            }
        }

        return true;
    });

    const activeRequests = MOCK_REQUEST.filter(
        r => r.status === 'pending' || r.status === 'approved' || r.status === 'in-progress'
    ).length;

    const nextDelivery = MOCK_REQUEST.find(r => r.status === 'approved' || r.status === 'in-progress');

    const requireAction = MOCK_REQUEST.filter(r => r.status === 'pending').length;

    return (
      <main className={"min-[1400px]:w-[90%] min-[1400px]:mx-auto"}>
          <div>
              <div className="mb-8">
                  <h2 className="text-gray-900 mb-2">Mis solicitudes</h2>
                  <p className="text-gray-600">
                      Consulta el estado y detalle de tus solicitudes de uniforme y postventa
                  </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                  <StatCard
                      title="Solicitudes activas"
                      value={activeRequests}
                      description="En proceso de gestión"
                  />
                  <StatCard
                      title="Próxima entrega"
                      value={nextDelivery ? '20 Dic 2024' : '-'}
                      description={nextDelivery?.description || 'No hay entregas programadas'}
                      variant="highlight"
                  />
                  <StatCard
                      title="Requieren acción"
                      value={requireAction}
                      description="Pendientes de revisión"
                  />
              </div>

              <div className="mb-6">
                  <FilterBar filters={filters} onChange={handleFiltersChange} />
              </div>

              {showEmpty ? (
                  <EmptyState />
              ) : (
                  <RequestsTable requests={filteredRequests} />
              )}
          </div>
      </main>
  );
}
