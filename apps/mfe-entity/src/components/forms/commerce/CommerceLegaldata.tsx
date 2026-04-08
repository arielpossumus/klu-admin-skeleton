"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import { CustomFormButtons } from "@/components/commons/CustomFormButtons";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  DropdownWithSearch,
  type DropdownWithSearchOption,
} from "@/components/ui/dropdown-with-search";
import {
  resolveCountryIdForForm,
  resolveRegionIdForForm,
} from "@/lib/matchCountryRegion";
import { resolvePropertyTypeIdForForm } from "@/lib/matchPropertyType";
import { resolveRegimeIdForForm } from "@/lib/matchTaxRegime";
import { countriesService } from "@/services/annex/countriesService";
import { propertyTypeService } from "@/services/annex/PropertiesTypeService";
import { taxRegimeService } from "@/services/annex/taxRegimeService";
import type {
  CommerceAddress,
  CommerceFiscalData,
  CommerceLegalContact,
  CommerceLegalData,
} from "@/types/commerce/CommerceList";
import type {
  CommerceAddressFormValues,
  CommerceLegalFormValues,
} from "@/types/commerce/CommerceLegalFormValues";
import ParagraphH2 from "@/components/text/ParagraphH2";
import ParagraphH4 from "@/components/text/ParagraphH4";

export type CommerceLegaldataProps = {
  legalData?: CommerceLegalData;
  fiscalData?: CommerceFiscalData;
  legalContact?: CommerceLegalContact;
};

const emptyAddress = (): CommerceAddressFormValues => ({
  street: "",
  outNumber: "",
  inNumber: "",
  city: "",
  town: "",
  municipaly: "",
  zip: "",
  country: "",
  region: "",
  state: "",
});

/** Convierte fechas tipo API (ej. dd/MM/yyyy) a yyyy-MM-dd para el DatePicker. */
const normalizeBirthDateForForm = (raw: string | undefined): string => {
  if (!raw?.trim()) return "";
  const t = raw.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return t;
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(t);
  if (!m) return t;
  const dd = m[1].padStart(2, "0");
  const mm = m[2].padStart(2, "0");
  const yyyy = m[3];
  return `${yyyy}-${mm}-${dd}`;
};

const mergeAddress = (partial?: CommerceAddress): CommerceAddressFormValues => ({
  ...emptyAddress(),
  ...{
    street: partial?.street ?? "",
    outNumber: partial?.outNumber ?? "",
    inNumber: partial?.inNumber ?? "",
    city: partial?.city ?? "",
    town: partial?.town ?? "",
    municipaly: partial?.municipaly ?? "",
    zip: partial?.zip ?? "",
    country: partial?.country ?? "",
    region: partial?.region ?? "",
    state: partial?.state ?? "",
  },
});

const buildDefaults = (
  legalData?: CommerceLegalData,
  fiscalData?: CommerceFiscalData,
  legalContact?: CommerceLegalContact
): CommerceLegalFormValues => {
  const rep = legalData?.["Legal Representative"];
  const contact = legalContact ?? fiscalData?.legalContact;

  return {
    representative: {
      firstName: rep?.firstName ?? "",
      paternalLastName: rep?.paternalLastName ?? "",
      maternalLastName: rep?.maternalLastName ?? "",
      documentType: rep?.documentType ?? "",
      documentNumber: rep?.documentNumber ?? "",
      birthDate: normalizeBirthDateForForm(rep?.birthDate),
      representativeRfc: rep?.representativeRfc ?? "",
      address: mergeAddress(rep?.address),
    },
    fiscal: {
      rfc: fiscalData?.rfc ?? "",
      legalName: fiscalData?.legalName ?? "",
      fiscalRegime: fiscalData?.fiscalRegime ?? "",
      propertyType: fiscalData?.propertyType ?? "",
      address: mergeAddress(fiscalData?.fiscalAddress),
    },
    contact: {
      preferredLanguage: contact?.preferredLanguage ?? "",
      email: contact?.email ?? "",
      phone: contact?.phone ?? "",
      phoneExtension: contact?.phoneExtension ?? "",
      additionalPhone: contact?.additionalPhone ?? "",
      additionalPhoneExtension: contact?.additionalPhoneExtension ?? "",
    },
  };
};

