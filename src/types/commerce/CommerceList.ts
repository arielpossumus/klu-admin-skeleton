/** Ítem de `businessList` en la respuesta de comercios por corporativo */
export type CommerceBusinessApi = {
    id: string;
    name: string;
    businessType: string;
    status: string;
    legalContactEmail?: string;
    legalContactPhone?: string;
    corpData?: {
        id?: string;
        name?: string;
        fiid?: string;
    };
};

export type AllCommercesResponse = {
    status: boolean;
    data_response?: {
        businessList?: CommerceBusinessApi[];
    };
};

/** Fila normalizada para la grilla de comercios */
export type CommerceTableRow = {
    id: string;
    name: string;
    businessType: string;
    status: string;
    legalContactEmail: string;
    legalContactPhone: string;
};

/** Ítem de `rows` en `allCommerces.json` (listado global) */
export type AllCommercesGridApiRow = {
    businessId: number;
    corporate?: string;
    businessName?: string;
    businessMembership?: string;
    businessSubmembership?: string;
    businessLine?: string;
    businessPhone?: string;
    businessEmail?: string;
    businessStatus?: string;
};

export type AllCommercesGridListResponse = {
    status?: boolean;
    message?: string;
    total?: number;
    rows?: AllCommercesGridApiRow[];
    objectList?: unknown;
};
