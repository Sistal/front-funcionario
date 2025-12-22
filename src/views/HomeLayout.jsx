import Tabs from "../components/layout/Tabs";
import RecentRequests from "../components/requests/RecentRequests";
import UpcomingDeliveries from "../components/requests/UpcomingDeliveries";
import Shortcuts from "../components/shortcuts/Shortcuts";
import SizesCard from "../components/cards/SizesCard";
import StatusCard from "../components/cards/StatusCard";

export default function HomeLayout({ data }) {
  return (
    <div className="content-stretch flex flex-col gap-8 w-full">
      <div className="flex flex-col items-baseline justify-between gap-[32px]">
        <Tabs items={["Resumen", "Historial", "Tallas"]} />
          <div className="flex flex-col gap-[8px]">
          <h2 className={'font-bold'}>Bienvenido, Juan Pérez</h2>
        <p className="text-sm text-gray-500">Aquí tienes un resumen de tus solicitudes y próximas entregas</p>
          </div>
      </div>

      <div className="w-full">
        <RecentRequests requests={data.recentRequests} />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingDeliveries items={data.upcomingDeliveries} svgPaths={data.svgPaths} />
        <Shortcuts items={data.shortcuts} svgPaths={data.svgPaths} />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <SizesCard sizes={data.sizes} />
        <StatusCard counts={data.statusCounts} svgPaths={data.svgPaths} />
      </div>
    </div>
  );
}
