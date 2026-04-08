import { axiosClient } from "@/services/axiosClient";
import { BASE_URL, API_URL_ANEX } from "@/config/constants";

export type RsaItem = { id: number; value: string; };

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}/getAllRsa.json`;

export const rsaService = {
    getAll: async (): Promise<RsaItem[]> => {
        const { data } = await axiosClient.get<RsaItem[] | RsaItem>(ENDPOINT);
        return ensureRsaArray(data);
    },
};

function ensureRsaArray(raw: RsaItem[] | RsaItem): RsaItem[] {
    if (Array.isArray(raw)) return raw.filter(isRsaItem);
    return isRsaItem(raw) ? [raw] : [];
}

function isRsaItem(x: unknown): x is RsaItem {
    return (
        x != null &&
        typeof (x as RsaItem).id === "number" &&
        typeof (x as RsaItem).value === "string"
    );
}
