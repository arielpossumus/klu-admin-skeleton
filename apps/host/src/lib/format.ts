import type { BalanceCurrencyCode } from "@/types/dashboard/TrxBalanceSummary";

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


export const maskAccountNumber = (id: string): string => {
    const digits = id.replace(/\D/g, "");
    if (digits.length < 4) return "•••• •••• •••• ——";
    const last4 = digits.slice(-4);
    return `•••• •••• •••• ${last4}`;
};

export const formatTypeLabel = (type: string): string => {
    if (type.trim() === "") return "";
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
};

export const formatUsdMxnRate = (value: number) =>
    new Intl.NumberFormat("es-MX", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
    }).format(value);

/** Cotización USD vs peso argentino (mock / listados). */
export const formatUsdArsRate = (value: number) =>
    new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

export type DollarQuoteCurrency = "MXN" | "ARS";

export const formatDollarQuoteRate = (value: number, currency: DollarQuoteCurrency) =>
    currency === "MXN" ? formatUsdMxnRate(value) : formatUsdArsRate(value);

const balanceLocaleByCurrency: Record<BalanceCurrencyCode, string> = {
    MXN: "es-MX",
    ARS: "es-AR",
    USD: "en-US",
};

/** Monto en moneda para paneles de saldo (MXN / ARS / USD). */
export const formatBalanceCurrency = (value: number, currency: BalanceCurrencyCode) =>
    new Intl.NumberFormat(balanceLocaleByCurrency[currency], {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

/** Enteros locales alineados con la moneda seleccionada (contadores). */
export const formatBalanceInteger = (value: number, currency: BalanceCurrencyCode) =>
    new Intl.NumberFormat(balanceLocaleByCurrency[currency], { maximumFractionDigits: 0 }).format(
        value,
    );

/** Nombre en iniciales */
export const getNameInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) {
        const word = parts[0];
        return word.length >= 2
            ? word.slice(0, 2).toUpperCase()
            : word.toUpperCase();
    }
    const first = parts[0][0] ?? "";
    const last = parts[parts.length - 1][0] ?? "";
    return `${first}${last}`.toUpperCase();
};
