import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Eraser, ListFilter, Plus } from "lucide-react";

import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
import { TablesLoader } from "@/components/loaders/TablesLoader";
import SectionTitle from "@/components/text/SectionTitle";
import { allCommercesColumns } from "@/components/tables/commerces/allCommercesColumns";
import { getAllCommerces } from "@/services/commerces/getAllCommerces";
import { getAllCorporates } from "@/services/corporate/getAllCorporates";
import type { AllCommercesGridApiRow } from "@/types/commerce/CommerceList";
import { Button } from "@/components/ui/button";
import { CustomCollapsibleCard } from "@/components/commons/CustomCollapsibleCard";
import {
    EMPTY_COMMERCE_INDEX_FILTERS,
    type CommerceIndexFiltersFormValues,
} from "@/types/filters/CommerceIndexFilters";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { DropdownWithSearch } from "@/components/ui/dropdown-with-search";

const CommercesIndex = () => {
    const [filtersOpen, setFiltersOpen] = useState(true);
    const [filters, setFilters] = useState<CommerceIndexFiltersFormValues | undefined>(undefined);

    const { handleSubmit, reset, watch, control } = useForm<CommerceIndexFiltersFormValues>({
        mode: "onTouched",
        defaultValues: EMPTY_COMMERCE_INDEX_FILTERS,
    });

    const { data: rows = [], isPending } = useQuery({
        queryKey: ["commerces", "all"],
        queryFn: getAllCommerces,
        staleTime: 60_000,
    });

    const { data: corporatesRows = [], isPending: isCorporatesPending } = useQuery({
        queryKey: ["corporates", "all"],
        queryFn: getAllCorporates,
        staleTime: 60_000,
    });

    const watched = watch();
    const hasAnyFilter = [watched.corporativo, watched.nombre, watched.estado].some(
        (v) => String(v).trim() !== ""
    );

    const corporativoOptions = useMemo(() => {
        const names = corporatesRows
            .map((c) => c.corporateName?.trim())
            .filter((n): n is string => Boolean(n && n.length > 0));
        const unique = [...new Set(names)].sort((a, b) => a.localeCompare(b));
        return unique.map((name) => ({ value: name, label: name }));
    }, [corporatesRows]);

    const nombreOptions = useMemo(() => {
        const unique = new Set(
            rows.map((r) => r.businessName?.trim()).filter((n): n is string => Boolean(n && n.length > 0))
        );
        return [...unique]
            .sort((a, b) => a.localeCompare(b))
            .map((n) => ({ value: n, label: n }));
    }, [rows]);

    const estadoOptions = useMemo(
        () => [
            { value: "ACTIVO", label: "ACTIVO" },
            { value: "INACTIVO", label: "INACTIVO" },
        ],
        []
    );

    const displayedRows = useMemo(() => {
        if (!filters) return rows;
        return rows.filter((r) => {
            if (filters.corporativo.trim() && r.corporate !== filters.corporativo) return false;
            if (filters.nombre.trim() && r.businessName !== filters.nombre) return false;
            if (filters.estado.trim() && r.businessStatus !== filters.estado) return false;
            return true;
        });
    }, [rows, filters]);

    const getRowId = (row: AllCommercesGridApiRow) => String(row.businessId);

    const onFilter = (values: CommerceIndexFiltersFormValues) => {
        setFilters(values);
    };

    const onClearFilters = () => {
        reset(EMPTY_COMMERCE_INDEX_FILTERS);
        setFilters(undefined);
    };

    const handleAddCommerce = () => {
        console.log("Agregar Comercio");
    };

    return (
        <>
            <SectionTitle
                title="Comercios"
                subtitle="Comercios de la aplicación"
                actionName="Agregar Comercio "
                actionIcon={Plus}
                showButton={true}
                handleAction={handleAddCommerce}
            />
            <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
                <CustomCollapsibleCard
                    title="Filtrar"
                    open={filtersOpen}
                    onOpenChange={setFiltersOpen}
                    cardBackgroundClassName="bg-[var(--color-primary)]"
                >
                    <Card className="p-4 mt-4">
                        <form onSubmit={handleSubmit(onFilter)} className="flex flex-col gap-4">
                            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <Field className="grid gap-2">
                                    <FieldLabel htmlFor="commerce-filter-corporativo">Corporativo</FieldLabel>
                                    <Controller
                                        name="corporativo"
                                        control={control}
                                        render={({ field }) => (
                                            <DropdownWithSearch
                                                id="commerce-filter-corporativo"
                                                options={corporativoOptions}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                placeholder="Seleccione"
                                                disabled={isCorporatesPending}
                                                emptyLabel={isCorporatesPending ? "Cargando…" : "Sin resultados"}
                                            />
                                        )}
                                    />
                                </Field>
                                <Field className="grid gap-2">
                                    <FieldLabel htmlFor="commerce-filter-nombre">Nombre</FieldLabel>
                                    <Controller
                                        name="nombre"
                                        control={control}
                                        render={({ field }) => (
                                            <DropdownWithSearch
                                                id="commerce-filter-nombre"
                                                options={nombreOptions}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                placeholder="Seleccione"
                                                disabled={isPending}
                                                emptyLabel={isPending ? "Cargando…" : "Sin resultados"}
                                            />
                                        )}
                                    />
                                </Field>
                                <Field className="grid gap-2">
                                    <FieldLabel htmlFor="commerce-filter-estado">Estado</FieldLabel>
                                    <Controller
                                        name="estado"
                                        control={control}
                                        render={({ field }) => (
                                            <DropdownWithSearch
                                                id="commerce-filter-estado"
                                                options={estadoOptions}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                placeholder="Seleccione"
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
                    {isPending ? (
                        <TablesLoader
                            columnCount={allCommercesColumns.length}
                            rowCount={8}
                            loadingText="Cargando comercios"
                        />
                    ) : (
                        <DataTable
                            columns={allCommercesColumns}
                            data={displayedRows}
                            getRowId={getRowId}
                        />
                    )}
                </Card>
            </div>
        </>
    );
};

export default CommercesIndex;
