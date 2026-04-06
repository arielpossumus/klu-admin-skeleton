import { BASE_URL, CORPORATES_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { CorporateGrid } from "@/types/corporate/CorporateGrid";

const ENDPOINT = `${BASE_URL}${CORPORATES_API}/getAllCorporates.json`;

const num = (raw: unknown, fallback = 0): number => {
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    if (typeof raw === "string" && raw.trim() !== "") {
        const n = Number(raw);
        return Number.isFinite(n) ? n : fallback;
    }
    return fallback;
};

const str = (raw: unknown, fallback = ""): string =>
    typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fallback;

const normalizeRow = (raw: unknown): CorporateGrid | null => {
    if (raw == null || typeof raw !== "object") return null;
    const o = raw as Record<string, unknown>;
    const corporateName = str(o.corporateName);
    if (corporateName === "") return null;
    return {
        corporateName,
        corporateTypeBank: str(o.corporateTypeBank),
        corporateStatus: str(o.corporateStatus),
        corporateId: num(o.corporateId, 0),
        corporateFiid: str(o.corporateFiid),
    };
};

export const getAllCorporates = async (): Promise<CorporateGrid[]> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    if (data == null || typeof data !== "object") return [];
    const rows = (data as Record<string, unknown>).rows;
    if (!Array.isArray(rows)) return [];
    return rows.map(normalizeRow).filter((r): r is CorporateGrid => r != null);
};
