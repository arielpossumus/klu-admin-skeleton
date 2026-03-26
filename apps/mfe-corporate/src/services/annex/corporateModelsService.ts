import { axiosClient } from "@/services/axiosClient";
import { BASE_URL, API_URL_ANEX } from "@/config/constants";

export type CorporateModelItem = { typeId: number; typeModel: string; };

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}getAllCorporateModelsV2.json`;

export const corporateModelsService = {
    getAll: async (): Promise<CorporateModelItem[]> => {
        const { data } = await axiosClient.get<unknown>(ENDPOINT, {
            params: { _: Date.now() },
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
        });
        return ensureCorporateModelArray(data);
    },
};

function ensureCorporateModelArray(raw: unknown): CorporateModelItem[] {
    const arr = Array.isArray(raw)
        ? raw
        : raw != null && typeof raw === "object" && "data" in raw && Array.isArray((raw as { data: unknown; }).data)
            ? (raw as { data: unknown[]; }).data
            : [];
    return arr.map(normalizeCorporateModelItem).filter(Boolean) as CorporateModelItem[];
}

function normalizeCorporateModelItem(x: unknown): CorporateModelItem | null {
    if (x == null || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    const id = o.typeId ?? o.typeid ?? o.id;
    const label = o.typeModel ?? o.typemodel ?? o.value;
    if (label == null || String(label).trim() === "") return null;
    const numId = typeof id === "number" ? id : Number(id);
    if (Number.isNaN(numId)) return null;
    return { typeId: numId, typeModel: String(label).trim() };
}
