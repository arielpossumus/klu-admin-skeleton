import allCommercesJson from "../../../public/mockups/commerces/allCommerces.json" with { type: "json" };
import type {
    AllCommercesResponse,
    CommerceBusinessApi,
    CommerceTableRow,
} from "@/types/commerce/CommerceList";

export type GetCommercesByCorporateParams = {
    corporateFiid: string;
    corporateName: string;
};

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
 * Obtiene comercios asociados al corporativo (mock desde `allCommerces.json`).
 * Filtra por `corpData.fiid` o `corpData.name` cuando venga en cada ítem.
 * Si ningún ítem trae `corpData` o no hay coincidencias, se devuelve toda la lista del mock (solo desarrollo).
 */
export const getCommercesByCorporate = async (
    params: GetCommercesByCorporateParams
): Promise<CommerceTableRow[]> => {
    const raw = allCommercesJson as AllCommercesResponse;
    const list = raw.data_response?.businessList ?? [];
    const filtered = list.filter((b) => matchesCorporate(b, params));
    const hasCorpMeta = list.some((b) => b.corpData != null);
    const source = hasCorpMeta ? filtered : list;
    return source.map(mapToRow);
};
