import { API_URL_ANEX, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";

export type StatusRow = {
    id: string;
    description: string;
};

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}/getAllStatus.json`;

export const getAllStatus = async (): Promise<StatusRow[]> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return ensureStatusArray(data);
};

const ensureStatusArray = (raw: unknown): StatusRow[] => {
    if (!Array.isArray(raw)) return [];
    return raw.map(normalizeStatus).filter((x): x is StatusRow => x != null);
};

const normalizeStatus = (x: unknown): StatusRow | null => {
    if (x == null || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    const idRaw = o.id ?? o.code ?? o.ID;
    const descRaw = o.description ?? o.name ?? o.Description;
    if (idRaw == null && descRaw == null) return null;
    const id = String(idRaw ?? "").trim();
    const description = String(descRaw ?? "").trim();
    if (id === "" || description === "") return null;
    return { id, description };
};
