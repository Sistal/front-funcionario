import { PieChart, Pie, Cell } from 'recharts';

export default function StatusCard({ counts }) {
  const data = [
    { name: 'Entregados', value: counts.entregados, color: '#10b981' },
    { name: 'En proceso', value: counts.enProceso, color: '#3b82f6' },
    { name: 'Pendientes', value: counts.pendientes, color: '#f59e0b' },
    { name: 'Requieren acci\u00f3n', value: counts.requierenAccion, color: '#ef4444' },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-[14px] shadow p-6 flex gap-6 items-center flex row gap-[28px] py-10">
      <div className="flex-1">
        <h3 className="text-[18px] mb-2">Estado general</h3>
        <div className="text-sm text-gray-500">Total: {counts.total} solicitudes</div>
        <div className="mt-4 grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#10b981] rounded-full"/> <div className="text-sm">Entregados</div></div><div className="text-sm">{counts.entregados}</div></div>
          <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#3b82f6] rounded-full"/> <div className="text-sm">En proceso de entrega</div></div><div className="text-sm">{counts.enProceso}</div></div>
          <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#f59e0b] rounded-full"/> <div className="text-sm">Pendientes de aprobaci\u00f3n</div></div><div className="text-sm">{counts.pendientes}</div></div>
          <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#ef4444] rounded-full"/> <div className="text-sm">Requieren acci\u00f3n</div></div><div className="text-sm">{counts.requierenAccion}</div></div>
        </div>
      </div>

      <div className="w-[160px] h-[160px] flex items-center justify-center">
        <PieChart width={160} height={160}>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={44} outerRadius={64} startAngle={90} endAngle={-270} paddingAngle={2}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute text-center pointer-events-none">
          <div className="text-sm font-semibold">{counts.total}</div>
          <div className="text-xs text-gray-500">solicitudes</div>
        </div>
      </div>
    </div>
  );
}

