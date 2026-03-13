import {useEffect, useMemo, useState} from "react";
import {StatCard} from "../components/cards/StatCard.jsx";
import {FilterBar} from "../components/requests/FilterBar.jsx";
import {EmptyState} from "../components/requests/EmptyState.jsx";
import {RequestsTable} from "../components/requests/RequestsTable.jsx";
import { requestsApi } from "../api/requests.api.js";
import { formatDate, parseDateDMY } from "../utils/date.js";

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
    if (norm.includes('repos')) return 'replacement';
    if (norm.includes('cambio') && norm.includes('talla')) return 'size-change';
    if (norm.includes('cambio') && norm.includes('prenda')) return 'garment-change';
    return 'all';
}

export default function MisSolicitudes(){
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        status: 'all',
        type: 'all',
        period: 'all'
    });

    useEffect(() => {
        loadRequests();
    }, []);

    async function loadRequests() {
        try {
            setLoading(true);
            const data = await requestsApi.getAll();
            setRequests(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error loading requests:', error);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    }

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    const filteredRequests = useMemo(() => requests.filter((r) => {
        if (filters.status && filters.status !== 'all' && r.estado !== filters.status) return false;

        const typeKey = getTypeKey(r.tipo);
        if (filters.type && filters.type !== 'all' && typeKey !== filters.type) return false;

        if (filters.period && filters.period !== 'all') {
            const reqDate = parseDateDMY(r.fecha);
            if (!reqDate) return false;
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
    }), [filters, requests]);

    const activeRequests = requests.filter(
        r => r.estado === 'Pendiente' || r.estado === 'Aprobado' || r.estado === 'En proceso'
    ).length;

    const nextDelivery = requests.find(r => r.estado === 'Aprobado' || r.estado === 'En proceso');

    const requireAction = requests.filter(r => r.estado === 'Pendiente').length;

    const showEmpty = !loading && filteredRequests.length === 0;

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
                      value={nextDelivery ? formatDate(nextDelivery.fecha) : '-'}
                      description={nextDelivery?.items?.join(', ') || 'No hay entregas programadas'}
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

              {loading ? (
                  <div className="flex items-center justify-center py-12 text-sm text-gray-500">
                      Cargando solicitudes...
                  </div>
              ) : showEmpty ? (
                  <EmptyState />
              ) : (
                  <RequestsTable requests={filteredRequests} />
              )}
          </div>
      </main>
  );
}
