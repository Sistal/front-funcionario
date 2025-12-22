export default function RecentRequests({ requests }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[14px] shadow p-6 w-full flex flex-col gap-[28px] py-10">
      <h3 className="text-[18px] mb-4 font-medium">Mis solicitudes recientes</h3>
      <div className="overflow-auto max-h-56">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-500">
            <tr>
              <th className="w-1/4">Fecha</th>
              <th className="w-1/4">Estado</th>
              <th className="w-2/4">Descripci\u00f3n</th>
            </tr>
          </thead>
          <tbody className={'[&>tr]:border-t [&>tr]:border-gray-100'}>
            {requests.map((r, i) => (
              <tr key={i} className="border-t h-12 align-middle">
                <td className="text-sm text-gray-800">{r.date}</td>
                <td className="text-sm">
                  <span className={`px-3 py-1 rounded-2xl ${r.status === 'Aprobado' ? 'bg-green-100 text-green-700 border border-green-300' : r.status === 'Entregado' ? 'bg-gray-100 text-gray-800 border border-gray-300' : r.status === 'En proceso' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-yellow-100 text-yellow-800 border border-yellow-300'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="text-sm text-gray-800">{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <div className="mt-3 text-sm text-[#155dfc]">Ver todas mis solicitudes</div>
    </div>
  );
}

