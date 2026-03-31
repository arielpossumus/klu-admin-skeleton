"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { CirclePlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { CustomFormButtons } from "@/components/commons/CustomFormButtons";
import { createCommerceTradeRatesColumns } from "@/components/tables/commerces/commerceTradeRatesColumns";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DataTable } from "@/components/ui/data-table";
import type { CommerceTradeRateRow } from "@/types/commerce/CommerceList";

export type CommercesRatesDataProps = {
    ratesData?: CommerceTradeRateRow[];
};

type LocalRateRow = CommerceTradeRateRow & { _localId: string; };

type NewRateFormValues = {
    rateName: string;
    ratePercentage: string;
    ivaIncluded: boolean;
    chargeType: string;
    channelType: string;
};

const emptyForm: NewRateFormValues = {
    rateName: "",
    ratePercentage: "",
    ivaIncluded: false,
    chargeType: "",
    channelType: "",
};

const rowToFormValues = (r: LocalRateRow): NewRateFormValues => {
    const iva =
        typeof r.ivaIncluded === "boolean"
            ? r.ivaIncluded
            : /^s[ií]$/i.test((r.ivaIncluido ?? "").trim());
    return {
        rateName: (r.rateName ?? r.nombreTasa ?? "").trim(),
        ratePercentage: (r.ratePercentage ?? r.porcentajeTasa ?? "").trim(),
        ivaIncluded: iva,
        chargeType: (r.chargeType ?? r.tipoCobro ?? "").trim(),
        channelType: (r.channelType ?? r.tipoCanal ?? "").trim(),
    };
};

const mapToLocalRows = (data?: CommerceTradeRateRow[]): LocalRateRow[] =>
    (data ?? []).map((r, i) => ({
        ...r,
        _localId: `seed-${i}-${r.rateName ?? r.nombreTasa ?? ""}`,
    }));

export function CommercesRatesData({ ratesData }: CommercesRatesDataProps) {
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [editingLocalId, setEditingLocalId] = useState<string | null>(null);
    const [rows, setRows] = useState<LocalRateRow[]>(() =>
        mapToLocalRows(ratesData)
    );

    useEffect(() => {
        setRows(mapToLocalRows(ratesData));
    }, [ratesData]);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NewRateFormValues>({
        defaultValues: emptyForm,
    });

    const handleEditRow = useCallback(
        (row: CommerceTradeRateRow) => {
            const local = row as LocalRateRow;
            setEditingLocalId(local._localId);
            reset(rowToFormValues(local));
            setIsReadOnly(false);
        },
        [reset]
    );

    const handleDeleteRow = useCallback(
        (row: CommerceTradeRateRow) => {
            const local = row as LocalRateRow;
            const wasEditingThis = editingLocalId === local._localId;
            setRows((prev) => prev.filter((r) => r._localId !== local._localId));
            if (wasEditingThis) {
                setEditingLocalId(null);
                reset(emptyForm);
                setIsReadOnly(true);
            }
        },
        [editingLocalId, reset]
    );

    const rateColumns = useMemo(
        () =>
            createCommerceTradeRatesColumns({
                onEditRow: handleEditRow,
                onDeleteRow: handleDeleteRow,
            }) as ColumnDef<LocalRateRow, unknown>[],
        [handleEditRow, handleDeleteRow]
    );

    const onSubmit = useCallback(
        (values: NewRateFormValues) => {
            const payload: Omit<LocalRateRow, "_localId"> = {
                rateName: values.rateName.trim(),
                ratePercentage: values.ratePercentage.trim(),
                ivaIncluded: values.ivaIncluded,
                chargeType: values.chargeType.trim(),
                channelType: values.channelType.trim(),
            };

            if (editingLocalId) {
                setRows((prev) =>
                    prev.map((r) =>
                        r._localId === editingLocalId
                            ? { ...payload, _localId: r._localId }
                            : r
                    )
                );
            } else {
                setRows((prev) => [
                    ...prev,
                    { ...payload, _localId: crypto.randomUUID() },
                ]);
            }

            setEditingLocalId(null);
            reset(emptyForm);
            setIsReadOnly(true);
        },
        [editingLocalId, reset]
    );

    const handleToggle = useCallback(() => {
        setIsReadOnly((prev) => !prev);
        reset(emptyForm);
        setEditingLocalId(null);
    }, [reset]);

    return (
        <section
            className="space-y-6"
            aria-label={
                rows.length ? "Tasas del comercio" : "Sin tasas registradas"
            }
        >
            <h3 className="text-sm font-semibold text-foreground">Tasas</h3>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
                aria-label="Alta o edición de tasa"
            >
                <CustomFormButtons
                    isReadOnly={isReadOnly}
                    onToggle={handleToggle}
                    actionName="Agregar"
                    readOnlyIcon={CirclePlus}
                />

                {!isReadOnly && (
                    <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 mb-12">
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="new-rate-name">
                                Nombre Tasa<span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                id="new-rate-name"
                                placeholder="Nombre de la tasa"
                                aria-invalid={Boolean(errors.rateName)}
                                {...register("rateName", {
                                    required: "El nombre de tasa es obligatorio",
                                })}
                            />
                            <FieldError
                                errors={errors.rateName ? [errors.rateName] : undefined}
                            />
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="new-rate-pct">Porcentaje Tasa</FieldLabel>
                            <Input
                                id="new-rate-pct"
                                placeholder="Ej. 2.26 %"
                                {...register("ratePercentage")}
                            />
                        </Field>
                        <Field className="grid gap-2 md:col-span-2 lg:col-span-1">
                            <FieldLabel htmlFor="new-rate-iva">Iva incluido</FieldLabel>
                            <div className="flex h-9 items-center gap-2">
                                <Controller
                                    name="ivaIncluded"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <Switch
                                                id="new-rate-iva"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                aria-label="IVA incluido"
                                                className="data-[state=checked]:bg-[var(--success-dark)]"
                                            />
                                            <span className="text-sm text-muted-foreground">
                                                {field.value ? "Sí" : "No"}
                                            </span>
                                        </>
                                    )}
                                />
                            </div>
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="new-rate-charge">Tipo Cobro</FieldLabel>
                            <Input
                                id="new-rate-charge"
                                placeholder="Tipo de cobro"
                                {...register("chargeType")}
                            />
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="new-rate-channel">Tipo Canal</FieldLabel>
                            <Input
                                id="new-rate-channel"
                                placeholder="Tipo de canal"
                                {...register("channelType")}
                            />
                        </Field>
                    </FieldGroup>
                )}
            </form>

            <DataTable<LocalRateRow, unknown>
                columns={rateColumns}
                data={rows}
                pagination={false}
                getRowId={(row) => row._localId}
            />
        </section>
    );
}
