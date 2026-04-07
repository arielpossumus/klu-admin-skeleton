"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { CustomFormButtons } from "@/components/commons/CustomFormButtons";
import { WeekDaysButtonGroup } from "@/components/commons/WeekDaysButtonGroup";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ParagraphH2 from "@/components/text/ParagraphH2";
import type { CommerceCommercialModel } from "@/types/commerce/CommerceList";

const defaultCommercialModelFields = (): CommerceCommercialModel => ({
  name: "",
  lastName: "",
  maternalLastName: "",
  email: "",
  phone: "",
  ext: "",
  phone2: "",
  ext2: "",
  days: [],
  startHour: "",
  endHour: "",
  monthlyRent: "",
  averageTicket: "",
  cancellationDays: 0,
  minimumMonthlyAmount: "",
  equipmentRent: "",
  penalty: "",
  settlementPeriod: "",
  affiliation: "",
  processor: "",
  credit: "",
  debit: "",
  creditInt: "",
  debitInt: "",
});

export type CommerceCommercialModelFormValues = {
  commercialModel: CommerceCommercialModel;
};

export type CommerceComercialModelDataProps = {
  commercialModel?: CommerceCommercialModel;
};

const buildDefaults = (
  data?: CommerceCommercialModel
): CommerceCommercialModelFormValues => ({
  commercialModel: {
    ...defaultCommercialModelFields(),
    ...data,
    days: data?.days ?? [],
    cancellationDays: data?.cancellationDays ?? 0,
  },
});

