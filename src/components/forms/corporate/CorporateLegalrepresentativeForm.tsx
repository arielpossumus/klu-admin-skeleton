"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Pencil, PenOff, Save } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DropdownWithSearch } from "@/components/ui/dropdown-with-search";
import taxRegimeJson from "../../../../public/mockups/annex/getAllTaxRegime.json" with { type: "json" };
import countriesJson from "../../../../public/mockups/annex/getAllcountries.json" with { type: "json" };
import ParagraphH2 from "@/components/text/ParagraphH2";

type CountryItem = { countryId: number; countryCode: string; countryName: string; regions: { regionId: number; regionName: string; }[]; };
const COUNTRIES = countriesJson as CountryItem[];

const TAX_REGIME_OPTIONS = (taxRegimeJson as { regimeId: number; regimeName: string; }[]).map(
    (item) => ({ value: item.regimeName, label: item.regimeName })
);

const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({ value: c.countryCode, label: c.countryName }));

const normalizeForMatch = (s: string) =>
    s.normalize("NFD").replace(/\u0301/g, "").replace(/\u0300/g, "").toLowerCase().trim();

const getDefaultCountryCode = (countryNameOrCode: string | undefined): string => {
    if (!countryNameOrCode) return "";
    const normalized = normalizeForMatch(countryNameOrCode);
    const found = COUNTRIES.find(
        (c) =>
            c.countryCode === countryNameOrCode ||
            normalizeForMatch(c.countryName) === normalized
    );
    return found?.countryCode ?? "";
};

const getDefaultRegionName = (
    countryCode: string,
    regionNameOrId: string | undefined
): string => {
    if (!regionNameOrId) return "";
    const country = COUNTRIES.find((c) => c.countryCode === countryCode);
    const regions = country?.regions ?? [];
    if (regions.length === 0) return regionNameOrId;
    const normalized = normalizeForMatch(regionNameOrId);
    const found = regions.find((r) => normalizeForMatch(r.regionName) === normalized);
    return found?.regionName ?? regionNameOrId;
};

export type CorporateLegalrepresentativeFormValues = {
    name: string;
    lastName: string;
    maternalLastName: string;
    rfc: string;
    socialReason: string;
    taxRegime: string;
    fiscalAddress: {
        country: string;
        region: string;
        city: string;
        street: string;
        zipCode: string;
        externalNumber: string;
        internalNumber: string;
        colony: string;
        municipality: string;
        state: string;
        email: string;
        phone: string;
        ext: string;
    };
    legalContact: {
        name: string;
        lastName: string;
        maternalLastName: string;
        email: string;
        phone: string;
        ext: string;
        phone2: string;
        ext2: string;
        days: string[];
        startHour: string;
        endHour: string;
    };
};

const WEEKDAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] as const;

const defaultLegalContact: CorporateLegalrepresentativeFormValues["legalContact"] = {
    name: "",
    lastName: "",
    maternalLastName: "",
    email: "",
    phone: "",
    ext: "",
    phone2: "",
    ext2: "",
    days: [],
    startHour: "",
    endHour: "",
};

export type CorporateLegalrepresentativeFormProps = {
    defaultValues?: Partial<CorporateLegalrepresentativeFormValues>;
};

const defaultFiscalAddress: CorporateLegalrepresentativeFormValues["fiscalAddress"] = {
    country: "",
    region: "",
    city: "",
    street: "",
    zipCode: "",
    externalNumber: "",
    internalNumber: "",
    colony: "",
    municipality: "",
    state: "",
    email: "",
    phone: "",
    ext: "",
};

