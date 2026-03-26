/**
 * Convierte un valor en KB a MB para mostrar en vista (ej. RAM/Flash).
 * Usado por el detalle de POS Health.
 */
export const formatKBtoMB = (value: unknown): string => {
  const num = Number(value);
  if (!Number.isFinite(num)) return "—";
  return `${(num / 1024).toFixed(2)} MB`;
};

