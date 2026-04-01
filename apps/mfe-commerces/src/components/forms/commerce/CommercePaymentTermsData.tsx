"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import { CustomFormButtons } from "@/components/commons/CustomFormButtons";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { DropdownWithSearch } from "@/components/ui/dropdown-with-search";
import { getAllPaymentTerms } from "@/services/annex/paymentServices";
import type { CommercePaymentTerms } from "@/types/commerce/CommerceList";

export type PaymentsTermsDataProps = {
    paymentsTermsData?: CommercePaymentTerms;
};

type PaymentTermsFormValues = {
    nationalDeadline: string;
    internationalDeadline: string;
    amexDeadline: string;
};

const fromPaymentTerms = (p?: CommercePaymentTerms): PaymentTermsFormValues => ({
    nationalDeadline:
        p?.nationalDeadline != null && Number.isFinite(p.nationalDeadline)
            ? String(p.nationalDeadline)
            : "",
    internationalDeadline:
        p?.internationalDeadline != null && Number.isFinite(p.internationalDeadline)
            ? String(p.internationalDeadline)
            : "",
    amexDeadline:
        p?.amexDeadline != null && Number.isFinite(p.amexDeadline)
            ? String(p.amexDeadline)
            : "",
});

const toPaymentTerms = (v: PaymentTermsFormValues): CommercePaymentTerms => ({
    nationalDeadline: v.nationalDeadline ? Number(v.nationalDeadline) : undefined,
    internationalDeadline: v.internationalDeadline ? Number(v.internationalDeadline) : undefined,
    amexDeadline: v.amexDeadline ? Number(v.amexDeadline) : undefined,
});

export default function PaymentsTermsData({
    paymentsTermsData,
}: PaymentsTermsDataProps) {
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [savedTerms, setSavedTerms] = useState<CommercePaymentTerms | undefined>(
        paymentsTermsData
    );

    useEffect(() => {
        setSavedTerms(paymentsTermsData);
    }, [paymentsTermsData]);

    const defaults = useMemo(() => fromPaymentTerms(savedTerms), [savedTerms]);

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<PaymentTermsFormValues>({
        defaultValues: defaults,
    });

    useEffect(() => {
        reset(defaults);
    }, [defaults, reset]);

    const { data: termOptions = [], isPending: isTermsPending } = useQuery({
        queryKey: ["annex", "payment-terms"],
        queryFn: getAllPaymentTerms,
        staleTime: 60_000,
    });

    const handleToggle = useCallback(() => {
        setIsReadOnly((prev) => {
            if (!prev) {
                reset(defaults);
            }
            return !prev;
        });
    }, [defaults, reset]);

    const onSubmit = useCallback(
        (values: PaymentTermsFormValues) => {
            setSavedTerms(toPaymentTerms(values));
            setIsReadOnly(true);
        },
        []
    );

    return (
        <section
            className="space-y-6"
            aria-label="Plazos de pago del comercio"
        >
            <h3 className="text-sm font-semibold text-foreground">Plazos de pago</h3>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
                aria-label="Edición de plazos de pago"
            >


                <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Field className="grid gap-2">
                        <FieldLabel htmlFor="payment-term-national">Plazo nacional</FieldLabel>
                        <Controller
                            name="nationalDeadline"
                            control={control}
                            rules={{ required: "Seleccione un plazo" }}
                            render={({ field, fieldState }) => (
                                <DropdownWithSearch
                                    id="payment-term-national"
                                    options={termOptions}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Seleccione un Plazo"
                                    disabled={isReadOnly || isTermsPending}
                                    emptyLabel={isTermsPending ? "Cargando…" : "Sin resultados"}
                                    className={fieldState.invalid ? "border-destructive" : undefined}
                                />
                            )}
                        />
                        <FieldError
                            errors={errors.nationalDeadline ? [errors.nationalDeadline] : undefined}
                        />
                    </Field>

                    <Field className="grid gap-2">
                        <FieldLabel htmlFor="payment-term-international">
                            Plazo internacional
                        </FieldLabel>
                        <Controller
                            name="internationalDeadline"
                            control={control}
                            rules={{ required: "Seleccione un plazo" }}
                            render={({ field, fieldState }) => (
                                <DropdownWithSearch
                                    id="payment-term-international"
                                    options={termOptions}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Seleccione un Plazo"
                                    disabled={isReadOnly || isTermsPending}
                                    emptyLabel={isTermsPending ? "Cargando…" : "Sin resultados"}
                                    className={fieldState.invalid ? "border-destructive" : undefined}
                                />
                            )}
                        />
                        <FieldError
                            errors={
                                errors.internationalDeadline ? [errors.internationalDeadline] : undefined
                            }
                        />
                    </Field>

                    <Field className="grid gap-2">
                        <FieldLabel htmlFor="payment-term-amex">Plazo Amex</FieldLabel>
                        <Controller
                            name="amexDeadline"
                            control={control}
                            rules={{ required: "Seleccione un plazo" }}
                            render={({ field, fieldState }) => (
                                <DropdownWithSearch
                                    id="payment-term-amex"
                                    options={termOptions}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Seleccione un Plazo"
                                    disabled={isReadOnly || isTermsPending}
                                    emptyLabel={isTermsPending ? "Cargando…" : "Sin resultados"}
                                    className={fieldState.invalid ? "border-destructive" : undefined}
                                />
                            )}
                        />
                        <FieldError
                            errors={errors.amexDeadline ? [errors.amexDeadline] : undefined}
                        />
                    </Field>
                </FieldGroup>
                <CustomFormButtons isReadOnly={isReadOnly} onToggle={handleToggle} />
            </form>
        </section>
    );
}
