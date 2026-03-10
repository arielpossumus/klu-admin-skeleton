/**
 * Convierte un valor en KB a MB para mostrar en vista (ej. RAM/Flash).
 * @param value - Valor en kilobytes (number o parseable)
 * @returns String formateado "X.XX MB" o "—" si no es válido
 */
export const formatKBtoMB = (value: unknown): string => {
    const num = Number(value);
    if (!Number.isFinite(num)) return "—";
    return `${(num / 1024).toFixed(2)} MB`;
};
