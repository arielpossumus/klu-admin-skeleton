"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Pencil, PenOff, Save } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import ParagraphH2 from "@/components/text/ParagraphH2";

const WEEKDAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] as const;

type ContactBlock = {
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

const defaultContactBlock: ContactBlock = {
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

export type CorporateContactFormValues = {
    contactData: {
        commercialContact: ContactBlock;
        technicalContact: ContactBlock;
        financialContact: ContactBlock;
    };
};

export type CorporateContactFormProps = {
    defaultValues?: Partial<CorporateContactFormValues>;
};

type ContactSectionKey = keyof CorporateContactFormValues["contactData"];

export function CorporateContactForm(props: CorporateContactFormProps) {
    const { defaultValues } = props;
    const [disabledField, setDisabledField] = useState(true);

    const resolvedDefaults = useMemo(() => {
        const cd = defaultValues?.contactData;
        return {
            contactData: {
                commercialContact: { ...defaultContactBlock, ...cd?.commercialContact, days: cd?.commercialContact?.days ?? [] },
                technicalContact: { ...defaultContactBlock, ...cd?.technicalContact, days: cd?.technicalContact?.days ?? [] },
                financialContact: { ...defaultContactBlock, ...cd?.financialContact, days: cd?.financialContact?.days ?? [] },
            },
        };
    }, [defaultValues?.contactData]);

    const { register, watch, setValue, formState: { errors } } = useForm<CorporateContactFormValues>({
        defaultValues: resolvedDefaults,
    });

    const handleToggleDay = (section: ContactSectionKey, day: string) => {
        const path = `contactData.${section}.days` as const;
        const current = (watch(path) ?? []) as string[];
        const next = current.includes(day) ? current.filter((d) => d !== day) : [...current, day];
        setValue(path, next);
    };

    const handleDisabledField = () => {
        setDisabledField(!disabledField);
    };

    const renderContactSection = (section: ContactSectionKey, title: string) => {
        const base = `contactData.${section}` as const;
        const days = (watch(`${base}.days`) ?? []) as string[];
        const err = (errors.contactData as Record<ContactSectionKey, Partial<Record<keyof ContactBlock, { message?: string; }>>> | undefined)?.[section];

        return (
            <>
                <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
                    <ParagraphH2 text={title} />
                </FieldGroup>
                <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Field className="grid gap-2 mb-4">
                        <FieldLabel htmlFor={`${section}-name`}>Nombre</FieldLabel>
                        <Input
                            id={`${section}-name`}
                            type="text"
                            placeholder="Nombre"
                            aria-invalid={Boolean(err?.name)}
                            {...register(`${base}.name`)}
                            disabled={disabledField}
                        />
                        <FieldError errors={err?.name ? [err.name] : undefined} />
                    </Field>
                    <Field className="grid gap-2 mb-4">
                        <FieldLabel htmlFor={`${section}-lastName`}>Apellido Paterno</FieldLabel>
                        <Input
                            id={`${section}-lastName`}
                            type="text"
                            placeholder="Apellido paterno"
                            aria-invalid={Boolean(err?.lastName)}
                            {...register(`${base}.lastName`)}
                            disabled={disabledField}
                        />
                        <FieldError errors={err?.lastName ? [err.lastName] : undefined} />
                    </Field>
                    <Field className="grid gap-2 mb-4">
                        <FieldLabel htmlFor={`${section}-maternalLastName`}>Apellido Materno</FieldLabel>
                        <Input
                            id={`${section}-maternalLastName`}
                            type="text"
                            placeholder="Apellido materno"
                            aria-invalid={Boolean(err?.maternalLastName)}
                            {...register(`${base}.maternalLastName`)}
                            disabled={disabledField}
                        />
                        <FieldError errors={err?.maternalLastName ? [err.maternalLastName] : undefined} />
                    </Field>
                    <Field className="grid gap-2 mb-4">
                        <FieldLabel htmlFor={`${section}-email`}>Correo electrónico</FieldLabel>
                        <Input
                            id={`${section}-email`}
                            type="email"
                            placeholder="Correo electrónico"
                            aria-invalid={Boolean(err?.email)}
                            {...register(`${base}.email`)}
                            disabled={disabledField}
                        />
                        <FieldError errors={err?.email ? [err.email] : undefined} />
                    </Field>
                    <Field className="grid gap-2 mb-4">
                        <FieldLabel htmlFor={`${section}-phone`}>Teléfono</FieldLabel>
                        <Input
                            id={`${section}-phone`}
                            type="text"
                            placeholder="Teléfono"
                            aria-invalid={Boolean(err?.phone)}
                            {...register(`${base}.phone`)}
                            disabled={disabledField}
                        />
                        <FieldError errors={err?.phone ? [err.phone] : undefined} />
                    </Field>
                    <Field className="grid gap-2 mb-4">
                        <FieldLabel htmlFor={`${section}-ext`}>Extensión</FieldLabel>
                        <Input
                            id={`${section}-ext`}
                            type="text"
                            placeholder="Ext."
                            aria-invalid={Boolean(err?.ext)}
                            {...register(`${base}.ext`)}
                            disabled={disabledField}
                        />
                        <FieldError errors={err?.ext ? [err.ext] : undefined} />
                    </Field>
                    <Field className="grid gap-2 mb-4">
                        <FieldLabel htmlFor={`${section}-phone2`}>Teléfono opcional</FieldLabel>
                        <Input
                            id={`${section}-phone2`}
                            type="text"
                            placeholder="Teléfono opcional"
                            aria-invalid={Boolean(err?.phone2)}
                            {...register(`${base}.phone2`)}
                            disabled={disabledField}
                        />
                        <FieldError errors={err?.phone2 ? [err.phone2] : undefined} />
                    </Field>
                    <Field className="grid gap-2 mb-4">
                        <FieldLabel htmlFor={`${section}-ext2`}>Ext. opcional</FieldLabel>
                        <Input
                            id={`${section}-ext2`}
                            type="text"
                            placeholder="Ext. opcional"
                            aria-invalid={Boolean(err?.ext2)}
                            {...register(`${base}.ext2`)}
                            disabled={disabledField}
                        />
                        <FieldError errors={err?.ext2 ? [err.ext2] : undefined} />
                    </Field>
                    <Field className="grid gap-2 md:col-span-3">
                        <FieldLabel>Días de atención</FieldLabel>
                        <ButtonGroup className="flex-wrap">
                            {WEEKDAYS.map((day) => {
                                const isSelected = days.includes(day);
                                return (
                                    <Button
                                        key={day}
                                        type="button"
                                        variant={isSelected ? "default" : "outline"}
                                        size="sm"
                                        disabled={disabledField}
                                        onClick={() => handleToggleDay(section, day)}
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
                        <FieldLabel htmlFor={`${section}-startHour`}>Hora de inicio</FieldLabel>
                        <Input
                            id={`${section}-startHour`}
                            type="time"
                            aria-invalid={Boolean(err?.startHour)}
                            {...register(`${base}.startHour`)}
                            disabled={disabledField}
                            className="h-9"
                        />
                        <FieldError errors={err?.startHour ? [err.startHour] : undefined} />
                    </Field>
                    <Field className="grid gap-2 mb-4">
                        <FieldLabel htmlFor={`${section}-endHour`}>Hora de fin</FieldLabel>
                        <Input
                            id={`${section}-endHour`}
                            type="time"
                            aria-invalid={Boolean(err?.endHour)}
                            {...register(`${base}.endHour`)}
                            disabled={disabledField}
                            className="h-9"
                        />
                        <FieldError errors={err?.endHour ? [err.endHour] : undefined} />
                    </Field>
                </FieldGroup>
            </>
        );
    };

    return (
        <>
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
            {renderContactSection("commercialContact", "Contacto comercial")}
            {renderContactSection("technicalContact", "Contacto técnico")}
            {renderContactSection("financialContact", "Contacto financiero")}

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
