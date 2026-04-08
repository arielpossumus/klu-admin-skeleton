"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { CustomFormButtons } from "@/components/commons/CustomFormButtons";
import { createCommerceMsiRatesColumns } from "@/components/tables/commerces/commerceMsiRatesColumns";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { DropdownWithSearch } from "@/components/ui/dropdown-with-search";
import {
  getAllCommissionMonths,
  type CommissionMonthOption,
} from "@/services/annex/commisionMonths";
import type { CommerceMsiRateRow } from "@/types/commerce/CommerceList";

export type CommerceMsiRatesDataProps = {
  msiRatesData?: CommerceMsiRateRow[];
};

type LocalMsiRow = CommerceMsiRateRow & { _localId: string };

type NewMsiFormValues = {
  month: string;
  visaMastercardPorcentage: string;
  amexPorcentage: string;
};

const emptyForm: NewMsiFormValues = {
  month: "",
  visaMastercardPorcentage: "",
  amexPorcentage: "",
};

const resolveMonthValue = (
  storedMonth: string | undefined,
  options: CommissionMonthOption[]
): string => {
  const t = (storedMonth ?? "").trim();
  if (!t) return "";
  const byLabel = options.find((o) => o.label.toLowerCase() === t.toLowerCase());
  if (byLabel) return byLabel.value;
  const byValue = options.find((o) => o.value === t);
  return byValue?.value ?? "";
};

const rowToFormValues = (
  r: LocalMsiRow,
  monthOptions: CommissionMonthOption[]
): NewMsiFormValues => ({
  month: resolveMonthValue(r.month, monthOptions),
  visaMastercardPorcentage: (r.visaMastercardPorcentage ?? "").trim(),
  amexPorcentage: (r.amexPorcentage ?? "").trim(),
});

const mapToLocalRows = (data?: CommerceMsiRateRow[]): LocalMsiRow[] =>
  (data ?? []).map((r, i) => ({
    ...r,
    _localId: `seed-${i}-${r.month ?? ""}`,
  }));

export function CommerceMsiRatesData({ msiRatesData }: CommerceMsiRatesDataProps) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [editingLocalId, setEditingLocalId] = useState<string | null>(null);
  const [rows, setRows] = useState<LocalMsiRow[]>(() => mapToLocalRows(msiRatesData));

  useEffect(() => {
    setRows(mapToLocalRows(msiRatesData));
  }, [msiRatesData]);

  const { data: monthOptions = [], isPending: isMonthsPending } = useQuery({
    queryKey: ["annex", "commission-months"],
    queryFn: getAllCommissionMonths,
    staleTime: 60_000,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewMsiFormValues>({
    defaultValues: emptyForm,
  });

  const handleEditRow = useCallback(
    (row: CommerceMsiRateRow) => {
      const local = row as LocalMsiRow;
      setEditingLocalId(local._localId);
      reset(rowToFormValues(local, monthOptions));
      setIsReadOnly(false);
    },
    [monthOptions, reset]
  );

  const handleDeleteRow = useCallback(
    (row: CommerceMsiRateRow) => {
      const local = row as LocalMsiRow;
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

  const msiColumns = useMemo(
    () =>
      createCommerceMsiRatesColumns({
        onEditRow: handleEditRow,
        onDeleteRow: handleDeleteRow,
      }) as ColumnDef<LocalMsiRow, unknown>[],
    [handleEditRow, handleDeleteRow]
  );

  const onSubmit = useCallback(
    (values: NewMsiFormValues) => {
      const monthLabel =
        monthOptions.find((o) => o.value === values.month)?.label ?? values.month.trim();
      const payload: Omit<LocalMsiRow, "_localId"> = {
        month: monthLabel,
        visaMastercardPorcentage: values.visaMastercardPorcentage.trim(),
        amexPorcentage: values.amexPorcentage.trim(),
      };

      if (editingLocalId) {
        setRows((prev) =>
          prev.map((r) =>
            r._localId === editingLocalId ? { ...payload, _localId: r._localId } : r
          )
        );
      } else {
        setRows((prev) => [...prev, { ...payload, _localId: crypto.randomUUID() }]);
      }

      setEditingLocalId(null);
      reset(emptyForm);
      setIsReadOnly(true);
    },
    [editingLocalId, monthOptions, reset]
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
        rows.length ? "Comisiones MSI del comercio" : "Sin comisiones MSI registradas"
      }
    >
      <h3 className="text-sm font-semibold text-foreground">Comisión por MSI</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        aria-label="Alta o edición de comisión MSI"
      >
        <CustomFormButtons
          isReadOnly={isReadOnly}
          onToggle={handleToggle}
          actionName="Agregar"
          readOnlyIcon={CirclePlus}
        />

        {!isReadOnly && (
          <FieldGroup className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Field className="grid gap-2">
              <FieldLabel htmlFor="msi-month">
                Mes<span className="text-destructive">*</span>
              </FieldLabel>
              <Controller
                name="month"
                control={control}
                rules={{ required: "El mes es obligatorio" }}
                render={({ field, fieldState }) => (
                  <DropdownWithSearch
                    id="msi-month"
                    options={monthOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Selecciona meses para la tasa"
                    disabled={isMonthsPending}
                    emptyLabel={isMonthsPending ? "Cargando…" : "Sin resultados"}
                    className={fieldState.invalid ? "border-destructive" : undefined}
                  />
                )}
              />
              <FieldError errors={errors.month ? [errors.month] : undefined} />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="msi-visa-mc">Visa / Mastercard</FieldLabel>
              <Input
                id="msi-visa-mc"
                placeholder="Ej. 2.26 %"
                {...register("visaMastercardPorcentage")}
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="msi-amex">Amex</FieldLabel>
              <Input
                id="msi-amex"
                placeholder="Ej. 2.78 %"
                {...register("amexPorcentage")}
              />
            </Field>
          </FieldGroup>
        )}
      </form>

      <DataTable<LocalMsiRow, unknown>
        columns={msiColumns}
        data={rows}
        pagination={false}
        getRowId={(row) => row._localId}
      />
    </section>
  );
}
