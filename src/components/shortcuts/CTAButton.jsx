export default function CTAButton({ variant = 'primary', label, icon, href = '/mis-solicitudes'}) {
  const base = 'flex items-center rounded-[8px] h-11 px-4';
  const styles = variant === 'primary'
    ? `${base} bg-blue-600 text-white shadow`
    : `${base} text-white bg-transparent border border-white/20 flex gap-2`;

  return (
    <a href={href} className={styles}>
      <span className="text-sm">{label}</span>
      {icon}
    </a>
  );
}

