"use client";

import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import type { ColumnDef } from "@tanstack/react-table";
import { CircleMinus, CirclePlus } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DropdownWithSearch } from "@/components/ui/dropdown-with-search";
import { DataTable } from "@/components/ui/data-table";
import { CustomFormButtons } from "@/components/forms/CustomFormButtons";
import adquisitionBanksJson from "../../../../../public/mockups/annex/getAllAdquisitionBanks.json" with { type: "json" };
import getAllChannelsJson from "../../../../../public/mockups/annex/getAllChannels.json" with { type: "json" };
import type { ModelCommercialTransaction } from "@/types/corporate/Corporate";
import ParagraphH2 from "@/components/text/ParagraphH2";
import { transactionLiteColumns } from "@/components/tables/corporate/transactionsLiteColumns";
type AdquisitionBankItem = { id: number; name: string; };
const ADQUISITION_BANKS = adquisitionBanksJson as AdquisitionBankItem[];
const ADQUISITION_BANK_OPTIONS = ADQUISITION_BANKS.map((b) => ({
    value: b.name,
    label: b.name,
}));

type ChannelItem = { id: number; name: string; };
const CHANNELS_LIST = getAllChannelsJson as ChannelItem[];
const CHANNEL_OPTIONS = CHANNELS_LIST.map((c) => ({
    value: c.name,
    label: c.name,
}));

export type CorporateComercialModelFormValues = {
    adquisition: boolean;
    adquisitionBank: string;
    channels: string[];
    monthlyRent: number;
    cancelationDay: number;
};

export type CorporateComercialModelProps = {
    defaultValues?: Omit<Partial<CorporateComercialModelFormValues>, "channels"> & {
        channels?: string[] | string;
        transactions?: ModelCommercialTransaction[];
    };
};



export function CorporateComercialModel(props: CorporateComercialModelProps) {
    const { defaultValues } = props;
    const [disabledField, setDisabledField] = useState(true);

    const initialChannels = useMemo(
        () => {
            if (defaultValues?.channels == null) return [];
            if (Array.isArray(defaultValues.channels)) return defaultValues.channels as string[];
            return String(defaultValues.channels)
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean);
        },
        [defaultValues?.channels]
    );

    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<CorporateComercialModelFormValues>({
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
    const channels = watch("channels");
    const transactions = useMemo(() => defaultValues?.transactions ?? [], [defaultValues?.transactions]);

    const channelsTableData = useMemo(
        () => channels.map((name, id) => ({ id, name })),
        [channels]
    );

    const handleRemoveChannel = useCallback(
        (index: number) => {
            setValue(
                "channels",
                channels.filter((_, i) => i !== index),
                { shouldDirty: true }
            );
        },
        [channels, setValue]
    );

    const channelsColumns: ColumnDef<{ id: number; name: string; }>[] = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Nombre del canal",
            },
            {
                id: "action",
                header: "Acción",
                cell: ({ row }) => (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={disabledField}
                        onClick={() => handleRemoveChannel(row.original.id)}
                        aria-label="Quitar canal"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                        <CircleMinus className="size-4" aria-hidden />
                    </Button>
                ),
            },
        ],
        [disabledField, handleRemoveChannel]
    );

    const [selectedChannelToAdd, setSelectedChannelToAdd] = useState("");

    const handleDisabledField = useCallback(() => {
        setDisabledField((prev) => !prev);
    }, []);

    const handleAddChannel = useCallback(() => {
        if (!selectedChannelToAdd.trim()) return;
        setValue("channels", [...channels, selectedChannelToAdd.trim()], { shouldDirty: true });
        setSelectedChannelToAdd("");
    }, [channels, selectedChannelToAdd, setValue]);

    const handleFormSubmit = useCallback(
        (data: CorporateComercialModelFormValues) => {
            const payload = {
                ...data,
                transactions,
            };
            console.log("Formulario modelo comercial:", payload);
            setDisabledField(true);
        },
        [transactions]
    );

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="contents">
            <CustomFormButtons isReadOnly={disabledField} onToggle={handleDisabledField} />
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
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
            <ParagraphH2 text="Canales de pago" />
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">

                <Field className={disabledField ? "grid gap-2 sm:col-span-4" : "grid gap-2 sm:col-span-3"} aria-invalid={Boolean(errors.channels)}>
                    <DataTable
                        columns={channelsColumns}
                        data={channelsTableData}
                        getRowId={(row) => String(row.id)}
                        pagination={false}
                    />
                </Field>
                {!disabledField && (
                    <div className="flex flex-col gap-2 ">
                        <div className="flex items-end gap-2">
                            <DropdownWithSearch
                                id="channelToAdd"
                                options={CHANNEL_OPTIONS}
                                value={selectedChannelToAdd}
                                onValueChange={setSelectedChannelToAdd}
                                placeholder="Agregar canal"
                                className="max-w-[90%]"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={handleAddChannel}
                                disabled={!selectedChannelToAdd.trim()}
                                aria-label="Agregar canal a la lista"
                                className="shrink-0"
                            >
                                <CirclePlus className="size-4" aria-hidden />
                            </Button>
                        </div>
                    </div>
                )}
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 mb-4">
                <div className="min-w-0">
                    <ParagraphH2 text="Transacciones" />
                    <DataTable
                        columns={transactionLiteColumns}
                        data={transactions}
                        getRowId={(row) => row.transactionRange}
                    />
                </div>

            </FieldGroup>

            <CustomFormButtons isReadOnly={disabledField} onToggle={handleDisabledField} />
        </form>
    );
}
