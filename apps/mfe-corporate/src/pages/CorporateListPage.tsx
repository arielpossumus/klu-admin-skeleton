import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import {
  ChevronDown,
  Database,
  Eraser,
  FileBraces,
  FileCode,
  FileDown,
  FileText,
  FileType,
  ListFilter,
  Plus,
  Sheet,
} from "lucide-react";
import { useNavigate } from "react-router";

import corporatesTypesJson from "@/mockups/annex/getAllCorporatesTypes.json" with { type: "json" };
import statusJson from "@/mockups/annex/getAllStatus.json" with { type: "json" };
import { corporateColumns } from "@/components/tables/corporateColumns";
import { TablesLoader } from "@/components/loaders/TablesLoader";
import SectionTitle from "@/components/text/SectionTitle";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  DropdownWithSearch,
  type DropdownWithSearchOption,
} from "@/components/ui/dropdown-with-search";
import { DataTable } from "@/components/ui/data-table";
import { CustomCollapsibleCard } from "@/components/commons/CustomCollapsibleCard";
import { fiidService } from "@/services/annex/fiidService";
import { getAllCorporates } from "@/services/corporate/getAllCorporates";
import {
  type CorporateIndexFiltersFormValues,
  EMPTY_CORPORATE_INDEX_FILTERS,
} from "@/types/filters/CorporateIndexFilters";

type CorporateTypeRow = { typeId: number; typeName: string };
type StatusRow = { id: string; description: string };

const dataTypes = (corporatesTypesJson ?? []) as CorporateTypeRow[];
const dataStatusAll = (statusJson ?? []) as StatusRow[];
const dataStatus = dataStatusAll.filter((s) => s.id === "1" || s.id === "2");
const statusOptions = dataStatus.map((s) => ({ value: s.description, label: s.description }));

const CorporateListPage = () => {
  const navigate = useNavigate();
  const [, setFilters] = useState<CorporateIndexFiltersFormValues | undefined>(undefined);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const { handleSubmit, reset, watch, control } = useForm<CorporateIndexFiltersFormValues>({
    mode: "onTouched",
    defaultValues: EMPTY_CORPORATE_INDEX_FILTERS,
  });

  const { data: corporatesRows = [], isPending: isCorporatesPending } = useQuery({
    queryKey: ["corporates", "all"],
    queryFn: getAllCorporates,
    staleTime: 60_000,
  });

  const { data: fiidList = [], isPending: isFiidPending } = useQuery({
    queryKey: ["fiid"],
    queryFn: () => fiidService.getAll(),
    staleTime: 60_000,
  });

  const fiidOptions: DropdownWithSearchOption[] = useMemo(
    () => fiidList.map((item) => ({ value: String(item.id), label: item.value })),
    [fiidList],
  );

  const watched = watch();
  const hasAnyFilter = [watched.nombre, watched.fiid, watched.modeloComercial, watched.estado].some(
    (v) => String(v).trim() !== "",
  );

  const onFilter = (values: CorporateIndexFiltersFormValues) => {
    setFilters(values);
  };

  const onClearFilters = () => {
    reset(EMPTY_CORPORATE_INDEX_FILTERS);
    setFilters(undefined);
  };

  const handleAddCorporate = () => {
    navigate("/corporate/add-corporate");
  };

  return (
    <>
      <SectionTitle
        title="Corporativo"
        subtitle="Corporativo de la aplicación"
        actionName="Agregar Corporativo "
        actionIcon={Plus}
        showButton={true}
        handleAction={handleAddCorporate}
      />
      <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
        <CustomCollapsibleCard
          title="Filtrar"
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          cardBackgroundClassName="bg-[var(--color-primary)]"
        >
          <Card className="mt-4 p-4">
            <form onSubmit={handleSubmit(onFilter)} className="flex flex-col gap-4">
              <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field className="grid gap-2">
                  <FieldLabel htmlFor="corporate-filter-nombre">Nombre</FieldLabel>
                  <Controller
                    name="nombre"
                    control={control}
                    render={({ field }) => (
                      <DropdownWithSearch
                        id="corporate-filter-nombre"
                        options={corporatesRows.map((c) => ({
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
                  <FieldLabel htmlFor="corporate-filter-fiid">FIID</FieldLabel>
                  <Controller
                    name="fiid"
                    control={control}
                    render={({ field }) => (
                      <DropdownWithSearch
                        id="corporate-filter-fiid"
                        options={fiidOptions}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Seleccione"
                        disabled={isFiidPending}
                        emptyLabel={isFiidPending ? "Cargando…" : "Sin resultados"}
                      />
                    )}
                  />
                </Field>
                <Field className="grid gap-2">
                  <FieldLabel htmlFor="corporate-filter-modelo">Modelo Comercial</FieldLabel>
                  <Controller
                    name="modeloComercial"
                    control={control}
                    render={({ field }) => (
                      <DropdownWithSearch
                        id="corporate-filter-modelo"
                        options={dataTypes.map((t) => ({
                          value: t.typeName,
                          label: t.typeName,
                        }))}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Seleccione"
                      />
                    )}
                  />
                </Field>
                <Field className="grid gap-2">
                  <FieldLabel htmlFor="corporate-filter-estado">Estado</FieldLabel>
                  <Controller
                    name="estado"
                    control={control}
                    render={({ field }) => (
                      <DropdownWithSearch
                        id="corporate-filter-estado"
                        options={statusOptions}
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
                  className="btn-form-action btn-cancel gap-2"
                >
                  <Eraser className="size-4" />
                  Borrar
                </Button>
              </div>
            </form>
          </Card>
        </CustomCollapsibleCard>
        <Card className="p-4">
          <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between gap-2 bg-[var(--accent)] text-accent-foreground hover:bg-[var(--accent-dark)]"
                >
                  <FileDown className="size-4" aria-hidden />
                  <ChevronDown className="size-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="gap-2">
                    <FileBraces className="size-4" aria-hidden />
                    Json
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <FileCode className="size-4" aria-hidden />
                    XML
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <FileText className="size-4" aria-hidden />
                    CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <FileType className="size-4" aria-hidden />
                    TXT
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Database className="size-4" aria-hidden />
                    SQL
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Sheet className="size-4" aria-hidden />
                    Excel
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {isCorporatesPending ? (
            <TablesLoader columnCount={5} rowCount={5} loadingText="Cargando datos de corporativos" />
          ) : (
            <DataTable columns={corporateColumns} data={corporatesRows} />
          )}
        </Card>
      </div>
    </>
  );
};

export default CorporateListPage;
