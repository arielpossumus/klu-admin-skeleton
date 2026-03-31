/** Dirección (representante legal, fiscal, etc.) */
export type CommerceAddress = {
  street?: string;
  outNumber?: string;
  inNumber?: string;
  city?: string;
  town?: string;
  municipaly?: string;
  zip?: string;
  country?: string;
  region?: string;
  /** Entidad federativa / estado */
  state?: string;
};

export type CommerceLegalRepresentative = {
  firstName?: string;
  paternalLastName?: string;
  maternalLastName?: string;
  documentType?: string;
  documentNumber?: string;
  birthDate?: string;
  representativeRfc?: string;
  address?: CommerceAddress;
};

/** Bloque `legalData` del detalle (claves API con espacios) */
export type CommerceLegalData = {
  "Legal Representative"?: CommerceLegalRepresentative;
};

export type CommerceLegalContact = {
  preferredLanguage?: string;
  email?: string;
  phone?: string;
  phoneExtension?: string;
  additionalPhone?: string;
  additionalPhoneExtension?: string;
};

export type CommerceFiscalData = {
  rfc?: string;
  legalName?: string;
  fiscalRegime?: string;
  propertyType?: string;
  fiscalAddress?: CommerceAddress;
  legalContact?: CommerceLegalContact;
};

/** Fila de la grilla de afiliaciones en detalle de comercio */
export type CommerceAffiliationRow = {
  idMembership?: string;
  membershipNumber?: string;
  processor?: string;
  creditRate?: string;
  debitRate?: string;
  creditIntRate?: string;
  debitIntRate?: string;
  tipo?: string;
  regla?: string;
  currency?: string;
};

export type AllCommercesGridApiRow = {
  businessId: number;
  corporate?: string;
  businessName?: string;
  /** Merchant Category Code */
  mcc?: string;
  businessMembership?: string;
  businessSubmembership?: string;
  businessLine?: string;
  businessPhone?: string;
  businessEmail?: string;
  businessStatus?: string;
  affiliations?: CommerceAffiliationRow[];
  /** Presente en respuesta de detalle (`commerceById`) */
  legalData?: CommerceLegalData;
  fiscalData?: CommerceFiscalData;
};

export type AllCommercesGridListResponse = {
  status?: boolean;
  message?: string;
  total?: number;
  rows?: AllCommercesGridApiRow[];
  objectList?: unknown;
};

export type CommerceByIdResponse = {
  status?: boolean;
  message?: string;
  total?: number;
  data_response?: AllCommercesGridApiRow;
};
