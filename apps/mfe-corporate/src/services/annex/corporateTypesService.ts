import { API_URL_ANEX, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";

export type CorporateTypeRow = {
    typeId: number;
    typeName: string;
};

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}/getAllCorporatesTypes.json`;

export const corporateTypesService = {
    getAll: async (): Promise<CorporateTypeRow[]> => {
        const { data } = await axiosClient.get<unknown>(ENDPOINT);
        return ensureCorporateTypesArray(data);
    },
};

const ensureCorporateTypesArray = (raw: unknown): CorporateTypeRow[] => {
    if (!Array.isArray(raw)) return [];
    return raw.map(normalizeCorporateType).filter((x): x is CorporateTypeRow => x != null);
};

const normalizeCorporateType = (x: unknown): CorporateTypeRow | null => {
    if (x == null || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    const idRaw = o.typeId ?? o.TypeId;
    const nameRaw = o.typeName ?? o.TypeName;
    if (nameRaw == null || String(nameRaw).trim() === "") return null;
    const typeId = typeof idRaw === "number" ? idRaw : Number(idRaw);
    if (Number.isNaN(typeId)) return null;
    return { typeId, typeName: String(nameRaw).trim() };
};
