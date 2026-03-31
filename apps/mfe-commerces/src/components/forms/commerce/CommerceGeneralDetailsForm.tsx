"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { CustomFormButtons } from "@/components/commons/CustomFormButtons";
import { commerceAffiliationsColumns } from "@/components/tables/commerces/commerceAffiliationsColumns";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DataTable } from "@/components/ui/data-table";
import type { AllCommercesGridApiRow } from "@/types/commerce/CommerceList";

import type { CommerceGeneralDetailsFormValues } from "@/types/commerce/CommerceGeneralDetailsFormValues";

const normalizeStatus = (
  raw?: string
): "Activo" | "Inactivo" =>
  raw?.toUpperCase() === "ACTIVO" ? "Activo" : "Inactivo";

const buildDefaults = (
  commerce?: AllCommercesGridApiRow
): CommerceGeneralDetailsFormValues => ({
  corporateName: commerce?.corporate ?? "",
  businessName: commerce?.businessName ?? "",
  mcc: commerce?.mcc ?? "",
  commercialLine: commerce?.businessLine ?? "",
  status: normalizeStatus(commerce?.businessStatus),
});

export type CommerceGeneralDetailsFormProps = {
  commerce?: AllCommercesGridApiRow;
};

export const CommerceGeneralDetailsForm = ({
  commerce,
}: CommerceGeneralDetailsFormProps) => {
  const [isReadOnly, setIsReadOnly] = useState(true);

  const defaults = useMemo(() => buildDefaults(commerce), [commerce]);

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CommerceGeneralDetailsFormValues>({
    defaultValues: defaults,
  });

  useEffect(() => {
    reset(defaults);
  }, [defaults, reset]);

  const status = watch("status") ?? defaults.status;

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

  const affiliations = useMemo(
    () => commerce?.affiliations ?? [],
    [commerce?.affiliations]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="contents">
        <CustomFormButtons isReadOnly={isReadOnly} onToggle={handleToggle} />

        {!isReadOnly && (
          <FieldGroup className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field className="grid gap-2">
              <FieldLabel htmlFor="commerce-corporate">
                Nombre de corporativo
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="commerce-corporate"
                type="text"
                placeholder="Corporativo"
                aria-invalid={Boolean(errors.corporateName)}
                aria-required
                {...register("corporateName", {
                  required: "El nombre de corporativo es obligatorio",
                })}
              />
              <FieldError
                errors={errors.corporateName ? [errors.corporateName] : undefined}
              />
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="commerce-business-name">
                Nombre de comercio
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="commerce-business-name"
                type="text"
                placeholder="Nombre del comercio"
                aria-invalid={Boolean(errors.businessName)}
                aria-required
                {...register("businessName", {
                  required: "El nombre de comercio es obligatorio",
                })}
              />
              <FieldError
                errors={errors.businessName ? [errors.businessName] : undefined}
              />
            </Field>
          </FieldGroup>
        )}

        <FieldGroup className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field className="grid gap-2">
            <FieldLabel htmlFor="commerce-mcc">
              MCC<span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="commerce-mcc"
              type="text"
              placeholder="Ej. 5411"
              aria-invalid={Boolean(errors.mcc)}
              aria-required
              {...register("mcc", {
                required: "El MCC es obligatorio",
              })}
              disabled={isReadOnly}
            />
            <FieldError errors={errors.mcc ? [errors.mcc] : undefined} />
          </Field>
          <Field className="grid gap-2">
            <FieldLabel htmlFor="commerce-giro">Giro comercial</FieldLabel>
            <Input
              id="commerce-giro"
              type="text"
              placeholder="Giro comercial"
              aria-invalid={Boolean(errors.commercialLine)}
              {...register("commercialLine")}
              disabled={isReadOnly}
            />
            <FieldError
              errors={errors.commercialLine ? [errors.commercialLine] : undefined}
            />
          </Field>
        </FieldGroup>

        {!isReadOnly && (
          <FieldGroup className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Field className="grid gap-2 md:col-span-1">
              <FieldLabel>Status</FieldLabel>
              <div className="flex items-center gap-2">
                <Switch
                  checked={status === "Activo"}
                  onCheckedChange={(checked) =>
                    setValue("status", checked ? "Activo" : "Inactivo")
                  }
                  className="data-[state=checked]:bg-[var(--success-dark)] data-[state=unchecked]:bg-[var(--error-dark)]"
                />
                <span className="text-sm text-muted-foreground">
                  {status === "Activo" ? "Activo" : "Inactivo"}
                </span>
              </div>
            </Field>
          </FieldGroup>
        )}

      </form>

      <section
        className="mt-8 space-y-3"
        aria-labelledby="commerce-affiliations-heading"
      >
        <h3
          id="commerce-affiliations-heading"
          className="text-sm font-semibold text-foreground"
        >
          Afiliaciones
        </h3>
        <DataTable
          columns={commerceAffiliationsColumns}
          data={affiliations}
          pagination={false}
          getRowId={(row) =>
            `${row.idMembership ?? ""}-${row.membershipNumber ?? ""}-${row.processor ?? ""}`
          }
        />
      </section>
    </>
  );
};
