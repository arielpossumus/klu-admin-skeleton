export type GeneralFormValues = {
    nombreCorporativo: string;
    fiid: string;
    rsa: string;
    logoTicket: FileList | null;
    logoInicio: FileList | null;
    modeloCorporativo: string;
};

export type LegalFormValues = {
    repLegalNombre: string;
    repLegalApellidoPaterno: string;
    repLegalApellidoMaterno: string;
    rfc: string;
    razonSocial: string;
    regimenFiscal: string;
    pais: string;
    region: string;
    ciudad: string;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    colonia: string;
    delegacionMunicipio: string;
    codigoPostal: string;
    email: string;
    telefono: string;
    telefonoExt: string;
    contactoLegalNombre: string;
    contactoLegalApellidoPaterno: string;
    contactoLegalApellidoMaterno: string;
    horarioAtencionDias: string[];
    horarioAtencionInicio: string;
    horarioAtencionFin: string;
    contactoLegalEmail: string;
    contactoLegalTelefono: string;
    contactoLegalTelefonoExt: string;
    contactoLegalTelefonoOpcional: string;
    contactoLegalTelefonoOpcionalExt: string;
};

/** Bloque de contacto (Comercial, Soporte, Finanzas). */
export type ContactBlockFormValues = {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    dias: string[];
    inicio: string;
    fin: string;
    email: string;
    telefono: string;
    telefonoExt: string;
    telefonoOpcional: string;
    telefonoOpcionalExt: string;
};

export type ContactsFormValues = {
    comercial: ContactBlockFormValues;
    soporte: ContactBlockFormValues;
    finanzas: ContactBlockFormValues;
};

/** Paso 4: Comercial (Adquirente + Costos Transaccional). */
export type CommercialFormValues = {
    adquirente: boolean;
    credito: string;
    debito: string;
    bancoAdquirente: string;
    canales: string;
    rentaMensual: string;
    diasCancelacion: string;
    numeroTransacciones: string;
};

/** Paso 5: Módulos habilitados (cada clave = switch on/off). */
export type ModulesFormValues = {
    inicio: boolean;
    posHealth: boolean;
    transacciones: boolean;
    versionesTpv: boolean;
    corporativo: boolean;
    comercio: boolean;
    sucursal: boolean;
    dispositivos: boolean;
    usuarios: boolean;
    comercioMovil: boolean;
    dispositivoMovil: boolean;
    finanzas: boolean;
    monitoreoMomentum: boolean;
    transaccional: boolean;
    ecommerce: boolean;
    moTo: boolean;
    cargosProgramados: boolean;
    cargosRecurrentes: boolean;
    tokenizacion: boolean;
    antifraude: boolean;
    urlDePago: boolean;
    miEcommerce: boolean;
    botonDePago: boolean;
    threeDSecure: boolean;
    paymentMethodCheckout: boolean;
    altaDeSpeis: boolean;
};

/** Valores del formulario de alta de corporativo. Ampliar según campos por pestaña. */
export type AddCorporateFormValues = {
    general?: GeneralFormValues;
    legal?: LegalFormValues;
    contacts?: ContactsFormValues;
    commercial?: CommercialFormValues;
    modules?: ModulesFormValues;
};
