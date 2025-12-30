export function parseDateDMY(str) {
  // expects "dd/mm/yyyy" and returns a Date or null
  if (!str) return null;
  const parts = String(str).split('/');
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) return null;
  return new Date(year, month, day);
}
