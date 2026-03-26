import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { DropdownWithSearch, type DropdownWithSearchOption } from "@/components/ui/dropdown-with-search";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { WeekDaysButtonGroup } from "@/components/commons/WeekDaysButtonGroup";
import { taxRegimeService } from "@/services/annex/taxRegimeService";
import { countriesService } from "@/services/annex/countriesService";
import ParagraphH2 from "@/components/text/ParagraphH2";
import { emailValidation, moreThan4CharactersValidation } from "@/lib/validation";
import type { AddCorporateFormValues } from "@/types/corporate/addCorporate";

export function Step2() {
    const form = useFormContext<AddCorporateFormValues>();

    const { data: taxRegimeList = [] } = useQuery({
        queryKey: ["tax-regime-list"],
        queryFn: async () => {
            try {
                return await taxRegimeService.getAll();
            } catch {
                return [];
            }
        },
        placeholderData: [],
    });
    const { data: countriesList = [] } = useQuery({
        queryKey: ["countries-list"],
        queryFn: async () => {
            try {
                return await countriesService.getAll();
            } catch {
                return [];
            }
        },
        placeholderData: [],
    });

    const regimenFiscalOptions: DropdownWithSearchOption[] = useMemo(
        () =>
            (Array.isArray(taxRegimeList) ? taxRegimeList : []).map((item) => ({
                value: String(item.regimeId),
                label: item.regimeName,
            })),
        [taxRegimeList]
    );

    const paisOptions: DropdownWithSearchOption[] = useMemo(
        () =>
            (Array.isArray(countriesList) ? countriesList : []).map((item) => ({
                value: String(item.countryId),
                label: item.countryName,
            })),
        [countriesList]
    );

    const paisValue = form.watch("legal.pais");
    const regionOptions: DropdownWithSearchOption[] = useMemo(() => {
        if (!paisValue || !Array.isArray(countriesList)) return [];
        const country = countriesList.find((c) => String(c.countryId) === paisValue);
        if (!country?.regions?.length) return [];
        return country.regions.map((r) => ({
            value: String(r.regionId),
            label: r.regionName,
        }));
    }, [countriesList, paisValue]);

    return (
        <div className="flex flex-col gap-8">
            {/* Representante Legal */}
            <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
                <ParagraphH2 text="Representante Legal" />
            </FieldGroup>
            <FieldSet className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.repLegalNombre">
                        Nombre <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.repLegalNombre"
                            placeholder="Nombre"
                            aria-required
                            {...form.register("legal.repLegalNombre", { required: "Requerido", ...moreThan4CharactersValidation, })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.repLegalNombre]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.repLegalApellidoPaterno">
                        Apellido Paterno <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.repLegalApellidoPaterno"
                            placeholder="Apellido Paterno"
                            aria-required
                            {...form.register("legal.repLegalApellidoPaterno", { required: "Requerido", ...moreThan4CharactersValidation, })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.repLegalApellidoPaterno]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.repLegalApellidoMaterno">
                        Apellido Materno <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.repLegalApellidoMaterno"
                            placeholder="Apellido Materno"
                            aria-required
                            {...form.register("legal.repLegalApellidoMaterno", { required: "Requerido", ...moreThan4CharactersValidation, })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.repLegalApellidoMaterno]} />
                    </FieldContent>
                </Field>
            </FieldSet>

            {/* Datos Fiscales */}
            <FieldSet className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FieldLegend className="mb-3 text-base font-medium">Datos Fiscales</FieldLegend>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.rfc">
                        RFC <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.rfc"
                            placeholder="RFC"
                            aria-required
                            {...form.register("legal.rfc", { required: "Requerido" })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.rfc]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.razonSocial">
                        Razón Social <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.razonSocial"
                            placeholder="Razón Social"
                            aria-required
                            {...form.register("legal.razonSocial", { required: "Requerido", ...moreThan4CharactersValidation, })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.razonSocial]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel>
                        Régimen Fiscal <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Controller
                            control={form.control}
                            name="legal.regimenFiscal"
                            rules={{ required: "Requerido" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <DropdownWithSearch
                                        options={regimenFiscalOptions}
                                        value={field.value ?? ""}
                                        onValueChange={field.onChange}
                                        placeholder="Seleccione régimen fiscal"
                                        id="legal.regimenFiscal"
                                    />
                                    <FieldError errors={[fieldState.error]} />
                                </>
                            )}
                        />
                    </FieldContent>
                </Field>
            </FieldSet>

            {/* Dirección */}
            <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
                <ParagraphH2 text="Dirección" />
            </FieldGroup>
            <FieldSet className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Field className="grid gap-2">
                    <FieldLabel>
                        País <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Controller
                            control={form.control}
                            name="legal.pais"
                            rules={{ required: "Requerido" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <DropdownWithSearch
                                        options={paisOptions}
                                        value={field.value ?? ""}
                                        onValueChange={(v) => {
                                            field.onChange(v);
                                            form.setValue("legal.region", "");
                                        }}
                                        placeholder="Seleccione país"
                                        id="legal.pais"
                                    />
                                    <FieldError errors={[fieldState.error]} />
                                </>
                            )}
                        />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel>
                        Región <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Controller
                            control={form.control}
                            name="legal.region"
                            rules={{ required: "Requerido" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <DropdownWithSearch
                                        options={regionOptions}
                                        value={field.value ?? ""}
                                        onValueChange={field.onChange}
                                        placeholder="Seleccione región"
                                        id="legal.region"
                                        disabled={!paisValue}
                                    />
                                    <FieldError errors={[fieldState.error]} />
                                </>
                            )}
                        />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.ciudad">
                        Ciudad <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.ciudad"
                            placeholder="Ciudad"
                            aria-required
                            {...form.register("legal.ciudad", { required: "Requerido", ...moreThan4CharactersValidation, })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.ciudad]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.calle">
                        Calle <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.calle"
                            placeholder="Calle"
                            aria-required
                            {...form.register("legal.calle", { required: "Requerido", ...moreThan4CharactersValidation, })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.calle]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.numeroExterior">
                        Número Exterior <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.numeroExterior"
                            placeholder="Núm. Exterior"
                            aria-required
                            {...form.register("legal.numeroExterior", { required: "Requerido" })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.numeroExterior]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.numeroInterior">Número Interior</FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.numeroInterior"
                            placeholder="Núm. Interior"
                            {...form.register("legal.numeroInterior")}
                        />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.colonia">
                        Colonia <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.colonia"
                            placeholder="Colonia"
                            aria-required
                            {...form.register("legal.colonia", { required: "Requerido" })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.colonia]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.delegacionMunicipio">
                        Delegación o Municipio <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.delegacionMunicipio"
                            placeholder="Delegación o Municipio"
                            aria-required
                            {...form.register("legal.delegacionMunicipio", { required: "Requerido", ...moreThan4CharactersValidation, })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.delegacionMunicipio]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.codigoPostal">
                        Código Postal <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.codigoPostal"
                            placeholder="C.P."
                            aria-required
                            {...form.register("legal.codigoPostal", { required: "Requerido" })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.codigoPostal]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2 ">
                    <FieldLabel htmlFor="legal.email">
                        Correo Electrónico <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.email"
                            type="email"
                            placeholder="nombre@ejemplo.com"
                            aria-required
                            {...form.register("legal.email", { required: "Requerido", ...emailValidation })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.email]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.telefono">
                        Teléfono <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.telefono"
                            placeholder="Teléfono"
                            aria-required
                            {...form.register("legal.telefono", { required: "Requerido" })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.telefono]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.telefonoExt">Ext.</FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.telefonoExt"
                            placeholder="Ext."
                            {...form.register("legal.telefonoExt")}
                        />
                    </FieldContent>
                </Field>
            </FieldSet>

            {/* Contacto Legal */}
            <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
                <ParagraphH2 text="Contacto Legal" />
            </FieldGroup>
            <FieldSet className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.contactoLegalNombre">
                        Nombre <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.contactoLegalNombre"
                            placeholder="Nombre"
                            aria-required
                            {...form.register("legal.contactoLegalNombre", { required: "Requerido", ...moreThan4CharactersValidation, })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.contactoLegalNombre]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.contactoLegalApellidoPaterno">
                        Apellido Paterno <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.contactoLegalApellidoPaterno"
                            placeholder="Apellido Paterno"
                            aria-required
                            {...form.register("legal.contactoLegalApellidoPaterno", { required: "Requerido", ...moreThan4CharactersValidation, })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.contactoLegalApellidoPaterno]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.contactoLegalApellidoMaterno">
                        Apellido Materno <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.contactoLegalApellidoMaterno"
                            placeholder="Apellido Materno"
                            aria-required
                            {...form.register("legal.contactoLegalApellidoMaterno", { required: "Requerido", ...moreThan4CharactersValidation, })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.contactoLegalApellidoMaterno]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2 ">
                    <FieldLabel id="legal.horarioAtencionDias-label">
                        Horario de Atención - Días <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Controller
                            control={form.control}
                            name="legal.horarioAtencionDias"
                            rules={{
                                validate: (v) =>
                                    (v?.length ?? 0) > 0 || "Seleccione al menos un día",
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <WeekDaysButtonGroup
                                        id="legal.horarioAtencionDias"
                                        value={field.value ?? []}
                                        onValueChange={field.onChange}
                                        className="flex-wrap"
                                    />
                                    <FieldError errors={[fieldState.error]} />
                                </>
                            )}
                        />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.horarioAtencionInicio">
                        Inicio <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.horarioAtencionInicio"
                            type="time"
                            aria-required
                            {...form.register("legal.horarioAtencionInicio", { required: "Requerido" })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.horarioAtencionInicio]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="legal.horarioAtencionFin">
                        Fin <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.horarioAtencionFin"
                            type="time"
                            aria-required
                            {...form.register("legal.horarioAtencionFin", { required: "Requerido" })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.horarioAtencionFin]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2 ">
                    <FieldLabel htmlFor="legal.contactoLegalEmail">
                        Correo Electrónico <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <Input
                            id="legal.contactoLegalEmail"
                            type="email"
                            placeholder="nombre@ejemplo.com"
                            aria-required
                            {...form.register("legal.contactoLegalEmail", { required: "Requerido", ...emailValidation })}
                        />
                        <FieldError errors={[form.formState.errors.legal?.contactoLegalEmail]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel>
                        Teléfono <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Teléfono"
                                aria-required
                                className="flex-1"
                                {...form.register("legal.contactoLegalTelefono", { required: "Requerido" })}
                            />
                            <Input placeholder="Ext." className="w-20" {...form.register("legal.contactoLegalTelefonoExt")} />
                        </div>
                        <FieldError errors={[form.formState.errors.legal?.contactoLegalTelefono]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2 sm:col-span-3">
                    <FieldLabel>Teléfono Opcional</FieldLabel>
                    <FieldContent>
                        <div className="flex gap-2 max-w-md">
                            <Input
                                placeholder="Teléfono"
                                className="flex-1"
                                {...form.register("legal.contactoLegalTelefonoOpcional")}
                            />
                            <Input
                                placeholder="Ext."
                                className="w-20"
                                {...form.register("legal.contactoLegalTelefonoOpcionalExt")}
                            />
                        </div>
                    </FieldContent>
                </Field>
            </FieldSet>
        </div>
    );
}