/** Obligatorio solo al editar; en solo lectura no valida (evita errores con campos deshabilitados). */
const requiredWhenEditing =
  (readOnly: boolean, message: string) =>
    (value: unknown): true | string => {
      if (readOnly) return true;
      if (value == null) return message;
      if (typeof value === "string" && value.trim() === "") return message;
      return true;
    };

const emailWhenEditing =
  (readOnly: boolean) =>
    (value: unknown): true | string => {
      if (readOnly) return true;
      const s = value == null ? "" : String(value).trim();
      if (s === "") return "El correo es obligatorio";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return "Ingresá un correo válido";
      return true;
    };

export const CommerceLegaldata = ({
  legalData,
  fiscalData,
  legalContact,
}: CommerceLegaldataProps) => {
  const [isReadOnly, setIsReadOnly] = useState(true);

  const defaults = useMemo(
    () => buildDefaults(legalData, fiscalData, legalContact),
    [legalData, fiscalData, legalContact]
  );

  const { data: countriesList = [] } = useQuery({
    queryKey: ["countries-list"],
    queryFn: () => countriesService.getAll(),
    staleTime: 60 * 60 * 1000,
  });

  const { data: taxRegimesList = [] } = useQuery({
    queryKey: ["tax-regimes-list"],
    queryFn: () => taxRegimeService.getAll(),
    staleTime: 60 * 60 * 1000,
  });

  const { data: propertyTypesList = [] } = useQuery({
    queryKey: ["property-types-list"],
    queryFn: () => propertyTypeService.getAll(),
    staleTime: 60 * 60 * 1000,
  });

  const paisOptions: DropdownWithSearchOption[] = useMemo(
    () =>
      countriesList.map((c) => ({
        value: String(c.countryId),
        label: c.countryName,
      })),
    [countriesList]
  );

  const taxRegimeOptions: DropdownWithSearchOption[] = useMemo(
    () =>
      taxRegimesList.map((r) => ({
        value: String(r.regimeId),
        label: r.regimeName,
      })),
    [taxRegimesList]
  );

  const propertyTypeOptions: DropdownWithSearchOption[] = useMemo(
    () =>
      propertyTypesList.map((p) => ({
        value: String(p.propertyTypeId),
        label: p.propertyTypeName,
      })),
    [propertyTypesList]
  );

  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<CommerceLegalFormValues>({
    defaultValues: defaults,
  });

  const repCountryId = watch("representative.address.country");
  const fiscalCountryId = watch("fiscal.address.country");

  const repRegionOptions: DropdownWithSearchOption[] = useMemo(() => {
    if (!repCountryId) return [];
    const c = countriesList.find(
      (x) => String(x.countryId) === repCountryId
    );
    return (c?.regions ?? []).map((r) => ({
      value: String(r.regionId),
      label: r.regionName,
    }));
  }, [countriesList, repCountryId]);

  const fiscalRegionOptions: DropdownWithSearchOption[] = useMemo(() => {
    if (!fiscalCountryId) return [];
    const c = countriesList.find(
      (x) => String(x.countryId) === fiscalCountryId
    );
    return (c?.regions ?? []).map((r) => ({
      value: String(r.regionId),
      label: r.regionName,
    }));
  }, [countriesList, fiscalCountryId]);

  useEffect(() => {
    reset(defaults);
    if (!countriesList.length) return;
    const repCid = resolveCountryIdForForm(
      defaults.representative.address.country,
      countriesList
    );
    const repRid = resolveRegionIdForForm(
      defaults.representative.address.region,
      repCid,
      countriesList
    );
    const fiscalCid = resolveCountryIdForForm(
      defaults.fiscal.address.country,
      countriesList
    );
    const fiscalRid = resolveRegionIdForForm(
      defaults.fiscal.address.region,
      fiscalCid,
      countriesList
    );
    setValue("representative.address.country", repCid);
    setValue("representative.address.region", repRid);
    setValue("fiscal.address.country", fiscalCid);
    setValue("fiscal.address.region", fiscalRid);
  }, [defaults, reset, countriesList, setValue]);

  useEffect(() => {
    if (!taxRegimesList.length) return;
    const regimeId = resolveRegimeIdForForm(
      defaults.fiscal.fiscalRegime,
      taxRegimesList
    );
    setValue("fiscal.fiscalRegime", regimeId);
  }, [defaults, taxRegimesList, setValue]);

  useEffect(() => {
    if (!propertyTypesList.length) return;
    const typeId = resolvePropertyTypeIdForForm(
      defaults.fiscal.propertyType,
      propertyTypesList
    );
    setValue("fiscal.propertyType", typeId);
  }, [defaults, propertyTypesList, setValue]);

  const handleToggle = useCallback(() => {
    setIsReadOnly((prev) => {
      if (!prev) {
        reset(defaults);
      } else {
        clearErrors();
      }
      return !prev;
    });
  }, [clearErrors, defaults, reset]);

  const onSubmit = useCallback(() => {
    setIsReadOnly(true);
  }, []);

  const hasContent = Boolean(legalData ?? fiscalData ?? legalContact);

    return (
    <div
      aria-label={
        hasContent ? "Datos legales del comercio" : "Sin datos legales"
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <section
          className="space-y-4"
          aria-labelledby="commerce-legal-rep-heading"
        >
          <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
            <ParagraphH2 text="Representante Legal" />
          </FieldGroup>
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-first-name">
                Nombre<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="legal-rep-first-name"
                disabled={isReadOnly}
                aria-invalid={Boolean(errors.representative?.firstName)}
                {...register("representative.firstName", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El nombre es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.representative?.firstName
                    ? [errors.representative.firstName]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-paternal">
                Apellido paterno<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="legal-rep-paternal"
                disabled={isReadOnly}
                aria-invalid={Boolean(errors.representative?.paternalLastName)}
                {...register("representative.paternalLastName", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El apellido paterno es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.representative?.paternalLastName
                    ? [errors.representative.paternalLastName]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-maternal">
                Apellido materno
              </FieldLabel>
              <Input
                id="legal-rep-maternal"
                disabled={isReadOnly}
                {...register("representative.maternalLastName")}
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-doc-type">
                Tipo de documento<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="legal-rep-doc-type"
                disabled={isReadOnly}
                aria-invalid={Boolean(errors.representative?.documentType)}
                {...register("representative.documentType", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El tipo de documento es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.representative?.documentType
                    ? [errors.representative.documentType]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-doc-number">
                Número de documento<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="legal-rep-doc-number"
                disabled={isReadOnly}
                aria-invalid={Boolean(errors.representative?.documentNumber)}
                {...register("representative.documentNumber", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El número de documento es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.representative?.documentNumber
                    ? [errors.representative.documentNumber]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-birth">
                Fecha de nacimiento<span className="text-destructive">*</span>
              </FieldLabel>
              <Controller
                name="representative.birthDate"
                control={control}
                rules={{
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "La fecha de nacimiento es obligatoria"
                  ),
                }}
                render={({ field, fieldState }) => (
                  <DatePicker
                    id="legal-rep-birth"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isReadOnly}
                    aria-invalid={fieldState.invalid}
                  />
                )}
              />
              <FieldError
                errors={
                  errors.representative?.birthDate
                    ? [errors.representative.birthDate]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2 ">
              <FieldLabel htmlFor="legal-rep-rfc">
                RFC del representante<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="legal-rep-rfc"
                disabled={isReadOnly}
                aria-invalid={Boolean(errors.representative?.representativeRfc)}
                {...register("representative.representativeRfc", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El RFC del representante es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.representative?.representativeRfc
                    ? [errors.representative.representativeRfc]
                    : undefined
                }
              />
            </Field>

          </FieldGroup>

          <FieldGroup className="grid grid-cols-1  gap-4 px-0 mt-12 mb-12">
            <ParagraphH4 text="Domicilio del representante" />
          </FieldGroup>
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-addr-country">
                País<span className="text-destructive">*</span>
              </FieldLabel>
              <Controller
                control={control}
                name="representative.address.country"
                rules={{
                  validate: requiredWhenEditing(isReadOnly, "El país es obligatorio"),
                }}
                render={({ field, fieldState }) => (
                  <>
                    <DropdownWithSearch
                      id="legal-rep-addr-country"
                      options={paisOptions}
                      value={field.value ?? ""}
                      onValueChange={(v) => {
                        field.onChange(v);
                        setValue("representative.address.region", "");
                      }}
                      placeholder="Seleccione país"
                      disabled={isReadOnly}
                    />
                    <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                  </>
                )}
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-addr-region">
                Región<span className="text-destructive">*</span>
              </FieldLabel>
              <Controller
                control={control}
                name="representative.address.region"
                rules={{
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "La región es obligatoria"
                  ),
                }}
                render={({ field, fieldState }) => (
                  <>
                    <DropdownWithSearch
                      id="legal-rep-addr-region"
                      options={repRegionOptions}
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      placeholder="Seleccione región"
                      disabled={isReadOnly || !repCountryId}
                    />
                    <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                  </>
                )}
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-addr-city">
                Ciudad<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="legal-rep-addr-city"
                disabled={isReadOnly}
                {...register("representative.address.city", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "La ciudad es obligatoria"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.representative?.address?.city
                    ? [errors.representative.address.city]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-addr-street">
                Calle<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="legal-rep-addr-street"
                disabled={isReadOnly}
                {...register("representative.address.street", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "La calle es obligatoria"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.representative?.address?.street
                    ? [errors.representative.address.street]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-addr-zip">
                Código postal<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="legal-rep-addr-zip"
                disabled={isReadOnly}
                {...register("representative.address.zip", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El código postal es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.representative?.address?.zip
                    ? [errors.representative.address.zip]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-addr-out">
                Número exterior<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="legal-rep-addr-out"
                disabled={isReadOnly}
                {...register("representative.address.outNumber", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El número exterior es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.representative?.address?.outNumber
                    ? [errors.representative.address.outNumber]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-addr-in">
                Número interior
              </FieldLabel>
              <Input
                id="legal-rep-addr-in"
                disabled={isReadOnly}
                {...register("representative.address.inNumber")}
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-addr-town">
                Colonia<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="legal-rep-addr-town"
                disabled={isReadOnly}
                {...register("representative.address.town", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "La colonia es obligatoria"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.representative?.address?.town
                    ? [errors.representative.address.town]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-addr-municipaly">
                Municipio<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="legal-rep-addr-municipaly"
                disabled={isReadOnly}
                {...register("representative.address.municipaly", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El municipio es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.representative?.address?.municipaly
                    ? [errors.representative.address.municipaly]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="legal-rep-addr-state">Estado</FieldLabel>
              <Input
                id="legal-rep-addr-state"
                disabled={isReadOnly}
                {...register("representative.address.state")}
              />
            </Field>
          </FieldGroup>

        </section>
        <FieldGroup className="grid grid-cols-1  gap-4 px-0 mt-4 mb-4">
          <CustomFormButtons isReadOnly={isReadOnly} onToggle={handleToggle} />
        </FieldGroup>
        <section
          className="space-y-4"
          aria-labelledby="commerce-fiscal-heading"
        >
          <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
            <ParagraphH2 text="Datos fiscales" />
          </FieldGroup>
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Field className="grid gap-2">
              <FieldLabel htmlFor="fiscal-rfc">
                RFC<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="fiscal-rfc"
                disabled={isReadOnly}
                {...register("fiscal.rfc", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El RFC es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={errors.fiscal?.rfc ? [errors.fiscal.rfc] : undefined}
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="fiscal-legal-name">
                Razón social<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="fiscal-legal-name"
                disabled={isReadOnly}
                {...register("fiscal.legalName", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "La razón social es obligatoria"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.fiscal?.legalName
                    ? [errors.fiscal.legalName]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2 md:col-span-2">
              <FieldLabel htmlFor="fiscal-regime">
                Régimen fiscal<span className="text-destructive">*</span>
              </FieldLabel>
              <Controller
                control={control}
                name="fiscal.fiscalRegime"
                rules={{
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El régimen fiscal es obligatorio"
                  ),
                }}
                render={({ field, fieldState }) => (
                  <>
                    <DropdownWithSearch
                      id="fiscal-regime"
                      options={taxRegimeOptions}
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      placeholder="Seleccione régimen fiscal"
                      disabled={isReadOnly}
                      emptyLabel="Sin resultados"
                    />
                    <FieldError
                      errors={
                        fieldState.error ? [fieldState.error] : undefined
                      }
                    />
                  </>
                )}
              />
            </Field>
            <Field className="grid gap-2 md:col-span-2">
              <FieldLabel htmlFor="fiscal-property-type">
                Tipo de propiedad
              </FieldLabel>
              <Controller
                control={control}
                name="fiscal.propertyType"
                render={({ field }) => (
                  <DropdownWithSearch
                    id="fiscal-property-type"
                    options={propertyTypeOptions}
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    placeholder="Seleccione tipo de propiedad"
                    disabled={isReadOnly}
                    emptyLabel="Sin resultados"
                  />
                )}
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="grid grid-cols-1  gap-4 px-0 mt-12 mb-12">
            <ParagraphH4 text="Domicilio fiscal" />
          </FieldGroup>
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Field className="grid gap-2">
              <FieldLabel htmlFor="fiscal-addr-country">
                País<span className="text-destructive">*</span>
              </FieldLabel>
              <Controller
                control={control}
                name="fiscal.address.country"
                rules={{
                  validate: requiredWhenEditing(isReadOnly, "El país es obligatorio"),
                }}
                render={({ field, fieldState }) => (
                  <>
                    <DropdownWithSearch
                      id="fiscal-addr-country"
                      options={paisOptions}
                      value={field.value ?? ""}
                      onValueChange={(v) => {
                        field.onChange(v);
                        setValue("fiscal.address.region", "");
                      }}
                      placeholder="Seleccione país"
                      disabled={isReadOnly}
                    />
                    <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                  </>
                )}
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="fiscal-addr-region">
                Región<span className="text-destructive">*</span>
              </FieldLabel>
              <Controller
                control={control}
                name="fiscal.address.region"
                rules={{
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "La región es obligatoria"
                  ),
                }}
                render={({ field, fieldState }) => (
                  <>
                    <DropdownWithSearch
                      id="fiscal-addr-region"
                      options={fiscalRegionOptions}
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      placeholder="Seleccione región"
                      disabled={isReadOnly || !fiscalCountryId}
                    />
                    <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                  </>
                )}
              />
            </Field>
            <Field className="grid gap-2 md:col-span-2">
              <FieldLabel htmlFor="fiscal-addr-city">
                Ciudad<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="fiscal-addr-city"
                disabled={isReadOnly}
                {...register("fiscal.address.city", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "La ciudad es obligatoria"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.fiscal?.address?.city
                    ? [errors.fiscal.address.city]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2 md:col-span-2">
              <FieldLabel htmlFor="fiscal-addr-street">
                Calle<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="fiscal-addr-street"
                disabled={isReadOnly}
                {...register("fiscal.address.street", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "La calle es obligatoria"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.fiscal?.address?.street
                    ? [errors.fiscal.address.street]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="fiscal-addr-zip">
                Código postal<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="fiscal-addr-zip"
                disabled={isReadOnly}
                {...register("fiscal.address.zip", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El código postal es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.fiscal?.address?.zip
                    ? [errors.fiscal.address.zip]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="fiscal-addr-out">
                Número exterior<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="fiscal-addr-out"
                disabled={isReadOnly}
                {...register("fiscal.address.outNumber", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El número exterior es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.fiscal?.address?.outNumber
                    ? [errors.fiscal.address.outNumber]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="fiscal-addr-in">
                Número interior
              </FieldLabel>
              <Input
                id="fiscal-addr-in"
                disabled={isReadOnly}
                {...register("fiscal.address.inNumber")}
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="fiscal-addr-town">
                Colonia<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="fiscal-addr-town"
                disabled={isReadOnly}
                {...register("fiscal.address.town", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "La colonia es obligatoria"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.fiscal?.address?.town
                    ? [errors.fiscal.address.town]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="fiscal-addr-municipaly">
                Municipio<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="fiscal-addr-municipaly"
                disabled={isReadOnly}
                {...register("fiscal.address.municipaly", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El municipio es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.fiscal?.address?.municipaly
                    ? [errors.fiscal.address.municipaly]
                    : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="fiscal-addr-state">Estado</FieldLabel>
              <Input
                id="fiscal-addr-state"
                disabled={isReadOnly}
                {...register("fiscal.address.state")}
              />
            </Field>
          </FieldGroup>
        </section>
        <FieldGroup className="grid grid-cols-1  gap-4 px-0 mt-4 mb-4">
          <CustomFormButtons isReadOnly={isReadOnly} onToggle={handleToggle} />
        </FieldGroup>
        <section
          className="space-y-4"
          aria-labelledby="commerce-legal-contact-heading"
        >
          <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
            <ParagraphH2 text="Contacto" />
          </FieldGroup>
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Field className="grid gap-2">
              <FieldLabel htmlFor="contact-lang">
                Idioma preferido
              </FieldLabel>
              <Input
                id="contact-lang"
                disabled={isReadOnly}
                {...register("contact.preferredLanguage")}
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="contact-email">
                Correo electrónico<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                disabled={isReadOnly}
                {...register("contact.email", {
                  validate: emailWhenEditing(isReadOnly),
                })}
              />
              <FieldError
                errors={
                  errors.contact?.email ? [errors.contact.email] : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="contact-phone">
                Teléfono<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="contact-phone"
                type="tel"
                disabled={isReadOnly}
                {...register("contact.phone", {
                  validate: requiredWhenEditing(
                    isReadOnly,
                    "El teléfono es obligatorio"
                  ),
                })}
              />
              <FieldError
                errors={
                  errors.contact?.phone ? [errors.contact.phone] : undefined
                }
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="contact-phone-ext">Ext.</FieldLabel>
              <Input
                id="contact-phone-ext"
                disabled={isReadOnly}
                {...register("contact.phoneExtension")}
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="contact-phone-add">
                Teléfono adicional
              </FieldLabel>
              <Input
                id="contact-phone-add"
                type="tel"
                disabled={isReadOnly}
                {...register("contact.additionalPhone")}
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="contact-phone-add-ext">Ext.</FieldLabel>
              <Input
                id="contact-phone-add-ext"
                disabled={isReadOnly}
                {...register("contact.additionalPhoneExtension")}
              />
            </Field>
          </FieldGroup>
        </section>

        <CustomFormButtons isReadOnly={isReadOnly} onToggle={handleToggle} />
      </form>
        </div>
    );
};
