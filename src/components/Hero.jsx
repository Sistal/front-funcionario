import headerBackground from "../assets/headerBackground.png";
import CTAButton from "./CTAButton";

export default function Hero({ data }) {
  const { title, subtitle, primary, secondary, svgPaths } = data;

  return (
    <div className="relative overflow-hidden rounded-[14px] bg-gradient-to-r from-[#155dfc] to-[#1447e6]">
      <div className="absolute top-0 left-0 w-full h-[288px] opacity-20 pointer-events-none">
        <img alt="bg" className="w-full h-full object-cover" src={headerBackground} />
      </div>

      <div className="relative flex flex-col gap-3 p-6 pl-12 pt-20 max-w-[640px]">
        <div className="w-full">
          <p className="text-white text-[36px] leading-[40px] font-bold -mt-1">{title}</p>
        </div>

        <div className="w-full">
          <p className="text-[#dbeafe] text-[18px] leading-[28px]">{subtitle}</p>
        </div>

        <div className="flex gap-4 items-center mt-2">
          <CTAButton
            variant="primary"
            label={primary.label}
            icon={(
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M3.33333 8H12.6667" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d={svgPaths.p1d405500} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            )}
          />

          <CTAButton
            variant="secondary"
            label={secondary.label}
            icon={(
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M5.33333 1.33333V4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d="M10.6667 1.33333V4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d={svgPaths.p3ee34580} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d="M2 6.66667H14" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            )}
          />
        </div>
      </div>
    </div>
  );
}

