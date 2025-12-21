import {LucideBox} from "lucide-react";

export default function UpcomingDeliveries({items}) {
  return (
    <div className="bg-white rounded-[14px] shadow p-6 flex flex-col gap-[28px] py-10">
      <h3 className="text-[18px] mb-4">Próximas entregas</h3>
      <div className="flex flex-col gap-4">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="bg-[#eff6ff] rounded-[10px] w-10 h-10 flex items-center justify-center">
              <LucideBox size={16} className="text-[#155dfc]" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-800">{it.title}</div>
              <div className="text-xs text-gray-500">{it.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

