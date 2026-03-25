import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Eraser, ListFilter } from "lucide-react";
import SectionTitle from "@/components/text/SectionTitle";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    getPosHealthColumns,
    PosHealthExpandedContent,
    type PosHealthExpandedType,
} from "@/components/tables/posHealth";
import type { Device } from "@/types/device/Device";
import type { DeviceBattery } from "@/types/device/DeviceBattery";
import type { DevicePrinter } from "@/types/device/DevicePrinter";
import type { DeviceConnection } from "@/types/device/DeviceConnection";
import devicesJson from "../../../public/mockups/getAlldevices.json" with { type: "json" };
import devicesBatteryJson from "../../../public/mockups/getAllDevicesBatery.json" with { type: "json" };
import devicesPrinterJson from "../../../public/mockups/getAllPrinterDevices.json" with { type: "json" };
import devicesConnectionJson from "../../../public/mockups/getAllconectionsDevices.json" with { type: "json" };
import { TablesLoader } from "@/components/loaders/TablesLoader";
import corporatesJson from "../../../public/mockups/corporates/getAllCorporates.json" with { type: "json" };
import type { CorporateGrid } from "@/types/corporate/CorporateGrid";
import { CustomCollapsibleCard } from "@/components/commons/CustomCollapsibleCard";
import { type PosHealthFiltersFormValues, EMPTY_FILTERS } from "@/types/filters/CorporateFilters";
import { DropdownWithSearch, type DropdownWithSearchOption } from "@/components/ui/dropdown-with-search";
import { getAllPosBrands } from "@/services/posHealt/getAllPosBrands";




