/** Valores planos anidados para react-hook-form (datos legales / fiscal / contacto) */
export type CommerceAddressFormValues = {
  street: string;
  outNumber: string;
  inNumber: string;
  city: string;
  town: string;
  municipaly: string;
  zip: string;
  country: string;
  region: string;
  state: string;
};

export type CommerceLegalFormValues = {
  representative: {
    firstName: string;
    paternalLastName: string;
    maternalLastName: string;
    documentType: string;
    documentNumber: string;
    birthDate: string;
    representativeRfc: string;
    address: CommerceAddressFormValues;
  };
  fiscal: {
    rfc: string;
    legalName: string;
    fiscalRegime: string;
    propertyType: string;
    address: CommerceAddressFormValues;
  };
  contact: {
    preferredLanguage: string;
    email: string;
    phone: string;
    phoneExtension: string;
    additionalPhone: string;
    additionalPhoneExtension: string;
  };
};
