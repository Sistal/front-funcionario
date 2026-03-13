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
      
      // Intentar cargar datos de la API, si falla usar datos estáticos
      try {
        const requests = await getRecentRequests().catch(() => staticData.recentRequests);
        const deliveries = await getUpcomingDeliveries().catch(() => staticData.upcomingDeliveries);
        
        setRecentRequests(requests);
        setUpcomingDeliveries(deliveries);

        if (profile?.id) {
          try {
            const medidasData = await getMyMedidas(profile.id);
            setMedidas(medidasData);
          } catch (error) {
            console.warn('No se pudieron cargar las medidas:', error);
          }
        }
      } catch (apiError) {
        console.warn('Using static data as fallback:', apiError);
        setRecentRequests(staticData.recentRequests);
        setUpcomingDeliveries(staticData.upcomingDeliveries);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setRecentRequests(staticData.recentRequests);
      setUpcomingDeliveries(staticData.upcomingDeliveries);
    } finally {
      setLoading(false);
    }
  }

  // Obtener nombre del perfil o usar valor por defecto
  const userName = profile?.nombres && profile?.apellido_paterno 
    ? `${profile.nombres} ${profile.apellido_paterno}`
    : profile?.nombre_completo || "Usuario";

  // Construir datos de tallas desde las medidas cargadas
  const sizesData = medidas ? {
    general: calcularTallaGeneral(medidas), 
    pecho: medidas.pecho_cm ? `${medidas.pecho_cm} cm` : "-",
    cintura: medidas.cintura_cm ? `${medidas.cintura_cm} cm` : "-",
    cadera: medidas.cadera_cm ? `${medidas.cadera_cm} cm` : "-"
  } : staticData.sizes;

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
          <h2 className={'font-bold'}>Bienvenido, {userName}</h2>
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
            <RecentRequests requests={recentRequestItems} />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <UpcomingDeliveries items={upcomingDeliveryItems} svgPaths={staticData.svgPaths} />
            <Shortcuts items={staticData.shortcuts} svgPaths={staticData.svgPaths} />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <SizesCard sizes={sizesData} />
            <StatusCard counts={statusCounts} svgPaths={staticData.svgPaths} />
          </div>
        </>
      )}
    </div>
  );
}
