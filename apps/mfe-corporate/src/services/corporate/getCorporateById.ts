import { API_URL_CORPORATE, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { Corporate } from "@/types/corporate/Corporate";

const ENDPOINT = `${BASE_URL}${API_URL_CORPORATE}/getCorporateById.json`;

const emptyCorporate = (): Corporate => ({
    name: "",
    fiid: "",
    status: "",
});

const extractCorporate = (raw: unknown): Corporate => {
    if (raw == null || typeof raw !== "object") return emptyCorporate();
    const o = raw as Record<string, unknown>;
    const dr = o.data_response;
    if (dr != null && typeof dr === "object" && !Array.isArray(dr)) {
        const c = dr as Partial<Corporate>;
        return {
            name: typeof c.name === "string" ? c.name : "",
            fiid: typeof c.fiid === "string" ? c.fiid : "",
            status: typeof c.status === "string" ? c.status : "",
            corporateData: c.corporateData,
        };
    }
    return emptyCorporate();
};

/**
 * Detalle de corporativo (mock en host: `corporates/getCorporateById.json`).
 * `corporateId` se envía en query por si el API real lo requiere.
 */
export const getCorporateById = async (corporateId: string): Promise<Corporate> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT, {
        params: corporateId.trim() !== "" ? { id: corporateId } : undefined,
    });
    return extractCorporate(data);
};
