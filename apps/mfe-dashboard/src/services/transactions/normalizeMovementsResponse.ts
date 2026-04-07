import type { ChartDataItem, MovementsResponse } from "@/types/dashboard/movementsChart";

const num = (raw: unknown): number => {
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    if (typeof raw === "string" && raw.trim() !== "") {
        const n = Number(raw);
        return Number.isFinite(n) ? n : 0;
    }
    return 0;
};

const normalizeItem = (raw: unknown): ChartDataItem | null => {
    if (raw == null || typeof raw !== "object") return null;
    const o = raw as Record<string, unknown>;
    const columnName = typeof o.columnName === "string" ? o.columnName.trim() : "";
    if (columnName === "") return null;
    return {
        columnName,
        totalApproved: num(o.totalApproved),
        totalRejected: num(o.totalRejected),
    };
};

export const normalizeMovementsResponse = (raw: unknown): MovementsResponse => {
    if (raw == null || typeof raw !== "object") return { chartData: [] };
    const o = raw as Record<string, unknown>;
    const rows = o.chartData;
    if (!Array.isArray(rows)) return { chartData: [] };
    const chartData = rows.map(normalizeItem).filter((r): r is ChartDataItem => r != null);
    return { chartData };
};
