import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { DropdownWithSearch, type DropdownWithSearchOption } from "@/components/ui/dropdown-with-search";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { acquisitionBanksService } from "@/services/annex/acquisitionBanksService";
import { channelsService } from "@/services/annex/channelsService";
import { IVA_PORCENTAJE } from "@/config/constants";
import type { AddCorporateFormValues } from "@/types/corporate/addCorporate";
import ParagraphH2 from "@/components/text/ParagraphH2";

const COSTO_ADQUIRENCIA_RANGOS: { key: "costoAdquirenciaRango1" | "costoAdquirenciaRango2" | "costoAdquirenciaRango3" | "costoAdquirenciaRango4"; label: string }[] = [
    { key: "costoAdquirenciaRango1", label: "1 - 250,000" },
    { key: "costoAdquirenciaRango2", label: "250,001 - 500,000" },
    { key: "costoAdquirenciaRango3", label: "500,001 - 800,000" },
    { key: "costoAdquirenciaRango4", label: "800,001 - ≤" },
];

export function Step4() {
    const form = useFormContext<AddCorporateFormValues>();
    const adquirente = form.watch("commercial.adquirente");

    const { data: banksList = [] } = useQuery({
        queryKey: ["acquisition-banks-list"],
        queryFn: async () => {
            try {
                return await acquisitionBanksService.getAll();
            } catch {
                return [];
            }
        },
        placeholderData: [],
    });

    const { data: channelsList = [] } = useQuery({
        queryKey: ["channels-list"],
        queryFn: async () => {
            try {
                return await channelsService.getAll();
            } catch {
                return [];
            }
        },
        placeholderData: [],
    });

    const bankOptions: DropdownWithSearchOption[] = useMemo(
        () =>
            (Array.isArray(banksList) ? banksList : []).map((item) => ({
                value: String(item.id),
                label: item.name,
            })),
        [banksList]
    );

    const channelOptions: DropdownWithSearchOption[] = useMemo(
        () =>
            (Array.isArray(channelsList) ? channelsList : []).map((item) => ({
                value: String(item.id),
                label: item.name,
            })),
        [channelsList]
    );

    return (
        <div className="flex flex-col gap-8">
            <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
                <ParagraphH2 text="Adquiriente" />
            </FieldGroup>
            <FieldSet className="grid grid-cols-1 sm:grid-cols-[minmax(0,max-content)_1fr_1fr] gap-4 items-end">
                <Field className="grid gap-2 w-fit min-w-1">
                    <FieldLabel htmlFor="commercial-adquirente" className="text-sm font-medium">
                        Adquirente
                    </FieldLabel>
                    <FieldContent>
                        <Controller
                            name="commercial.adquirente"
                            control={form.control}
                            render={({ field }) => (
                                <Switch
                                    id="commercial-adquirente"
                                    size="sm"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-label="Adquirente"
                                    className="data-[state=unchecked]:bg-error-dark data-[state=checked]:bg-success-dark"
                                />
                            )}
                        />
                    </FieldContent>
                </Field>
            </FieldSet>
            <FieldSet className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                {adquirente ? (
                    <>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="commercial.credito">
                                Crédito <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id="commercial.credito"
                                    placeholder="Crédito"
                                    aria-required
                                    {...form.register("commercial.credito", {
                                        required: adquirente ? "Requerido" : false,
                                    })}
                                />
                                <FieldError errors={[form.formState.errors.commercial?.credito]} />
                            </FieldContent>
                        </Field>
                        <Field className="grid gap-2">
                            <FieldLabel htmlFor="commercial.debito">
                                Débito <span className="text-destructive">*</span>
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id="commercial.debito"
                                    placeholder="Débito"
                                    aria-required
                                    {...form.register("commercial.debito", {
                                        required: adquirente ? "Requerido" : false,
                                    })}
                                />
                                <FieldError errors={[form.formState.errors.commercial?.debito]} />
                            </FieldContent>
                        </Field>
                    </>
                ) : (
                    <>
                        <Field className="grid gap-2">
                            <FieldLabel id="commercial.bancoAdquirente">Banco Adquirente</FieldLabel>
                            <FieldContent>
                                <Controller
                                    name="commercial.bancoAdquirente"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <DropdownWithSearch
                                                id="commercial.bancoAdquirente"
                                                options={bankOptions}
                                                value={field.value ?? ""}
                                                onValueChange={field.onChange}
                                                placeholder="Seleccione banco"
                                            />
                                            <FieldError errors={[fieldState.error]} />
                                        </>
                                    )}
                                />
                            </FieldContent>
                        </Field>
                    </>
                )}

                <Field className="grid gap-2">
                    <FieldLabel id="commercial.canales">Canales</FieldLabel>
                    <FieldContent>
                        <Controller
                            name="commercial.canales"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <>
                                    <DropdownWithSearch
                                        id="commercial.canales"
                                        options={channelOptions}
                                        value={field.value ?? ""}
                                        onValueChange={field.onChange}
                                        placeholder="Seleccione canal"
                                    />
                                    <FieldError errors={[fieldState.error]} />
                                </>
                            )}
                        />
                    </FieldContent>
                </Field>
            </FieldSet>





            <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
                <ParagraphH2 text="Costos Transaccional" />
            </FieldGroup>
            <FieldSet className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="commercial.rentaMensual">Renta Mensual</FieldLabel>
                    <FieldContent>
                        <Controller
                            name="commercial.rentaMensual"
                            control={form.control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    id="commercial.rentaMensual"
                                    placeholder="Renta Mensual"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                />
                            )}
                        />
                        <FieldError errors={[form.formState.errors.commercial?.rentaMensual]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="commercial.diasCancelacion">Días para Cancelación</FieldLabel>
                    <FieldContent>
                        <Controller
                            name="commercial.diasCancelacion"
                            control={form.control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    id="commercial.diasCancelacion"
                                    placeholder="Días"
                                    type="number"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                />
                            )}
                        />
                        <FieldError errors={[form.formState.errors.commercial?.diasCancelacion]} />
                    </FieldContent>
                </Field>
                <Field className="grid gap-2">
                    <FieldLabel htmlFor="commercial.numeroTransacciones">Número de Transacciones</FieldLabel>
                    <FieldContent>
                        <Controller
                            name="commercial.numeroTransacciones"
                            control={form.control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    id="commercial.numeroTransacciones"
                                    placeholder="Cantidad"
                                    type="number"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                />
                            )}
                        />
                        <FieldError errors={[form.formState.errors.commercial?.numeroTransacciones]} />
                    </FieldContent>
                </Field>
            </FieldSet>
            <FieldGroup className="grid grid-cols-1  gap-4 mb-4 px-0">
                <ParagraphH2 text="Costo por Transacción" />
            </FieldGroup>
            <FieldSet className="grid grid-cols-1 gap-4">
                <FieldLabel className="col-span-full">Costo de Adquirencia</FieldLabel>
                {COSTO_ADQUIRENCIA_RANGOS.map(({ key, label }) => {
                    const costValue = form.watch(`commercial.${key}`);
                    const costNum = Number.parseFloat(String(costValue).replace(/,/g, "")) || 0;
                    const ivaNum = costNum * (IVA_PORCENTAJE / 100);
                    const totalNum = costNum + ivaNum;
                    const formatMoneda = (n: number) =>
                        Number.isNaN(n) || n === 0 ? "—" : n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    return (
                        <div key={key} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end rounded-md border border-border/60 bg-muted/30 p-4">
                            <span className="text-sm font-medium text-foreground">{label}</span>
                            <Field className="grid gap-2">
                                <FieldLabel htmlFor={`commercial.${key}`} className="text-xs">Costo</FieldLabel>
                                <FieldContent>
                                    <Controller
                                        name={`commercial.${key}`}
                                        control={form.control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Input
                                                id={`commercial.${key}`}
                                                placeholder="0.00"
                                                type="text"
                                                inputMode="decimal"
                                                value={field.value ?? ""}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                ref={field.ref}
                                            />
                                        )}
                                    />
                                </FieldContent>
                            </Field>
                            <div className="grid gap-1">
                                <span className="text-xs text-muted-foreground">IVA ({IVA_PORCENTAJE}%)</span>
                                <span className="text-sm font-medium">{formatMoneda(ivaNum)}</span>
                            </div>
                            <div className="grid gap-1">
                                <span className="text-xs text-muted-foreground">Total</span>
                                <span className="text-sm font-medium">{formatMoneda(totalNum)}</span>
                            </div>
                        </div>
                    );
                })}
            </FieldSet>
        </div>
    );
}
