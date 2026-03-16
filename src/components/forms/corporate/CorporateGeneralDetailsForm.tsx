"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, PenOff, Save } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DropdownWithSearch } from "@/components/ui/dropdown-with-search";
import corporatesModelJson from "../../../../public/mockups/annex/getAllCorporatesModel.json" with { type: "json" };

const CORPORATE_MODEL_OPTIONS = (corporatesModelJson as { typeId: number; typeModel: string; }[]).map(
    (item) => ({ value: item.typeModel.trim(), label: item.typeModel.trim() })
);

export type CorporateGeneralDetailsFormValues = {
    rsa: string;
    logoIndex: string;
    logoTicket: string;
    status: "Activo" | "Inactivo";
    modeloCorporativo: string;
};

type CorporateGeneralDetailsFormProps = {
    defaultValues?: Partial<CorporateGeneralDetailsFormValues>;
};

export function CorporateGeneralDetailsForm({
    defaultValues,
}: CorporateGeneralDetailsFormProps) {
    const [disabledField, setDisabledField] = useState(true);
    const normalizedStatus = (defaultValues?.status?.toUpperCase() === "ACTIVO" ? "Activo" : "Inactivo") as "Activo" | "Inactivo";
    const { register, watch, setValue, formState: { errors } } = useForm<CorporateGeneralDetailsFormValues>({
        defaultValues: {
            rsa: defaultValues?.rsa ?? "",
            logoIndex: defaultValues?.logoIndex ?? "",
            logoTicket: defaultValues?.logoTicket ?? "",
            status: normalizedStatus,
            modeloCorporativo: defaultValues?.modeloCorporativo ?? "",
        },
    });
    const status = watch("status") ?? normalizedStatus;
    const modeloCorporativo = watch("modeloCorporativo") ?? defaultValues?.modeloCorporativo ?? "";

    const handleDisabledField = () => {
        setDisabledField(!disabledField);
    };

    return (
        <>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="rsa">RSA</FieldLabel>
                    <Input
                        id="rsa"
                        type="text"
                        placeholder="Ej. A000BMPY70"
                        aria-invalid={Boolean(errors.rsa)}
                        {...register("rsa")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.rsa ? [errors.rsa] : undefined} />
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="logoIndex">Logo de inicio</FieldLabel>
                    <Input
                        id="logoIndex"
                        type="text"
                        placeholder="Ej. splash1.png"
                        aria-invalid={Boolean(errors.logoIndex)}
                        {...register("logoIndex")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.logoIndex ? [errors.logoIndex] : undefined} />
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="logoTicket">Logo de ticket</FieldLabel>
                    <Input
                        id="logoTicket"
                        type="text"
                        placeholder="Ej. splash1.png"
                        aria-invalid={Boolean(errors.logoTicket)}
                        {...register("logoTicket")}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.logoTicket ? [errors.logoTicket] : undefined} />
                </Field>
            </FieldGroup >

            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {!disabledField && (
                    <>
                        <Field className="grid gap-2">
                            <FieldLabel>Estado</FieldLabel>
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={status === "Activo"}
                                    onCheckedChange={(checked) => setValue("status", checked ? "Activo" : "Inactivo")}
                                    disabled={disabledField}
                                    className="data-[state=checked]:bg-[var(--success-dark)] data-[state=unchecked]:bg-[var(--error-dark)]"
                                />
                                <span className="text-sm text-muted-foreground">
                                    {status === "Activo" ? "Activo" : "Inactivo"}
                                </span>
                            </div>
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="modelo-corporativo">Modelo corporativo</FieldLabel>
                            <DropdownWithSearch
                                id="modelo-corporativo"
                                options={CORPORATE_MODEL_OPTIONS}
                                value={modeloCorporativo}
                                onValueChange={(value) => setValue("modeloCorporativo", value)}
                                placeholder="Seleccione modelo"
                                disabled={disabledField}
                            />
                        </Field>
                    </>
                )}

            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="col-span-full flex justify-end gap-2">
                    {!disabledField && (
                        <Button onClick={handleDisabledField} className="bg-[var(--error-dark)] text-white hover:bg-[var(--error-dark)]/90">
                            <PenOff className="size-4" />
                            Cancelar
                        </Button>
                    )}
                    <Button
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

            </FieldGroup >

        </>
    );
}
