"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, PenOff, Save } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";


export type CorporateGeneralDetailsFormValues = {
    rsa: string;
    logoIndex: string;
    logoTicket: string;
    status: "Activo" | "Inactivo";
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
        },
    });
    const status = watch("status") ?? normalizedStatus;

    const handleDisabledField = () => {
        setDisabledField(!disabledField);
    };

    return (
        <>
            <FieldGroup className="contents">
                {!disabledField && (
                    <Field className="grid gap-2">
                        <FieldLabel>Estado</FieldLabel>
                        <ButtonGroup>
                            {(["Activo", "Inactivo"] as const).map((opt) => (
                                <Button
                                    key={opt}
                                    type="button"
                                    variant={status === opt ? "default" : "outline"}
                                    size="sm"
                                    disabled={disabledField}
                                    onClick={() => setValue("status", opt)}
                                    className={
                                        status === opt
                                            ? opt === "Activo"
                                                ? "bg-[var(--success-dark)] text-white hover:bg-[var(--success-dark)]/90"
                                                : "bg-[var(--error-dark)] text-white hover:bg-[var(--error-dark)]/90"
                                            : "bg-[var(--background)] text-foreground"
                                    }
                                >
                                    {opt}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Field>
                )}
            </FieldGroup>
            <FieldGroup className="contents">

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
                    <FieldError errors={errors.logoIndex ? [errors.logoIndex] : undefined} />
                </Field>
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
