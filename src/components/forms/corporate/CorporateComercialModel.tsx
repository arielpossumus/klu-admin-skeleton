"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, PenOff, Save } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DropdownWithSearch } from "@/components/ui/dropdown-with-search";
import { DataTable } from "@/components/ui/data-table";
import adquisitionBanksJson from "../../../../public/mockups/annex/getAllAdquisitionBanks.json" with { type: "json" };
import type { ModelCommercialTransaction } from "@/types/corporate/Corporate";

type AdquisitionBankItem = { id: number; name: string };
const ADQUISITION_BANKS = adquisitionBanksJson as AdquisitionBankItem[];
const ADQUISITION_BANK_OPTIONS = ADQUISITION_BANKS.map((b) => ({
    value: b.name,
    label: b.name,
}));

export type CorporateComercialModelFormValues = {
    adquisition: boolean;
    adquisitionBank: string;
    channels: string;
    monthlyRent: number;
    cancelationDay: number;
};

export type CorporateComercialModelProps = {
    defaultValues?: Omit<Partial<CorporateComercialModelFormValues>, "channels"> & {
        channels?: string[] | string;
        transactions?: ModelCommercialTransaction[];
    };
};

const transactionColumns: ColumnDef<ModelCommercialTransaction>[] = [
    {
        accessorKey: "transactionRange",
        header: "Número de transacciones",
    },
    {
        accessorKey: "costPerTransaction",
        header: "Costo por transacción",
        cell: ({ row }) => {
            const v = row.getValue<number>("costPerTransaction");
            return v != null ? v.toFixed(6) : "—";
        },
    },
    {
        accessorKey: "iva",
        header: "IVA",
    },
    {
        accessorKey: "total",
        header: "TOTAL",
        cell: ({ row }) => {
            const v = row.getValue<number>("total");
            return v != null ? v.toFixed(6) : "—";
        },
    },
];

export function CorporateComercialModel(props: CorporateComercialModelProps) {
    const { defaultValues } = props;
    const [disabledField, setDisabledField] = useState(true);

    const initialChannels = useMemo(
        () => (defaultValues?.channels != null
            ? (Array.isArray(defaultValues.channels)
                ? (defaultValues.channels as string[]).join("\n")
                : String(defaultValues.channels))
            : ""),
        [defaultValues?.channels]
    );

    const { register, watch, setValue, formState: { errors } } = useForm<CorporateComercialModelFormValues>({
        defaultValues: {
            adquisition: defaultValues?.adquisition ?? false,
            adquisitionBank: defaultValues?.adquisitionBank ?? "",
            channels: initialChannels,
            monthlyRent: defaultValues?.monthlyRent ?? 0,
            cancelationDay: defaultValues?.cancelationDay ?? 0,
        },
    });

    const adquisition = watch("adquisition");
    const adquisitionBank = watch("adquisitionBank");
    const transactions = defaultValues?.transactions ?? [];

    const handleDisabledField = () => {
        setDisabledField(!disabledField);
    };

    return (
        <>
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Field className="grid gap-2">
                    <FieldLabel>Adquisición</FieldLabel>
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={adquisition}
                            onCheckedChange={(checked) => setValue("adquisition", checked)}
                            disabled={disabledField}
                            className="data-[state=checked]:bg-[var(--success-dark)] data-[state=unchecked]:bg-[var(--error-dark)]"
                        />
                        <span className="text-sm text-muted-foreground">
                            {adquisition ? "Sí" : "No"}
                        </span>
                    </div>
                </Field>
                <Field className="grid gap-2 min-w-0">
                    <FieldLabel htmlFor="adquisitionBank">Banco de adquisición</FieldLabel>
                    <DropdownWithSearch
                        id="adquisitionBank"
                        options={ADQUISITION_BANK_OPTIONS}
                        value={adquisitionBank}
                        onValueChange={(value) => setValue("adquisitionBank", value)}
                        placeholder="Seleccione banco"
                        disabled={disabledField}
                        className="min-w-0 w-full"
                    />
                </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 gap-4 mb-4">
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="channels">Canales</FieldLabel>
                    <textarea
                        id="channels"
                        rows={5}
                        placeholder="Un canal por línea"
                        aria-invalid={Boolean(errors.channels)}
                        disabled={disabledField}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive"
                        {...register("channels")}
                    />
                    <FieldError errors={errors.channels ? [errors.channels] : undefined} />
                </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="monthlyRent">Renta mensual</FieldLabel>
                    <Input
                        id="monthlyRent"
                        type="number"
                        min={0}
                        step={1}
                        aria-invalid={Boolean(errors.monthlyRent)}
                        {...register("monthlyRent", { valueAsNumber: true })}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.monthlyRent ? [errors.monthlyRent] : undefined} />
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="cancelationDay">Día de cancelación</FieldLabel>
                    <Input
                        id="cancelationDay"
                        type="number"
                        min={1}
                        max={31}
                        aria-invalid={Boolean(errors.cancelationDay)}
                        {...register("cancelationDay", { valueAsNumber: true })}
                        disabled={disabledField}
                    />
                    <FieldError errors={errors.cancelationDay ? [errors.cancelationDay] : undefined} />
                </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 gap-4 mb-4">
                <FieldLabel>Transacciones</FieldLabel>
                <DataTable
                    columns={transactionColumns}
                    data={transactions}
                    getRowId={(row) => row.transactionRange}
                />
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 gap-4">
                <div className="flex justify-end gap-2">
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
