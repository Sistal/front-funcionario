export default function Tabs({ items }) {
  return (
      <div className="flex">
        {items.map((it, idx) => (
          <button key={idx} className={`px-3 py-1 ${idx === 0 ? 'bg-[#eff6ff] text-[#155dfc]' : 'text-[#0a0a0a]'} cursor-pointer hover-bg-[#f0f4ff] rounded-md mr-2`}>
            {it}
          </button>
        ))}
      </div>
  );
}

