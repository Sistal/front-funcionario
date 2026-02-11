export default function CTAButton({ variant = 'primary', label, icon}) {
  const base = 'flex items-center rounded-[8px] h-11 px-4';
  const styles = variant === 'primary'
    ? `${base} bg-white text-[#155dfc] shadow`
    : `${base} text-white bg-transparent border border-white/20 flex gap-2`;

  return (
    <a href={'/mis-solicitudes'} className={styles}>
      <span className="text-sm">{label}</span>
      {icon}
    </a>
  );
}

