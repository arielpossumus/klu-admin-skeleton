export interface CorporateLegalRepresentative {
    name: string;
    lastName: string;
    maternalLastName: string;
}

export interface CorporateTaxInformation {
    rfc?: string;
    socialReason?: string;
    taxRegime?: string;
}

export interface CorporateFiscalAddress {
    country?: string;
    region?: string;
    city?: string;
    street?: string;
    zipCode?: string;
    externalNumber?: string;
    internalNumber?: string;
    colony?: string;
    municipality?: string;
    state?: string;
    email?: string;
    phone?: string;
    ext?: string;
}

export interface CorporateLegalContact {
    name?: string;
    lastName?: string;
    maternalLastName?: string;
    email?: string;
    phone?: string;
    ext?: string;
    phone2?: string;
    ext2?: string;
    days?: string[];
    startHour?: string;
    endHour?: string;
}

export interface CorporateContactData {
    commercialContact?: CorporateLegalContact;
    technicalContact?: CorporateLegalContact;
    financialContact?: CorporateLegalContact;
}

export interface CorporateLegalData {
    LegalRepresentative?: CorporateLegalRepresentative;
    taxInformation?: CorporateTaxInformation;
    fiscalAddress?: CorporateFiscalAddress;
    legalContact?: CorporateLegalContact;
}

export interface ModelCommercialTransaction {
    transactionRange: string;
    costPerTransaction: number;
    iva: string;
    total: number;
}

export interface ModelCommercial {
    adquisition?: boolean;
    adquisitionBank?: string;
    channels?: string[];
    monthlyRent?: number;
    cancelationDay?: number;
    transactions?: ModelCommercialTransaction[];
}

export interface CorporateData {
    rsaKey: string;
    logoIndex: string;
    logoTicket: string;
    ModeloCorporativo: string;
    legalData?: CorporateLegalData;
    contactData?: CorporateContactData;
    modelCommercial?: ModelCommercial;
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
