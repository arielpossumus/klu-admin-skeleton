export interface CorporateData {
    rsaKey: string;
    logoIndex: string;
    logoTicket: string;
    ModeloCorporativo: string;
}

export interface Corporate {
    name: string;
    fiid: string;
    status: string;
    corporateData?: CorporateData;
}


export interface CorporateByIdResponse {
    status: boolean;
    date: string;
    time: string;
    data_response: Corporate;
}
