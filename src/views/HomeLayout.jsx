import { useState, useEffect } from "react";
import Tabs from "../components/layout/Tabs";
import RecentRequests from "../components/requests/RecentRequests";
import UpcomingDeliveries from "../components/requests/UpcomingDeliveries";
import Shortcuts from "../components/shortcuts/Shortcuts";
import SizesCard from "../components/cards/SizesCard";
import StatusCard from "../components/cards/StatusCard";
import { getRecentRequests, getUpcomingDeliveries, getMyMedidas } from "../api/funcionario.api";
import staticData from "../data/home.json";
import { formatDate } from "../utils/date.js";

export default function HomeLayout({ dashboardData, profile }) {
  const [recentRequests, setRecentRequests] = useState([]);
  const [upcomingDeliveries, setUpcomingDeliveries] = useState([]);
  const [medidas, setMedidas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [profile]);

  async function loadData() {
    try {
      setLoading(true);
      
      // Intentar cargar datos de la API, si falla devolver arrays vacíos
      try {
        const requests = await getRecentRequests().catch(() => []);
        const deliveries = await getUpcomingDeliveries().catch(() => []);
        
        setRecentRequests(requests);
        setUpcomingDeliveries(deliveries);

        try {
          const medidasData = await getMyMedidas();
          setMedidas(medidasData);
        } catch (error) {
          console.warn('No se pudieron cargar las medidas:', error);
        }
      } catch (apiError) {
        console.warn('API fetch failed, falling back to empty states:', apiError);
        setRecentRequests([]);
        setUpcomingDeliveries([]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setRecentRequests([]);
      setUpcomingDeliveries([]);
    } finally {
      setLoading(false);
    }
  }

  // Obtener nombre del perfil o usar valor por defecto
  const userName = profile?.nombres && profile?.apellido_paterno 
    ? `${profile.nombres} ${profile.apellido_paterno}`
    : profile?.nombre_completo || "Usuario";

  // Construir datos de tallas desde las medidas cargadas o dejar vacío si no hay
  const sizesData = medidas ? {
    general: calcularTallaGeneral(medidas), 
    estatura: medidas.estatura_m ? `${medidas.estatura_m} m` : "-",
    pecho: medidas.pecho_cm ? `${medidas.pecho_cm} cm` : "-",
    cintura: medidas.cintura_cm ? `${medidas.cintura_cm} cm` : "-",
    cadera: medidas.cadera_cm ? `${medidas.cadera_cm} cm` : "-",
    manga: medidas.manga_cm ? `${medidas.manga_cm} cm` : "-"
  } : { general: "-", estatura: "-", pecho: "-", cintura: "-", cadera: "-", manga: "-" };

  // Calcular talla general basándose en las medidas
  function calcularTallaGeneral(medidas) {
    if (!medidas || !medidas.pecho_cm) return "M";
    const pecho = medidas.pecho_cm;
    if (pecho < 90) return "S";
    if (pecho < 98) return "M";
    if (pecho < 106) return "L";
    return "XL";
  }

  // Usar estadísticas del dashboard o valores por defecto
  const statusCounts = dashboardData ? {
    total: dashboardData.total_solicitudes || 0,
    entregados: dashboardData.entregas_entregadas || 0,
    enProceso: dashboardData.entregas_proximas || dashboardData.entregas_en_proceso || 0,
    pendientes: dashboardData.solicitudes_pendientes || 0,
    requierenAccion: dashboardData.solicitudes_requieren_accion || 0
  } : staticData.statusCounts;

  const recentRequestItems = recentRequests.map((request) => ({
    date: formatDate(request.fecha || request.date),
    status: request.estado || request.status,
    description: Array.isArray(request.items) ? request.items.join(', ') : request.description || request.tipo,
  }));

  const upcomingDeliveryItems = upcomingDeliveries.map((delivery) => ({
    title: delivery.garments || delivery.title,
    date: formatDate(delivery.dispatchDate || delivery.date),
  }));

  return (
    <div className="content-stretch flex flex-col gap-8 w-full">
      <div className="flex flex-col items-baseline justify-between gap-[32px]">
        <Tabs items={["Resumen", "Historial", "Tallas"]} />
        <div className="flex flex-col gap-[8px]">
          <h2 className={'font-bold'}>Bienvenido</h2>
          <p className="text-sm text-gray-500">Aquí tienes un resumen de tus solicitudes y próximas entregas</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        </div>
      ) : (
        <>
          <div className="w-full">
            <SizesCard sizes={sizesData} />
          </div>
        </>
      )}
    </div>
  );
}
