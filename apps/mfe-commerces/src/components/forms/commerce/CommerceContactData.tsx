"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { CustomFormButtons } from "@/components/commons/CustomFormButtons";
import { WeekDaysButtonGroup } from "@/components/commons/WeekDaysButtonGroup";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { CommerceContactData as CommerceContactDataModel } from "@/types/commerce/CommerceList";
import ParagraphH2 from "@/components/text/ParagraphH2";

type ContactBlock = {
  name: string;
  lastName: string;
  maternalLastName: string;
  email: string;
  phone: string;
  ext: string;
  phone2: string;
  ext2: string;
  days: string[];
  startHour: string;
  endHour: string;
};

const defaultContactBlock: ContactBlock = {
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
};

export type CommerceContactFormValues = {
  contactData: {
    commercialContact: ContactBlock;
    technicalContact: ContactBlock;
    financialContact: ContactBlock;
  };
};

export type CommerceContactDataProps = {
  contactData?: CommerceContactDataModel;
};

type ContactSectionKey = keyof CommerceContactFormValues["contactData"];

export const CommerceContactData = ({
  contactData,
}: CommerceContactDataProps) => {
  const [disabledField, setDisabledField] = useState(true);

  const resolvedDefaults = useMemo((): CommerceContactFormValues => {
    const cd = contactData;
    return {
      contactData: {
        commercialContact: {
          ...defaultContactBlock,
          ...cd?.commercialContact,
          days: cd?.commercialContact?.days ?? [],
        },
        technicalContact: {
          ...defaultContactBlock,
          ...cd?.technicalContact,
          days: cd?.technicalContact?.days ?? [],
        },
        financialContact: {
          ...defaultContactBlock,
          ...cd?.financialContact,
          days: cd?.financialContact?.days ?? [],
        },
      },
    };
  }, [contactData]);

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CommerceContactFormValues>({
    defaultValues: resolvedDefaults,
  });

  useEffect(() => {
    reset(resolvedDefaults);
  }, [resolvedDefaults, reset]);

  const handleDisabledField = useCallback(() => {
    setDisabledField((prev) => !prev);
  }, []);

  const handleFormSubmit = useCallback((data: CommerceContactFormValues) => {
    console.log("Formulario contactos comercio:", data);
    setDisabledField(true);
  }, []);

  const renderContactSection = (section: ContactSectionKey, title: string) => {
    const base = `contactData.${section}` as const;
    const days = (watch(`${base}.days`) ?? []) as string[];
    const err = (
      errors.contactData as
        | Record<
            ContactSectionKey,
            Partial<
              Record<keyof ContactBlock, { message?: string } | undefined>
            >
          >
        | undefined
    )?.[section];

    return (
      <>
        <FieldGroup className="mb-4 grid grid-cols-1 gap-4 px-0">
          <ParagraphH2 text={title} />
        </FieldGroup>
        <FieldGroup className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor={`${section}-name`}>Nombre</FieldLabel>
            <Input
              id={`${section}-name`}
              type="text"
              placeholder="Nombre"
              aria-invalid={Boolean(err?.name)}
              {...register(`${base}.name`)}
              disabled={disabledField}
            />
            <FieldError errors={err?.name ? [err.name] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor={`${section}-lastName`}>
              Apellido Paterno
            </FieldLabel>
            <Input
              id={`${section}-lastName`}
              type="text"
              placeholder="Apellido paterno"
              aria-invalid={Boolean(err?.lastName)}
              {...register(`${base}.lastName`)}
              disabled={disabledField}
            />
            <FieldError errors={err?.lastName ? [err.lastName] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor={`${section}-maternalLastName`}>
              Apellido Materno
            </FieldLabel>
            <Input
              id={`${section}-maternalLastName`}
              type="text"
              placeholder="Apellido materno"
              aria-invalid={Boolean(err?.maternalLastName)}
              {...register(`${base}.maternalLastName`)}
              disabled={disabledField}
            />
            <FieldError
              errors={err?.maternalLastName ? [err.maternalLastName] : undefined}
            />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor={`${section}-email`}>
              Correo electrónico
            </FieldLabel>
            <Input
              id={`${section}-email`}
              type="email"
              placeholder="Correo electrónico"
              aria-invalid={Boolean(err?.email)}
              {...register(`${base}.email`)}
              disabled={disabledField}
            />
            <FieldError errors={err?.email ? [err.email] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor={`${section}-phone`}>Teléfono</FieldLabel>
            <Input
              id={`${section}-phone`}
              type="text"
              placeholder="Teléfono"
              aria-invalid={Boolean(err?.phone)}
              {...register(`${base}.phone`)}
              disabled={disabledField}
            />
            <FieldError errors={err?.phone ? [err.phone] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor={`${section}-ext`}>Extensión</FieldLabel>
            <Input
              id={`${section}-ext`}
              type="text"
              placeholder="Ext."
              aria-invalid={Boolean(err?.ext)}
              {...register(`${base}.ext`)}
              disabled={disabledField}
            />
            <FieldError errors={err?.ext ? [err.ext] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor={`${section}-phone2`}>
              Teléfono opcional
            </FieldLabel>
            <Input
              id={`${section}-phone2`}
              type="text"
              placeholder="Teléfono opcional"
              aria-invalid={Boolean(err?.phone2)}
              {...register(`${base}.phone2`)}
              disabled={disabledField}
            />
            <FieldError errors={err?.phone2 ? [err.phone2] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor={`${section}-ext2`}>Ext. opcional</FieldLabel>
            <Input
              id={`${section}-ext2`}
              type="text"
              placeholder="Ext. opcional"
              aria-invalid={Boolean(err?.ext2)}
              {...register(`${base}.ext2`)}
              disabled={disabledField}
            />
            <FieldError errors={err?.ext2 ? [err.ext2] : undefined} />
          </Field>
          <Field className="grid gap-2 md:col-span-2">
            <FieldLabel>Días de atención</FieldLabel>
            <WeekDaysButtonGroup
              value={days}
              onValueChange={(next) =>
                setValue(`contactData.${section}.days`, next)
              }
              disabled={disabledField}
              className="flex-wrap"
            />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor={`${section}-startHour`}>
              Hora de inicio
            </FieldLabel>
            <Input
              id={`${section}-startHour`}
              type="time"
              aria-invalid={Boolean(err?.startHour)}
              {...register(`${base}.startHour`)}
              disabled={disabledField}
              className="h-9"
            />
            <FieldError errors={err?.startHour ? [err.startHour] : undefined} />
          </Field>
          <Field className="mb-4 grid gap-2">
            <FieldLabel htmlFor={`${section}-endHour`}>Hora de fin</FieldLabel>
            <Input
              id={`${section}-endHour`}
              type="time"
              aria-invalid={Boolean(err?.endHour)}
              {...register(`${base}.endHour`)}
              disabled={disabledField}
              className="h-9"
            />
            <FieldError errors={err?.endHour ? [err.endHour] : undefined} />
          </Field>
        </FieldGroup>
      </>
    );
  };

  return (
    <div
      aria-label={
        contactData ? "Datos de contacto del comercio" : "Sin datos de contacto"
      }
      className="flex flex-col gap-8"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="contents">
        <CustomFormButtons
          isReadOnly={disabledField}
          onToggle={handleDisabledField}
        />
        {renderContactSection("commercialContact", "Contacto comercial")}
        {renderContactSection("technicalContact", "Contacto técnico")}
        {renderContactSection("financialContact", "Contacto financiero")}

        <CustomFormButtons
          isReadOnly={disabledField}
          onToggle={handleDisabledField}
        />
      </form>
    </div>
  );
};
