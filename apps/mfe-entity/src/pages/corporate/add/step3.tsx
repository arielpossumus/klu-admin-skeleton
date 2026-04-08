import { Fragment, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { WeekDaysButtonGroup } from "@/components/commons/WeekDaysButtonGroup";
import { emailValidation } from "@/lib/validation";
import type { AddCorporateFormValues } from "@/types/corporate/addCorporate";
import ParagraphH2 from "@/components/text/ParagraphH2";

type ContactSectionKey = "comercial" | "soporte" | "finanzas";

const SECTIONS: { key: ContactSectionKey; title: string; labelInicio: string; labelFin: string; }[] = [
    { key: "comercial", title: "Comercial", labelInicio: "De", labelFin: "A" },
    { key: "soporte", title: "Soporte", labelInicio: "De", labelFin: "A" },
    { key: "finanzas", title: "Finanzas", labelInicio: "De", labelFin: "A" },
];

export function Step3() {
    const form = useFormContext<AddCorporateFormValues>();
    const [completarSoporte, setCompletarSoporte] = useState(false);
    const [completarFinanzas, setCompletarFinanzas] = useState(false);

    const handleUsarDatosLegal = () => {
        const legal = form.getValues("legal");
        if (!legal) return;
        form.setValue("contacts.comercial", {
            nombre: legal.contactoLegalNombre ?? "",
            apellidoPaterno: legal.contactoLegalApellidoPaterno ?? "",
            apellidoMaterno: legal.contactoLegalApellidoMaterno ?? "",
            dias: legal.horarioAtencionDias ?? [],
            inicio: legal.horarioAtencionInicio ?? "",
            fin: legal.horarioAtencionFin ?? "",
            email: legal.contactoLegalEmail ?? "",
            telefono: legal.contactoLegalTelefono ?? "",
            telefonoExt: legal.contactoLegalTelefonoExt ?? "",
            telefonoOpcional: legal.contactoLegalTelefonoOpcional ?? "",
            telefonoOpcionalExt: legal.contactoLegalTelefonoOpcionalExt ?? "",
        });
    };

    const handleCompletar = () => {
        const comercial = form.getValues("contacts.comercial");
        if (!comercial) return;
        if (completarSoporte) form.setValue("contacts.soporte", { ...comercial });
        if (completarFinanzas) form.setValue("contacts.finanzas", { ...comercial });
    };

    return (
        <div className="flex flex-col gap-8">
            {SECTIONS.map(({ key, title, labelInicio, labelFin }) => (
                <Fragment key={key}>
                    <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
                        <ParagraphH2 text={title} />
                    </FieldGroup>

                    {key === "comercial" && (
                        <div className="flex flex-col gap-3 rounded-md border border-border/60 bg-muted/30 p-4 mb-4">
                            <span className="text-sm font-medium text-foreground">
                                Completar comercial con datos de contacto Legal
                            </span>
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={handleUsarDatosLegal}
                                className="w-fit"
                            >
                                Completar
                            </Button>
                        </div>
                    )}

                    <FieldSet className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor={`contacts.${key}.nombre`}>
                                Nombre <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id={`contacts.${key}.nombre`}
                                    placeholder="Nombre"
                                    aria-required
                                    {...form.register(`contacts.${key}.nombre`, { required: "Requerido" })}
                                />
                                <FieldError errors={[form.formState.errors.contacts?.[key]?.nombre]} />
                            </FieldContent>
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor={`contacts.${key}.apellidoPaterno`}>
                                Apellido Paterno <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id={`contacts.${key}.apellidoPaterno`}
                                    placeholder="Apellido Paterno"
                                    aria-required
                                    {...form.register(`contacts.${key}.apellidoPaterno`, { required: "Requerido" })}
                                />
                                <FieldError errors={[form.formState.errors.contacts?.[key]?.apellidoPaterno]} />
                            </FieldContent>
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor={`contacts.${key}.apellidoMaterno`}>
                                Apellido Materno <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id={`contacts.${key}.apellidoMaterno`}
                                    placeholder="Apellido Materno"
                                    aria-required
                                    {...form.register(`contacts.${key}.apellidoMaterno`, { required: "Requerido" })}
                                />
                                <FieldError errors={[form.formState.errors.contacts?.[key]?.apellidoMaterno]} />
                            </FieldContent>
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel id={`contacts.${key}.dias-label`}>
                                Horario de Atención - Días <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <Controller
                                    control={form.control}
                                    name={`contacts.${key}.dias`}
                                    rules={{
                                        validate: (v) =>
                                            (v?.length ?? 0) > 0 || "Seleccione al menos un día",
                                    }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <WeekDaysButtonGroup
                                                id={`contacts.${key}.dias`}
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
                            <FieldLabel htmlFor={`contacts.${key}.inicio`}>
                                {labelInicio} <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id={`contacts.${key}.inicio`}
                                    type="time"
                                    aria-required
                                    {...form.register(`contacts.${key}.inicio`, { required: "Requerido" })}
                                />
                                <FieldError errors={[form.formState.errors.contacts?.[key]?.inicio]} />
                            </FieldContent>
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor={`contacts.${key}.fin`}>
                                {labelFin} <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id={`contacts.${key}.fin`}
                                    type="time"
                                    aria-required
                                    {...form.register(`contacts.${key}.fin`, { required: "Requerido" })}
                                />
                                <FieldError errors={[form.formState.errors.contacts?.[key]?.fin]} />
                            </FieldContent>
                        </Field>

                        <Field className="grid gap-2 sm:col-span-2">
                            <FieldLabel htmlFor={`contacts.${key}.email`}>
                                Correo Electrónico <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id={`contacts.${key}.email`}
                                    type="email"
                                    placeholder="nombre@ejemplo.com"
                                    aria-required
                                    {...form.register(`contacts.${key}.email`, { required: "Requerido", ...emailValidation })}
                                />
                                <FieldError errors={[form.formState.errors.contacts?.[key]?.email]} />
                            </FieldContent>
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor={`contacts.${key}.telefono`}>
                                Teléfono <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id={`contacts.${key}.telefono`}
                                    placeholder="Teléfono"
                                    aria-required
                                    {...form.register(`contacts.${key}.telefono`, { required: "Requerido" })}
                                />
                                <FieldError errors={[form.formState.errors.contacts?.[key]?.telefono]} />
                            </FieldContent>
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor={`contacts.${key}.telefonoExt`}>Ext.</FieldLabel>
                            <FieldContent>
                                <Input
                                    id={`contacts.${key}.telefonoExt`}
                                    placeholder="Ext."
                                    {...form.register(`contacts.${key}.telefonoExt`)}
                                />
                            </FieldContent>
                        </Field>

                        <Field className="grid gap-2">
                            <FieldLabel htmlFor={`contacts.${key}.telefonoOpcional`}>Teléfono Opcional</FieldLabel>
                            <FieldContent>
                                <Input
                                    id={`contacts.${key}.telefonoOpcional`}
                                    placeholder="Teléfono"
                                    {...form.register(`contacts.${key}.telefonoOpcional`)}
                                />
                            </FieldContent>
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor={`contacts.${key}.telefonoOpcionalExt`}>Ext.</FieldLabel>
                            <FieldContent>
                                <Input
                                    id={`contacts.${key}.telefonoOpcionalExt`}
                                    placeholder="Ext."
                                    {...form.register(`contacts.${key}.telefonoOpcionalExt`)}
                                />
                            </FieldContent>
                        </Field>
                    </FieldSet>

                    {key === "comercial" && (
                        <div className="flex flex-col gap-3 rounded-md border border-border/60 bg-muted/30 p-4">
                            <span className="text-sm font-medium text-foreground">
                                Completar con los datos del contacto legal
                            </span>
                            <div className="flex flex-wrap items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={completarSoporte}
                                        onChange={(e) => setCompletarSoporte(e.target.checked)}
                                        className="size-4 rounded border-input accent-primary"
                                        aria-label="Completar Soporte con datos de Comercial"
                                    />
                                    <span className="text-sm">Soporte</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={completarFinanzas}
                                        onChange={(e) => setCompletarFinanzas(e.target.checked)}
                                        className="size-4 rounded border-input accent-primary"
                                        aria-label="Completar Finanzas con datos de Comercial"
                                    />
                                    <span className="text-sm">Finanzas</span>
                                </label>
                            </div>
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={handleCompletar}
                                disabled={!completarSoporte && !completarFinanzas}
                                className="w-fit"
                            >
                                Completar
                            </Button>
                        </div>
                    )}
                </Fragment>
            ))}
        </div>
    );
}
