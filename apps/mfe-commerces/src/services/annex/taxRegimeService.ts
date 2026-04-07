import { API_URL_ANEX, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";

export type TaxRegimeItem = { regimeId: number; regimeName: string; };

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}getAllTaxRegime.json`;

export const taxRegimeService = {
    getAll: async (): Promise<TaxRegimeItem[]> => {
        const { data } = await axiosClient.get<unknown>(ENDPOINT, {
            params: { _: Date.now() },
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
        });
        return ensureTaxRegimeArray(data);
    },
};

function ensureTaxRegimeArray(raw: unknown): TaxRegimeItem[] {
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map(normalize).filter(Boolean) as TaxRegimeItem[];
}

function normalize(x: unknown): TaxRegimeItem | null {
    if (x == null || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    const id = o.regimeId ?? o.regimeid;
    const name = o.regimeName ?? o.regimename;
    if (name == null || String(name).trim() === "") return null;
    const numId = typeof id === "number" ? id : Number(id);
    if (Number.isNaN(numId)) return null;
    return { regimeId: numId, regimeName: String(name).trim() };
}