const PosHealth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
    const [expandedType, setExpandedType] = useState<PosHealthExpandedType>(null);
    const [filters, setFilters] = useState<PosHealthFiltersFormValues | undefined>(undefined);
    const [filtersOpen, setFiltersOpen] = useState(true);
    const dataCorporates = (corporatesJson?.rows ?? []) as CorporateGrid[];

    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(t);
    }, []);

    const devicesData = devicesJson as { total: number; rows: Device[]; };
    const devices: Device[] = devicesData.rows ?? [];

    const devicesBatteryData = devicesBatteryJson as { total: number; rows: DeviceBattery[]; };
    const batteries: DeviceBattery[] = devicesBatteryData.rows ?? [];

    const devicesPrinterData = devicesPrinterJson as { total: number; rows: DevicePrinter[]; };
    const printers: DevicePrinter[] = devicesPrinterData.rows ?? [];

    const devicesConnectionData = devicesConnectionJson as { total: number; rows: DeviceConnection[]; };
    const connections: DeviceConnection[] = devicesConnectionData.rows ?? [];

    const handleActionClick = (serial: string, type: PosHealthExpandedType) => {
        if (!type) return;
        const isSame = expandedRowId === serial && expandedType === type;
        setExpandedRowId(isSame ? null : serial);
        setExpandedType(isSame ? null : type);
    };

    const mainColumns = getPosHealthColumns({
        expandedRowId,
        expandedType,
        batteries,
        printers,
        connections,
        onActionClick: handleActionClick,
    });
    const { register, handleSubmit, reset, watch, control, setValue } = useForm<PosHealthFiltersFormValues>({
        mode: "onTouched",
        defaultValues: EMPTY_FILTERS,
    });

    const { data: posBrands = [], isPending: isPosBrandsPending } = useQuery({
        queryKey: ["posBrands"],
        queryFn: getAllPosBrands,
        staleTime: 60_000,
    });

    const watched = watch();
    const watchedBrand = watched.brand;

    const brandOptions: DropdownWithSearchOption[] = useMemo(() => {
        return posBrands.map((b) => ({
            value: b.Brand,
            label: b.Brand,
        }));
    }, [posBrands]);

    const modelOptions: DropdownWithSearchOption[] = useMemo(() => {
        if (!watchedBrand.trim()) return [];
        const entry = posBrands.find((b) => b.Brand === watchedBrand);
        if (!entry) return [];
        return entry.Models.map((m) => ({ value: m, label: m }));
    }, [posBrands, watchedBrand]);

    const isModelDropdownDisabled = !watchedBrand.trim() || isPosBrandsPending;

    const modelEmptyLabel = !watchedBrand.trim()
        ? "Seleccione una marca"
        : modelOptions.length === 0
            ? "Sin modelos"
            : "Sin resultados";

    useEffect(() => {
        if (!watchedBrand.trim()) {
            setValue("model", "");
        }
    }, [watchedBrand, setValue]);
    const hasAnyFilter = [
        watched.corporate,
        watched.commerce,
        watched.serial,
        watched.brand,
        watched.model,
    ].some((v) => String(v).trim() !== "");

    const onFilter = (values: PosHealthFiltersFormValues) => {
        setFilters(values);
    };

    useEffect(() => {
        if (filters !== undefined) console.log("filters", filters);
    }, [filters]);

    const onClearFilters = () => {
        reset(EMPTY_FILTERS);
        setFilters(undefined);
    };

    return (
        <>
            <SectionTitle title="POS Health" subtitle="Dispositivos y estado de los mismos" />
            <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">

                <CustomCollapsibleCard
                    title="Filtrar"
                    open={filtersOpen}
                    onOpenChange={setFiltersOpen}
                    icon={<ListFilter className="size-3.5" aria-hidden />}
                    cardBackgroundClassName="bg-[var(--color-primary)]"
                >
                    <Card className="p-4 mt-4">
                        <form
                            onSubmit={handleSubmit(onFilter)}
                            className="flex flex-col gap-4"
                        >
                            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                <Field className="grid gap-2">
                                    <FieldLabel htmlFor="poshealth-filter-corporate">Corporativo</FieldLabel>
                                    <Controller
                                        name="corporate"
                                        control={control}
                                        render={({ field }) => (
                                            <DropdownWithSearch
                                                id="poshealth-filter-corporate"
                                                options={dataCorporates.map((c) => ({
                                                    value: String(c.corporateId),
                                                    label: c.corporateName,
                                                }))}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                placeholder="Seleccione"
                                            />
                                        )}
                                    />
                                </Field>
                                <Field className="grid gap-2">
                                    <FieldLabel htmlFor="poshealth-filter-commerce">Comercio</FieldLabel>
                                    <Input
                                        id="poshealth-filter-commerce"
                                        type="text"
                                        placeholder="Comercio"
                                        {...register("commerce")}
                                    />
                                </Field>
                                <Field className="grid gap-2">
                                    <FieldLabel htmlFor="poshealth-filter-serial">Serial</FieldLabel>
                                    <Input
                                        id="poshealth-filter-serial"
                                        type="text"
                                        placeholder="Serial"
                                        {...register("serial")}
                                    />
                                </Field>
                                <Field className="grid gap-2">
                                    <FieldLabel htmlFor="poshealth-filter-brand">Marca</FieldLabel>
                                    <Controller
                                        name="brand"
                                        control={control}
                                        render={({ field }) => (
                                            <DropdownWithSearch
                                                id="poshealth-filter-brand"
                                                options={brandOptions}
                                                value={field.value}
                                                onValueChange={(val) => {
                                                    field.onChange(val);
                                                    setValue("model", "");
                                                }}
                                                placeholder="Seleccione"
                                                disabled={isPosBrandsPending}
                                                emptyLabel={isPosBrandsPending ? "Cargando…" : "Sin resultados"}
                                            />
                                        )}
                                    />
                                </Field>
                                <Field className="grid gap-2">
                                    <FieldLabel htmlFor="poshealth-filter-model">Modelo</FieldLabel>
                                    <Controller
                                        name="model"
                                        control={control}
                                        render={({ field }) => (
                                            <DropdownWithSearch
                                                id="poshealth-filter-model"
                                                options={modelOptions}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                placeholder={watchedBrand.trim() ? "Seleccione" : "Seleccione una marca"}
                                                disabled={isModelDropdownDisabled}
                                                emptyLabel={modelEmptyLabel}
                                            />
                                        )}
                                    />
                                </Field>
                            </FieldGroup>
                            <div className="flex flex-wrap justify-end gap-2">
                                <Button
                                    type="submit"
                                    disabled={!hasAnyFilter}
                                    className="btn-form-action btn-primary gap-2"
                                >
                                    <ListFilter className="size-4" />
                                    Filtrar
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={!hasAnyFilter}
                                    onClick={onClearFilters}
                                    className="gap-2 btn-form-action btn-cancel"
                                >
                                    <Eraser className="size-4" />
                                    Borrar
                                </Button>
                            </div>
                        </form>
                    </Card>
                </CustomCollapsibleCard>
                <Card className="p-4">
                    {isLoading ? (
                        <TablesLoader columnCount={7} rowCount={10} loadingText="Cargando datos de dispositivos POS" />
                    ) : (
                        <DataTable<Device, unknown>
                            columns={mainColumns}
                            data={devices}
                            getRowId={(row) => row.posSerial}
                            expandedRowId={expandedRowId}
                            renderExpandedContent={(row) => (
                                <PosHealthExpandedContent
                                    row={row}
                                    expandedType={expandedType}
                                    devices={devices}
                                    batteries={batteries}
                                    printers={printers}
                                    connections={connections}
                                />
                            )}
                        />
                    )}
                </Card>
            </div >
        </>
    );
};

export default PosHealth;
