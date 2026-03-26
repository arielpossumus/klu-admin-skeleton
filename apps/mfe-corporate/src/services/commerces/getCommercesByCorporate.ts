import { BASE_URL, API_URL_COMMERCES } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type {
    AllCommercesResponse,
    CommerceBusinessApi,
    CommerceTableRow,
} from "@/types/commerce/CommerceList";

export type GetCommercesByCorporateParams = {
    corporateFiid: string;
    corporateName: string;
};

const ENDPOINT = `${BASE_URL}${API_URL_COMMERCES}allCommercesByCorporate.json`;

const mapToRow = (b: CommerceBusinessApi): CommerceTableRow => ({
    id: b.id,
    name: b.name,
    businessType: b.businessType,
    status: b.status,
    legalContactEmail: b.legalContactEmail?.trim() || "—",
    legalContactPhone: b.legalContactPhone?.trim() || "—",
});

const matchesCorporate = (
    b: CommerceBusinessApi,
    { corporateFiid, corporateName }: GetCommercesByCorporateParams
): boolean => {
    const c = b.corpData;
    if (!c) return false;
    const fiidMatch = c.fiid != null && c.fiid === corporateFiid;
    const nameMatch =
        c.name != null &&
        c.name.trim().toUpperCase() === corporateName.trim().toUpperCase();
    return fiidMatch || nameMatch;
};

/**
 * Obtiene comercios asociados al corporativo vía HTTP (`axiosClient`).
 * Filtra por `corpData.fiid` o `corpData.name` cuando venga en cada ítem.
 * Si ningún ítem trae `corpData` o no hay coincidencias, se devuelve toda la lista (útil con mocks).
 */
export const getCommercesByCorporate = async (
    params: GetCommercesByCorporateParams
): Promise<CommerceTableRow[]> => {
    const { data } = await axiosClient.get<AllCommercesResponse>(ENDPOINT, {
        params: {
            corporateFiid: params.corporateFiid,
            corporateName: params.corporateName,
        },
    });
    const list = data?.data_response?.businessList ?? [];
    const filtered = list.filter((b) => matchesCorporate(b, params));
    const hasCorpMeta = list.some((b) => b.corpData != null);
    const source = hasCorpMeta ? filtered : list;
    return source.map(mapToRow);
};
