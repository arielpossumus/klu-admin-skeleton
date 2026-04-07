"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import { CustomFormButtons } from "@/components/commons/CustomFormButtons";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DropdownWithSearch } from "@/components/ui/dropdown-with-search";
import { getAllBanks, type BankOption } from "@/services/annex/getAllBanksService";
import type { CommerceAccountData } from "@/types/commerce/CommerceList";
import ParagraphH2 from "@/components/text/ParagraphH2";

export type CommerceDepositDataProps = {
    accountData?: CommerceAccountData;
};

type CommerceDepositFormValues = {
    bankName: string;
    bankCode: string;
    OwnerName: string;
    OwnerLastName: string;
    OwnerMaternalLastName: string;
};

const buildDefaults = (a?: CommerceAccountData): CommerceDepositFormValues => ({
    bankName: "",
    bankCode: a?.bankCode ?? "",
    OwnerName: a?.OwnerName ?? "",
    OwnerLastName: a?.OwnerLastName ?? "",
    OwnerMaternalLastName: a?.OwnerMaternalLastName ?? "",
});

const resolveBankValue = (
    storedBankName: string | undefined,
    options: BankOption[]
): string => {
    const t = (storedBankName ?? "").trim();
    if (!t) return "";
    const byLabel = options.find(
        (o) => o.label.toLowerCase() === t.toLowerCase()
    );
    if (byLabel) return byLabel.value;
    const byValue = options.find((o) => o.value === t);
    return byValue?.value ?? "";
};

export const CommerceDepositData = ({ accountData }: CommerceDepositDataProps) => {
    const [isReadOnly, setIsReadOnly] = useState(true);

    const { data: bankOptions = [], isPending: isBanksPending } = useQuery({
        queryKey: ["annex", "banks"],
        queryFn: getAllBanks,
        staleTime: 60_000,
    });

    const defaults = useMemo(() => {
        const base = buildDefaults(accountData);
        return {
            ...base,
            bankName: resolveBankValue(accountData?.bankName, bankOptions),
        };
    }, [accountData, bankOptions]);

    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<CommerceDepositFormValues>({
        defaultValues: defaults,
    });

    useEffect(() => {
        reset(defaults);
    }, [defaults, reset]);

    const handleToggle = useCallback(() => {
        setIsReadOnly((prev) => {
            if (!prev) {
                reset(defaults);
            }
            return !prev;
        });
    }, [defaults, reset]);

    const onSubmit = useCallback(() => {
        setIsReadOnly(true);
    }, []);

    return (
        <section className="space-y-6" aria-label="Datos de cuenta para depósito">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <FieldGroup className="grid grid-cols-1 gap-4 px-0">
                    <ParagraphH2 text="Datos de depósito" />
                </FieldGroup>
                <FieldGroup className="mb-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <Field className="grid gap-2">
                        <FieldLabel htmlFor="deposit-bank-name">
                            Banco<span className="text-destructive">*</span>
                        </FieldLabel>
                        <Controller
                            name="bankName"
                            control={control}
                            rules={{ required: "El banco es obligatorio" }}
                            render={({ field, fieldState }) => (
                                <DropdownWithSearch
                                    id="deposit-bank-name"
                                    options={bankOptions}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Seleccione un banco"
                                    disabled={isReadOnly || isBanksPending}
                                    emptyLabel={isBanksPending ? "Cargando…" : "Sin resultados"}
                                    className={fieldState.invalid ? "border-destructive" : undefined}
                                />
                            )}
                        />
                        <FieldError errors={errors.bankName ? [errors.bankName] : undefined} />
                    </Field>

                    <Field className="grid gap-2">
                        <FieldLabel htmlFor="deposit-bank-code">
                            Código de banco<span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                            id="deposit-bank-code"
                            type="text"
                            placeholder="Código"
                            aria-invalid={Boolean(errors.bankCode)}
                            aria-required
                            disabled={isReadOnly}
                            {...register("bankCode", {
                                required: "El código de banco es obligatorio",
                            })}
                        />
                        <FieldError errors={errors.bankCode ? [errors.bankCode] : undefined} />
                    </Field>
                </FieldGroup>
                <FieldGroup className=" grid grid-cols-1 gap-4 px-0">
                    <ParagraphH2 text="Titular de la cuenta" />
                </FieldGroup>
                <FieldGroup className="mb-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <Field className="grid gap-2">
                        <FieldLabel htmlFor="deposit-owner-name">
                            Nombre titular<span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                            id="deposit-owner-name"
                            type="text"
                            placeholder="Nombre"
                            aria-invalid={Boolean(errors.OwnerName)}
                            aria-required
                            disabled={isReadOnly}
                            {...register("OwnerName", {
                                required: "El nombre del titular es obligatorio",
                            })}
                        />
                        <FieldError errors={errors.OwnerName ? [errors.OwnerName] : undefined} />
                    </Field>

                    <Field className="grid gap-2">
                        <FieldLabel htmlFor="deposit-owner-last">Apellido paterno</FieldLabel>
                        <Input
                            id="deposit-owner-last"
                            type="text"
                            placeholder="Apellido paterno"
                            aria-invalid={Boolean(errors.OwnerLastName)}
                            disabled={isReadOnly}
                            {...register("OwnerLastName")}
                        />
                        <FieldError
                            errors={errors.OwnerLastName ? [errors.OwnerLastName] : undefined}
                        />
                    </Field>

                    <Field className="grid gap-2">
                        <FieldLabel htmlFor="deposit-owner-maternal">Apellido materno</FieldLabel>
                        <Input
                            id="deposit-owner-maternal"
                            type="text"
                            placeholder="Apellido materno"
                            aria-invalid={Boolean(errors.OwnerMaternalLastName)}
                            disabled={isReadOnly}
                            {...register("OwnerMaternalLastName")}
                        />
                        <FieldError
                            errors={
                                errors.OwnerMaternalLastName ? [errors.OwnerMaternalLastName] : undefined
                            }
                        />
                    </Field>
                </FieldGroup>

                <CustomFormButtons isReadOnly={isReadOnly} onToggle={handleToggle} />
            </form>
        </section>
    );
};
