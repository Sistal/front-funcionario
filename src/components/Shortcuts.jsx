import { LucideLock, LucidePlus, LucideTruck } from "lucide-react";

const Icons = [LucidePlus, LucideTruck, LucideLock];

export default function Shortcuts({ items }) {
    return (
        <div className="bg-white rounded-[14px] shadow p-6 flex flex-col gap-[28px] py-10">
            <h3 className="text-[18px] mb-4">Atajos rápidos</h3>

            <div className="flex flex-col gap-3">
                {items.map((it, idx) => {
                    const Icon = Icons[idx] ?? LucidePlus; // fallback
                    return (
                        <button
                            key={idx}
                            className="flex items-center gap-3 bg-white border border-gray-200 h-12 px-4 w-full rounded-lg cursor-pointer hover:border-gray-400"
                        >
                            <Icon size={16} />
                            <span className="text-sm text-[#364153]">{it.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
