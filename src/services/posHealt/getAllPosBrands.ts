import { API_URL_ANEX, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";

export type PosBrandItem = {
    ID: number;
    Brand: string;
    Models: string[];
};

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}getAllPosBrands.json`;

export const getAllPosBrands = async (): Promise<PosBrandItem[]> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return ensurePosBrandArray(data);
};

const ensurePosBrandArray = (raw: unknown): PosBrandItem[] => {
    if (!Array.isArray(raw)) return [];
    return raw.map(normalizePosBrand).filter((x): x is PosBrandItem => x !== null);
};

const normalizePosBrand = (x: unknown): PosBrandItem | null => {
    if (x == null || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    const idRaw = o.ID ?? o.id;
    const brand = o.Brand ?? o.brand;
    const modelsRaw = o.Models ?? o.models;
    if (brand == null || String(brand).trim() === "") return null;
    const id = typeof idRaw === "number" ? idRaw : Number(idRaw);
    if (Number.isNaN(id)) return null;
    const models = Array.isArray(modelsRaw)
        ? modelsRaw.map((m) => String(m)).filter((m) => m.trim() !== "")
        : [];
    return { ID: id, Brand: String(brand).trim(), Models: models };
};
