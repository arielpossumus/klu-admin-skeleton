
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


export type CommerceContactPerson = {
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
};

export type CommerceContactData = {
  commercialContact?: CommerceContactPerson;
  technicalContact?: CommerceContactPerson;
  financialContact?: CommerceContactPerson;
};


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

/** Fila de tasas de comercio (`tradesRates` en detalle). API puede usar inglés o español. */
export type CommerceTradeRateRow = {
  rateName?: string;
  ratePercentage?: string;
  ivaIncluded?: boolean;
  chargeType?: string;
  channelType?: string;
  nombreTasa?: string;
  porcentajeTasa?: string;
  ivaIncluido?: string;
  tipoCobro?: string;
  tipoCanal?: string;
};

/** Fila de comisión MSI (`msiRates` en detalle). */
export type CommerceMsiRateRow = {
  month?: string;
  visaMastercardPorcentage?: string;
  amexPorcentage?: string;
};

/** Plazos de pago (`paymentTerms` en detalle). */
export type CommercePaymentTerms = {
  nationalDeadline?: number;
  internationalDeadline?: number;
  amexDeadline?: number;
};

/** Cuenta bancaria para depósito (`accountData` en detalle). La API puede usar `Owner*` en PascalCase. */
export type CommerceAccountData = {
  bankName?: string;
  bankCode?: string;
  OwnerName?: string;
  OwnerLastName?: string;
  OwnerMaternalLastName?: string;
};

export type AllCommercesGridApiRow = {
  businessId: number;
  corporate?: string;
  businessName?: string;
  mcc?: string;
  businessMembership?: string;
  businessSubmembership?: string;
  businessLine?: string;
  businessPhone?: string;
  businessEmail?: string;
  businessStatus?: string;
  affiliations?: CommerceAffiliationRow[];
  legalData?: CommerceLegalData;
  fiscalData?: CommerceFiscalData;
  contactData?: CommerceContactData;
  tradesRates?: CommerceTradeRateRow[];
  msiRates?: CommerceMsiRateRow[];
  paymentTerms?: CommercePaymentTerms;
  accountData?: CommerceAccountData;
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
