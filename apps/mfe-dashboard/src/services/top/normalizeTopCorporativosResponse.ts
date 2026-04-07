import type { TopResponse, TopRow } from "@/types/dashboard/topCorporativosChart";

const num = (raw: unknown): number => {
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    if (typeof raw === "string" && raw.trim() !== "") {
        const n = Number(raw);
        return Number.isFinite(n) ? n : 0;
    }
    return 0;
};

const normalizeRow = (raw: unknown): TopRow | null => {
    if (raw == null || typeof raw !== "object") return null;
    const o = raw as Record<string, unknown>;
    const corporativo = typeof o.corporativo === "string" ? o.corporativo.trim() : "";
    if (corporativo === "") return null;
    return {
        ranking: num(o.ranking),
        corporativo,
        transacciones: num(o.transacciones),
        monto: num(o.monto),
    };
};

export const normalizeTopCorporativosResponse = (raw: unknown): TopResponse => {
    if (raw == null || typeof raw !== "object") return { period: "", data: [] };
    const o = raw as Record<string, unknown>;
    const period = typeof o.period === "string" ? o.period : "";
    const rows = o.data;
    const data = Array.isArray(rows)
        ? rows.map(normalizeRow).filter((r): r is TopRow => r != null)
        : [];
    return { period, data };
};