export function CorporateLegalrepresentativeForm(
    props: CorporateLegalrepresentativeFormProps
) {
    const { defaultValues } = props;
    const [disabledField, setDisabledField] = useState(true);

    const resolvedFiscalDefaults = useMemo(() => {
        const fa = defaultValues?.fiscalAddress;
        const countryCode = getDefaultCountryCode(fa?.country);
        const regionName = getDefaultRegionName(countryCode, fa?.region);
        return {
            ...defaultFiscalAddress,
            ...fa,
            country: countryCode || defaultFiscalAddress.country,
            region: regionName,
        };
    }, [defaultValues?.fiscalAddress]);

    const resolvedLegalContactDefaults = useMemo(() => ({
        ...defaultLegalContact,
        ...defaultValues?.legalContact,
        days: defaultValues?.legalContact?.days ?? [],
    }), [defaultValues?.legalContact]);

    const { register, watch, setValue, formState: { errors } } = useForm<CorporateLegalrepresentativeFormValues>({
        defaultValues: {
            name: defaultValues?.name ?? "",
            lastName: defaultValues?.lastName ?? "",
            maternalLastName: defaultValues?.maternalLastName ?? "",
            rfc: defaultValues?.rfc ?? "",
            socialReason: defaultValues?.socialReason ?? "",
            taxRegime: defaultValues?.taxRegime ?? "",
            fiscalAddress: resolvedFiscalDefaults,
            legalContact: resolvedLegalContactDefaults,
        },
    });

    const taxRegime = watch("taxRegime") ?? defaultValues?.taxRegime ?? "";
    const countryCode = watch("fiscalAddress.country");
    const regionValue = watch("fiscalAddress.region");

    const selectedCountry = useMemo(
        () => COUNTRIES.find((c) => c.countryCode === countryCode),
        [countryCode]
    );

    const regionOptions = useMemo(() => {
        const regions = selectedCountry?.regions ?? [];
        return regions.map((r) => ({ value: r.regionName, label: r.regionName }));
    }, [selectedCountry]);

    const handleCountryChange = (value: string) => {
        setValue("fiscalAddress.country", value);
        const newCountry = COUNTRIES.find((c) => c.countryCode === value);
        const hasRegion = newCountry?.regions?.some((r) => r.regionName === regionValue);
        if (!hasRegion) {
            setValue("fiscalAddress.region", "");
        }
    };

    const legalContactDays = watch("legalContact.days") ?? [];

    const handleToggleDay = (day: string) => {
        const current = legalContactDays as string[];
        const next = current.includes(day)
            ? current.filter((d) => d !== day)
            : [...current, day];
        setValue("legalContact.days", next);
    };

    const handleDisabledField = () => {
        setDisabledField(!disabledField);
    };

    return (
        <>
            <FieldGroup className="grid grid-cols-1 gap-4 mb-12">
                <div className="col-span-full flex justify-end gap-2">
                    {!disabledField && (
                        <Button
                            type="button"
                            onClick={handleDisabledField}
                            className="bg-[var(--error-dark)] text-white hover:bg-[var(--error-dark)]/90"
                        >
                            <PenOff className="size-4" />
                            Cancelar
                        </Button>
                    )}
                    <Button
                        type="button"
                        onClick={handleDisabledField}
                        className={
                            disabledField
                                ? "bg-[var(--accent)] text-accent-foreground hover:bg-[var(--accent-dark)]"
                                : "bg-[var(--success-dark)] text-white hover:bg-[var(--success-dark)]/90"
                        }
                    >
                        <span className="flex items-center gap-2">
                            {disabledField ? <Pencil className="size-4" /> : <Save className="size-4" />}
                            {disabledField ? "Editar" : "Guardar"}
                        </span>
                    </Button>
                </div>
            </FieldGroup>
            <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
                <ParagraphH2 text="Representante Legal" />
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal-name">Nombre</FieldLabel>
                    <Input
                        id="legal-name"
                        type="text"
                        placeholder="Nombre"
                        aria-invalid={Boolean(errors.name)}
                        {...register("name")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.name ? [errors.name] : undefined} />
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal-lastName">Apellido Paterno</FieldLabel>
                    <Input
                        id="legal-lastName"
                        type="text"
                        placeholder="Apellido paterno"
                        aria-invalid={Boolean(errors.lastName)}
                        {...register("lastName")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.lastName ? [errors.lastName] : undefined} />
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal-maternalLastName">Apellido Materno</FieldLabel>
                    <Input
                        id="legal-maternalLastName"
                        type="text"
                        placeholder="Apellido materno"
                        aria-invalid={Boolean(errors.maternalLastName)}
                        {...register("maternalLastName")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.maternalLastName ? [errors.maternalLastName] : undefined} />
                </Field>
            </FieldGroup>
            <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
                <ParagraphH2 text="Datos Fiscales" />
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="legal-rfc">RFC</FieldLabel>
                    <Input
                        id="legal-rfc"
                        type="text"
                        placeholder="RFC"
                        aria-invalid={Boolean(errors.rfc)}
                        {...register("rfc")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.rfc ? [errors.rfc] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="legal-socialReason">Razón social</FieldLabel>
                    <Input
                        id="legal-socialReason"
                        type="text"
                        placeholder="Razón social"
                        aria-invalid={Boolean(errors.socialReason)}
                        {...register("socialReason")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.socialReason ? [errors.socialReason] : undefined} />
                </Field>
                <Field className="grid gap-2 min-w-0 mb-4">
                    <FieldLabel htmlFor="legal-taxRegime">Régimen fiscal</FieldLabel>
                    <DropdownWithSearch
                        id="legal-taxRegime"
                        options={TAX_REGIME_OPTIONS}
                        value={taxRegime}
                        onValueChange={(value) => setValue("taxRegime", value)}
                        placeholder="Seleccione régimen fiscal"
                        disabled={disabledField}
                        className="min-w-0 w-full"
                    />
                </Field>
            </FieldGroup>
            <FieldGroup className="grid grid-cols-1 gap-4 mb-4 px-0">
                <ParagraphH2 text="Dirección fiscal" />
            </FieldGroup>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                <Field className="grid gap-2 min-w-0 mb-4">
                    <FieldLabel htmlFor="fiscal-country">País</FieldLabel>
                    <DropdownWithSearch
                        id="fiscal-country"
                        options={COUNTRY_OPTIONS}
                        value={countryCode}
                        onValueChange={handleCountryChange}
                        placeholder="Seleccione país"
                        disabled={disabledField}
                        className="min-w-0 w-full"
                    />
                </Field>
                <Field className="grid gap-2 min-w-0 mb-4">
                    <FieldLabel htmlFor="fiscal-region">Estado / Región</FieldLabel>
                    <DropdownWithSearch
                        id="fiscal-region"
                        options={regionOptions}
                        value={regionValue}
                        onValueChange={(value) => setValue("fiscalAddress.region", value)}
                        placeholder={selectedCountry ? (regionOptions.length ? "Seleccione estado o región" : "Sin regiones") : "Seleccione primero un país"}
                        disabled={disabledField || !selectedCountry}
                        className="min-w-0 w-full"
                        emptyLabel="Sin regiones para este país"
                    />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="fiscal-city">Ciudad</FieldLabel>
                    <Input
                        id="fiscal-city"
                        type="text"
                        placeholder="Ciudad"
                        aria-invalid={Boolean(errors.fiscalAddress?.city)}
                        {...register("fiscalAddress.city")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.fiscalAddress?.city ? [errors.fiscalAddress.city] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="fiscal-street">Calle</FieldLabel>
                    <Input
                        id="fiscal-street"
                        type="text"
                        placeholder="Calle"
                        aria-invalid={Boolean(errors.fiscalAddress?.street)}
                        {...register("fiscalAddress.street")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.fiscalAddress?.street ? [errors.fiscalAddress.street] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="fiscal-zipCode">Código postal</FieldLabel>
                    <Input
                        id="fiscal-zipCode"
                        type="text"
                        placeholder="Código postal"
                        aria-invalid={Boolean(errors.fiscalAddress?.zipCode)}
                        {...register("fiscalAddress.zipCode")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.fiscalAddress?.zipCode ? [errors.fiscalAddress.zipCode] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="fiscal-externalNumber">Número exterior</FieldLabel>
                    <Input
                        id="fiscal-externalNumber"
                        type="text"
                        placeholder="Núm. exterior"
                        aria-invalid={Boolean(errors.fiscalAddress?.externalNumber)}
                        {...register("fiscalAddress.externalNumber")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.fiscalAddress?.externalNumber ? [errors.fiscalAddress.externalNumber] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="fiscal-internalNumber">Número interior</FieldLabel>
                    <Input
                        id="fiscal-internalNumber"
                        type="text"
                        placeholder="Núm. interior"
                        aria-invalid={Boolean(errors.fiscalAddress?.internalNumber)}
                        {...register("fiscalAddress.internalNumber")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.fiscalAddress?.internalNumber ? [errors.fiscalAddress.internalNumber] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="fiscal-colony">Colonia</FieldLabel>
                    <Input
                        id="fiscal-colony"
                        type="text"
                        placeholder="Colonia"
                        aria-invalid={Boolean(errors.fiscalAddress?.colony)}
                        {...register("fiscalAddress.colony")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.fiscalAddress?.colony ? [errors.fiscalAddress.colony] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="fiscal-municipality">Municipio / Delegación</FieldLabel>
                    <Input
                        id="fiscal-municipality"
                        type="text"
                        placeholder="Municipio o delegación"
                        aria-invalid={Boolean(errors.fiscalAddress?.municipality)}
                        {...register("fiscalAddress.municipality")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.fiscalAddress?.municipality ? [errors.fiscalAddress.municipality] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="fiscal-state">Estado</FieldLabel>
                    <Input
                        id="fiscal-state"
                        type="text"
                        placeholder="Estado"
                        aria-invalid={Boolean(errors.fiscalAddress?.state)}
                        {...register("fiscalAddress.state")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.fiscalAddress?.state ? [errors.fiscalAddress.state] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4   ">
                    <FieldLabel htmlFor="fiscal-email">Correo electrónico</FieldLabel>
                    <Input
                        id="fiscal-email"
                        type="email"
                        placeholder="Correo electrónico"
                        aria-invalid={Boolean(errors.fiscalAddress?.email)}
                        {...register("fiscalAddress.email")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.fiscalAddress?.email ? [errors.fiscalAddress.email] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="fiscal-phone">Teléfono</FieldLabel>
                    <Input
                        id="fiscal-phone"
                        type="text"
                        placeholder="Teléfono"
                        aria-invalid={Boolean(errors.fiscalAddress?.phone)}
                        {...register("fiscalAddress.phone")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.fiscalAddress?.phone ? [errors.fiscalAddress.phone] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="fiscal-ext">Extensión</FieldLabel>
                    <Input
                        id="fiscal-ext"
                        type="text"
                        placeholder="Ext."
                        aria-invalid={Boolean(errors.fiscalAddress?.ext)}
                        {...register("fiscalAddress.ext")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.fiscalAddress?.ext ? [errors.fiscalAddress.ext] : undefined} />
                </Field>
            </FieldGroup>
            <FieldGroup className="grid grid-cols-1 gap-4 mb-4 px-0">
                <ParagraphH2 text="Contacto legal" />
            </FieldGroup>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="legalContact-name">Nombre</FieldLabel>
                    <Input
                        id="legalContact-name"
                        type="text"
                        placeholder="Nombre"
                        aria-invalid={Boolean(errors.legalContact?.name)}
                        {...register("legalContact.name")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.legalContact?.name ? [errors.legalContact.name] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="legalContact-lastName">Apellido Paterno</FieldLabel>
                    <Input
                        id="legalContact-lastName"
                        type="text"
                        placeholder="Apellido paterno"
                        aria-invalid={Boolean(errors.legalContact?.lastName)}
                        {...register("legalContact.lastName")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.legalContact?.lastName ? [errors.legalContact.lastName] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="legalContact-maternalLastName">Apellido Materno</FieldLabel>
                    <Input
                        id="legalContact-maternalLastName"
                        type="text"
                        placeholder="Apellido materno"
                        aria-invalid={Boolean(errors.legalContact?.maternalLastName)}
                        {...register("legalContact.maternalLastName")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.legalContact?.maternalLastName ? [errors.legalContact.maternalLastName] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="legalContact-email">Correo electrónico</FieldLabel>
                    <Input
                        id="legalContact-email"
                        type="email"
                        placeholder="Correo electrónico"
                        aria-invalid={Boolean(errors.legalContact?.email)}
                        {...register("legalContact.email")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.legalContact?.email ? [errors.legalContact.email] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="legalContact-phone">Teléfono</FieldLabel>
                    <Input
                        id="legalContact-phone"
                        type="text"
                        placeholder="Teléfono"
                        aria-invalid={Boolean(errors.legalContact?.phone)}
                        {...register("legalContact.phone")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.legalContact?.phone ? [errors.legalContact.phone] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="legalContact-ext">Extensión</FieldLabel>
                    <Input
                        id="legalContact-ext"
                        type="text"
                        placeholder="Ext."
                        aria-invalid={Boolean(errors.legalContact?.ext)}
                        {...register("legalContact.ext")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.legalContact?.ext ? [errors.legalContact.ext] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="legalContact-phone2">Teléfono 2</FieldLabel>
                    <Input
                        id="legalContact-phone2"
                        type="text"
                        placeholder="Teléfono 2"
                        aria-invalid={Boolean(errors.legalContact?.phone2)}
                        {...register("legalContact.phone2")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.legalContact?.phone2 ? [errors.legalContact.phone2] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="legalContact-ext2">Extensión 2</FieldLabel>
                    <Input
                        id="legalContact-ext2"
                        type="text"
                        placeholder="Ext. 2"
                        aria-invalid={Boolean(errors.legalContact?.ext2)}
                        {...register("legalContact.ext2")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.legalContact?.ext2 ? [errors.legalContact.ext2] : undefined} />
                </Field>
                <Field className="grid gap-2 md:col-span-2 mb-4">
                    <FieldLabel>Días de atención</FieldLabel>
                    <ButtonGroup className="flex-wrap">
                        {WEEKDAYS.map((day) => {
                            const isSelected = legalContactDays.includes(day);
                            return (
                                <Button
                                    key={day}
                                    type="button"
                                    variant={isSelected ? "default" : "outline"}
                                    size="sm"
                                    disabled={disabledField}
                                    onClick={() => handleToggleDay(day)}
                                    className={
                                        isSelected
                                            ? "bg-[var(--accent)] text-accent-foreground hover:bg-[var(--accent-dark)]"
                                            : "bg-[var(--background)] text-foreground hover:bg-[var(--accent)] hover:text-accent-foreground"
                                    }
                                >
                                    {day}
                                </Button>
                            );
                        })}
                    </ButtonGroup>
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="legalContact-startHour">Hora de inicio</FieldLabel>
                    <Input
                        id="legalContact-startHour"
                        type="time"
                        aria-invalid={Boolean(errors.legalContact?.startHour)}
                        {...register("legalContact.startHour")}
                        disabled={disabledField}
                        className="h-9"
                    />
                    <FieldError errors={errors.legalContact?.startHour ? [errors.legalContact.startHour] : undefined} />
                </Field>
                <Field className="grid gap-2 mb-4">
                    <FieldLabel htmlFor="legalContact-endHour">Hora de fin</FieldLabel>
                    <Input
                        id="legalContact-endHour"
                        type="time"
                        aria-invalid={Boolean(errors.legalContact?.endHour)}
                        {...register("legalContact.endHour")}
                        disabled={disabledField}
                        className="h-9"
                    />
                    <FieldError errors={errors.legalContact?.endHour ? [errors.legalContact.endHour] : undefined} />
                </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-full flex justify-end gap-2">
                    {!disabledField && (
                        <Button
                            type="button"
                            onClick={handleDisabledField}
                            className="bg-[var(--error-dark)] text-white hover:bg-[var(--error-dark)]/90"
                        >
                            <PenOff className="size-4" />
                            Cancelar
                        </Button>
                    )}
                    <Button
                        type="button"
                        onClick={handleDisabledField}
                        className={
                            disabledField
                                ? "bg-[var(--accent)] text-accent-foreground hover:bg-[var(--accent-dark)]"
                                : "bg-[var(--success-dark)] text-white hover:bg-[var(--success-dark)]/90"
                        }
                    >
                        <span className="flex items-center gap-2">
                            {disabledField ? <Pencil className="size-4" /> : <Save className="size-4" />}
                            {disabledField ? "Editar" : "Guardar"}
                        </span>
                    </Button>
                </div>
            </FieldGroup>
        </>
    );
}
