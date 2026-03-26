import { API_URL_ANEX, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";

export type AcquisitionBankItem = { id: number; name: string };

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}getAllAdquisitionBanks.json`;

export const acquisitionBanksService = {
    getAll: async (): Promise<AcquisitionBankItem[]> => {
        const { data } = await axiosClient.get<unknown>(ENDPOINT, {
            params: { _: Date.now() },
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
        });
        return ensureArray(data);
    },
};

function ensureArray(raw: unknown): AcquisitionBankItem[] {
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map(normalize).filter(Boolean) as AcquisitionBankItem[];
}

function normalize(x: unknown): AcquisitionBankItem | null {
    if (x == null || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    const id = o.id ?? o.ID;
    const name = o.name ?? o.Name;
    if (name == null || String(name).trim() === "") return null;
    const numId = typeof id === "number" ? id : Number(id);
    if (Number.isNaN(numId)) return null;
    return { id: numId, name: String(name).trim() };
}
