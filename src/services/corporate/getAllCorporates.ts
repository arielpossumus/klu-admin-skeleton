import { BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { CorporateGrid } from "@/types/corporate/CorporateGrid";

export type GetAllCorporatesResponse = {
    status?: boolean;
    message?: string;
    total?: number;
    rows?: CorporateGrid[];
    objectList?: unknown;
};

/** Mock en `public/mockups/corporates/`; al integrar API real, alinear con `VITE_API_URL_CORPORATE` o ruta acordada. */
const ENDPOINT = `${BASE_URL}corporates/getAllCorporates.json`;

/**
 * Lista de corporativos para grilla y filtros.
 */
export const getAllCorporates = async (): Promise<CorporateGrid[]> => {
    const { data } = await axiosClient.get<GetAllCorporatesResponse>(ENDPOINT);
    return Array.isArray(data?.rows) ? data.rows : [];
};
