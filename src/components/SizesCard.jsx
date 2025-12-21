export default function SizesCard({ sizes }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[14px] shadow p-6 flex flex-col gap-[28px] py-10">
      <h3 className="text-[18px] mb-4">Mis tallas</h3>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between"><div className="text-sm text-gray-500">Talla general</div><div className="text-sm text-gray-900">{sizes.general}</div></div>
        <div className="flex justify-between"><div className="text-sm text-gray-500">Pecho</div><div className="text-sm text-gray-900">{sizes.pecho}</div></div>
        <div className="flex justify-between"><div className="text-sm text-gray-500">Cintura</div><div className="text-sm text-gray-900">{sizes.cintura}</div></div>
        <div className="flex justify-between"><div className="text-sm text-gray-500">Cadera</div><div className="text-sm text-gray-900">{sizes.cadera}</div></div>
        <button className="mt-3 text-sm text-[#155dfc] cursor-pointer w-max px-2 py-2">Actualizar tallas</button>
      </div>
    </div>
  );
}