export const CommerceComercialModelData = ({
  commercialModel,
}: CommerceComercialModelDataProps) => {
  const [disabledField, setDisabledField] = useState(true);

  const resolvedDefaults = useMemo(
    () => buildDefaults(commercialModel),
    [commercialModel]
  );

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CommerceCommercialModelFormValues>({
    defaultValues: resolvedDefaults,
  });

  useEffect(() => {
    reset(resolvedDefaults);
  }, [resolvedDefaults, reset]);

  const handleDisabledField = useCallback(() => {
    setDisabledField((prev) => !prev);
  }, []);

  const handleFormSubmit = useCallback((data: CommerceCommercialModelFormValues) => {
    console.log("Formulario modelo comercial:", data);
    setDisabledField(true);
  }, []);

  const days = (watch("commercialModel.days") ?? []) as string[];
  const err = errors.commercialModel;

  return (
    <div
      aria-label={
        commercialModel
          ? "Modelo comercial del comercio"
          : "Sin datos de modelo comercial"
      }
      className="flex flex-col gap-8"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="contents">
        <CustomFormButtons isReadOnly={disabledField} onToggle={handleDisabledField} />

        <FieldGroup className="mb-4 grid grid-cols-1 gap-4 px-0">
          <ParagraphH2 text="Datos de contacto" />
        </FieldGroup>
        <FieldGroup className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-name">Nombre</FieldLabel>
            <Input
              id="cm-name"
              type="text"
              placeholder="Nombre"
              aria-invalid={Boolean(err?.name)}
              {...register("commercialModel.name")}
              disabled={disabledField}
            />
            <FieldError errors={err?.name ? [err.name] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-lastName">Apellido paterno</FieldLabel>
            <Input
              id="cm-lastName"
              type="text"
              placeholder="Apellido paterno"
              aria-invalid={Boolean(err?.lastName)}
              {...register("commercialModel.lastName")}
              disabled={disabledField}
            />
            <FieldError errors={err?.lastName ? [err.lastName] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-maternalLastName">Apellido materno</FieldLabel>
            <Input
              id="cm-maternalLastName"
              type="text"
              placeholder="Apellido materno"
              aria-invalid={Boolean(err?.maternalLastName)}
              {...register("commercialModel.maternalLastName")}
              disabled={disabledField}
            />
            <FieldError
              errors={err?.maternalLastName ? [err.maternalLastName] : undefined}
            />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-email">Correo electrónico</FieldLabel>
            <Input
              id="cm-email"
              type="email"
              placeholder="Correo electrónico"
              aria-invalid={Boolean(err?.email)}
              {...register("commercialModel.email")}
              disabled={disabledField}
            />
            <FieldError errors={err?.email ? [err.email] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-phone">Teléfono</FieldLabel>
            <Input
              id="cm-phone"
              type="text"
              placeholder="Teléfono"
              aria-invalid={Boolean(err?.phone)}
              {...register("commercialModel.phone")}
              disabled={disabledField}
            />
            <FieldError errors={err?.phone ? [err.phone] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-ext">Extensión</FieldLabel>
            <Input
              id="cm-ext"
              type="text"
              placeholder="Ext."
              aria-invalid={Boolean(err?.ext)}
              {...register("commercialModel.ext")}
              disabled={disabledField}
            />
            <FieldError errors={err?.ext ? [err.ext] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-phone2">Teléfono opcional</FieldLabel>
            <Input
              id="cm-phone2"
              type="text"
              placeholder="Teléfono opcional"
              aria-invalid={Boolean(err?.phone2)}
              {...register("commercialModel.phone2")}
              disabled={disabledField}
            />
            <FieldError errors={err?.phone2 ? [err.phone2] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-ext2">Ext. opcional</FieldLabel>
            <Input
              id="cm-ext2"
              type="text"
              placeholder="Ext. opcional"
              aria-invalid={Boolean(err?.ext2)}
              {...register("commercialModel.ext2")}
              disabled={disabledField}
            />
            <FieldError errors={err?.ext2 ? [err.ext2] : undefined} />
          </Field>
          <Field className="grid gap-2 md:col-span-2">
            <FieldLabel>Días de atención</FieldLabel>
            <WeekDaysButtonGroup
              value={days}
              onValueChange={(next) => setValue("commercialModel.days", next)}
              disabled={disabledField}
              className="flex-wrap"
            />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-startHour">Hora de inicio</FieldLabel>
            <Input
              id="cm-startHour"
              type="time"
              aria-invalid={Boolean(err?.startHour)}
              {...register("commercialModel.startHour")}
              disabled={disabledField}
              className="h-9"
            />
            <FieldError errors={err?.startHour ? [err.startHour] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-endHour">Hora de fin</FieldLabel>
            <Input
              id="cm-endHour"
              type="time"
              aria-invalid={Boolean(err?.endHour)}
              {...register("commercialModel.endHour")}
              disabled={disabledField}
              className="h-9"
            />
            <FieldError errors={err?.endHour ? [err.endHour] : undefined} />
          </Field>
        </FieldGroup>

        <FieldGroup className="mb-4 grid grid-cols-1 gap-4 px-0">
          <ParagraphH2 text="Condiciones comerciales" />
        </FieldGroup>
        <FieldGroup className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-monthlyRent">Renta mensual</FieldLabel>
            <Input
              id="cm-monthlyRent"
              type="text"
              placeholder="Renta mensual"
              aria-invalid={Boolean(err?.monthlyRent)}
              {...register("commercialModel.monthlyRent")}
              disabled={disabledField}
            />
            <FieldError errors={err?.monthlyRent ? [err.monthlyRent] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-averageTicket">Ticket promedio</FieldLabel>
            <Input
              id="cm-averageTicket"
              type="text"
              placeholder="Ticket promedio"
              aria-invalid={Boolean(err?.averageTicket)}
              {...register("commercialModel.averageTicket")}
              disabled={disabledField}
            />
            <FieldError errors={err?.averageTicket ? [err.averageTicket] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-cancellationDays">Días de cancelación</FieldLabel>
            <Input
              id="cm-cancellationDays"
              type="number"
              min={0}
              step={1}
              aria-invalid={Boolean(err?.cancellationDays)}
              {...register("commercialModel.cancellationDays", { valueAsNumber: true })}
              disabled={disabledField}
            />
            <FieldError
              errors={err?.cancellationDays ? [err.cancellationDays] : undefined}
            />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-minimumMonthlyAmount">Monto mínimo mensual</FieldLabel>
            <Input
              id="cm-minimumMonthlyAmount"
              type="text"
              placeholder="Monto mínimo mensual"
              aria-invalid={Boolean(err?.minimumMonthlyAmount)}
              {...register("commercialModel.minimumMonthlyAmount")}
              disabled={disabledField}
            />
            <FieldError
              errors={err?.minimumMonthlyAmount ? [err.minimumMonthlyAmount] : undefined}
            />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-equipmentRent">Renta de equipo</FieldLabel>
            <Input
              id="cm-equipmentRent"
              type="text"
              placeholder="Renta de equipo"
              aria-invalid={Boolean(err?.equipmentRent)}
              {...register("commercialModel.equipmentRent")}
              disabled={disabledField}
            />
            <FieldError errors={err?.equipmentRent ? [err.equipmentRent] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-penalty">Penalización</FieldLabel>
            <Input
              id="cm-penalty"
              type="text"
              placeholder="Penalización"
              aria-invalid={Boolean(err?.penalty)}
              {...register("commercialModel.penalty")}
              disabled={disabledField}
            />
            <FieldError errors={err?.penalty ? [err.penalty] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2 md:col-span-2">
            <FieldLabel htmlFor="cm-settlementPeriod">Periodo de liquidación</FieldLabel>
            <Input
              id="cm-settlementPeriod"
              type="text"
              placeholder="Periodo de liquidación"
              aria-invalid={Boolean(err?.settlementPeriod)}
              {...register("commercialModel.settlementPeriod")}
              disabled={disabledField}
            />
            <FieldError
              errors={err?.settlementPeriod ? [err.settlementPeriod] : undefined}
            />
          </Field>
        </FieldGroup>

        <FieldGroup className="mb-4 grid grid-cols-1 gap-4 px-0">
          <ParagraphH2 text="Afiliación y tasas" />
        </FieldGroup>
        <FieldGroup className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-affiliation">Afiliación</FieldLabel>
            <Input
              id="cm-affiliation"
              type="text"
              placeholder="Afiliación"
              aria-invalid={Boolean(err?.affiliation)}
              {...register("commercialModel.affiliation")}
              disabled={disabledField}
            />
            <FieldError errors={err?.affiliation ? [err.affiliation] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2 md:col-span-2">
            <FieldLabel htmlFor="cm-processor">Procesador</FieldLabel>
            <Input
              id="cm-processor"
              type="text"
              placeholder="Procesador"
              aria-invalid={Boolean(err?.processor)}
              {...register("commercialModel.processor")}
              disabled={disabledField}
            />
            <FieldError errors={err?.processor ? [err.processor] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-credit">Crédito</FieldLabel>
            <Input
              id="cm-credit"
              type="text"
              placeholder="Crédito"
              aria-invalid={Boolean(err?.credit)}
              {...register("commercialModel.credit")}
              disabled={disabledField}
            />
            <FieldError errors={err?.credit ? [err.credit] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-debit">Débito</FieldLabel>
            <Input
              id="cm-debit"
              type="text"
              placeholder="Débito"
              aria-invalid={Boolean(err?.debit)}
              {...register("commercialModel.debit")}
              disabled={disabledField}
            />
            <FieldError errors={err?.debit ? [err.debit] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-creditInt">Crédito int.</FieldLabel>
            <Input
              id="cm-creditInt"
              type="text"
              placeholder="Crédito internacional"
              aria-invalid={Boolean(err?.creditInt)}
              {...register("commercialModel.creditInt")}
              disabled={disabledField}
            />
            <FieldError errors={err?.creditInt ? [err.creditInt] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor="cm-debitInt">Débito int.</FieldLabel>
            <Input
              id="cm-debitInt"
              type="text"
              placeholder="Débito internacional"
              aria-invalid={Boolean(err?.debitInt)}
              {...register("commercialModel.debitInt")}
              disabled={disabledField}
            />
            <FieldError errors={err?.debitInt ? [err.debitInt] : undefined} />
          </Field>
        </FieldGroup>

        <FieldGroup className="grid grid-cols-1 gap-4 px-0 mt-4 mb-4">
          <CustomFormButtons isReadOnly={disabledField} onToggle={handleDisabledField} />
        </FieldGroup>
      </form>
    </div>
  );
};
