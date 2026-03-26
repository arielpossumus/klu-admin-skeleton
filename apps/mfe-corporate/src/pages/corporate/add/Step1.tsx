import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { DropdownWithSearch, type DropdownWithSearchOption } from "@/components/ui/dropdown-with-search";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { fiidService } from "@/services/annex/fiidService";
import { rsaService } from "@/services/annex/rsaService";
import { corporateModelsService } from "@/services/annex/corporateModelsService";
import type { AddCorporateFormValues } from "@/types/corporate/addCorporate";
import { moreThan4CharactersValidation } from "@/lib/validation";

const ACCEPT_IMAGES = "image/png,image/jpeg,.png,.jpg";

export function Step1() {
    const form = useFormContext<AddCorporateFormValues>();

    const { data: fiidList = [] } = useQuery({
        queryKey: ["fiid-list"],
        queryFn: async () => {
            try {
                return await fiidService.getAll();
            } catch {
                return [];
            }
        },
        placeholderData: [],
    });
    const { data: rsaList = [] } = useQuery({
        queryKey: ["rsa-list"],
        queryFn: async () => {
            try {
                return await rsaService.getAll();
            } catch {
                return [];
            }
        },
        placeholderData: [],
    });
    const { data: corporatesModelList = [] } = useQuery({
        queryKey: ["corporates-model-list"],
        queryFn: async () => {
            try {
                return await corporateModelsService.getAll();
            } catch {
                return [];
            }
        },
        placeholderData: [],
    });

    const fiidOptions: DropdownWithSearchOption[] = useMemo(
        () => (Array.isArray(fiidList) ? fiidList : []).map((item) => ({ value: String(item.id), label: item.value })),
        [fiidList]
    );
    const rsaOptions: DropdownWithSearchOption[] = useMemo(
        () => (Array.isArray(rsaList) ? rsaList : []).map((item) => ({ value: String(item.id), label: item.value })),
        [rsaList]
    );
    const modeloOptions: DropdownWithSearchOption[] = useMemo(
        () =>
            (Array.isArray(corporatesModelList) ? corporatesModelList : []).map((item) => ({
                value: String(item.typeId),
                label: item.typeModel,
            })),
        [corporatesModelList]
    );

    return (
        <FieldGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <Field className="grid gap-2">
                <FieldLabel htmlFor="general.nombreCorporativo">
                    Nombre del corporativo <span className="text-destructive">*</span>
                </FieldLabel>
                <FieldContent>
                    <Input
                        id="general.nombreCorporativo"
                        placeholder="Ingrese el nombre del corporativo"
                        aria-required
                        aria-invalid={Boolean(form.formState.errors.general?.nombreCorporativo)}
                        {...form.register("general.nombreCorporativo", {
                            required: "El nombre del corporativo es obligatorio",
                            ...moreThan4CharactersValidation,
                        })}
                    />
                    <FieldError errors={[form.formState.errors.general?.nombreCorporativo]} />
                </FieldContent>
            </Field>

            <Field className="grid gap-2">
                <FieldLabel>
                    FIID <span className="text-destructive">*</span>
                </FieldLabel>
                <FieldContent>
                    <Controller
                        control={form.control}
                        name="general.fiid"
                        rules={{ required: "FIID es obligatorio" }}
                        render={({ field, fieldState }) => (
                            <>
                                <DropdownWithSearch
                                    options={fiidOptions}
                                    value={field.value ?? ""}
                                    onValueChange={field.onChange}
                                    placeholder="Seleccione FIID"
                                    id="general.fiid"
                                />
                                <FieldError errors={[fieldState.error]} />
                            </>
                        )}
                    />
                </FieldContent>
            </Field>

            <Field className="grid gap-2">
                <FieldLabel>
                    RSA <span className="text-destructive">*</span>
                </FieldLabel>
                <FieldContent>
                    <Controller
                        control={form.control}
                        name="general.rsa"
                        rules={{ required: "RSA es obligatorio" }}
                        render={({ field, fieldState }) => (
                            <>
                                <DropdownWithSearch
                                    options={rsaOptions}
                                    value={field.value ?? ""}
                                    onValueChange={field.onChange}
                                    placeholder="Seleccione RSA"
                                    id="general.rsa"
                                />
                                <FieldError errors={[fieldState.error]} />
                            </>
                        )}
                    />
                </FieldContent>
            </Field>

            <Field className="grid gap-2">
                <FieldLabel htmlFor="general.logoTicket">Logo Ticket</FieldLabel>
                <FieldContent>
                    <Controller
                        control={form.control}
                        name="general.logoTicket"
                        rules={{
                            validate: (v) => {
                                if (!v?.length) return true;
                                const file = v[0];
                                const ok = file.type === "image/png" || file.type === "image/jpeg";
                                return ok || "Solo se permiten archivos PNG o JPG";
                            },
                        }}
                        render={({ field: { onChange, onBlur, ref }, fieldState }) => (
                            <>
                                <Input
                                    ref={ref}
                                    id="general.logoTicket"
                                    type="file"
                                    accept={ACCEPT_IMAGES}
                                    aria-invalid={fieldState.invalid}
                                    onChange={(e) => onChange(e.target.files)}
                                    onBlur={onBlur}
                                />
                                <FieldError errors={[fieldState.error]} />
                            </>
                        )}
                    />
                </FieldContent>
            </Field>

            <Field className="grid gap-2">
                <FieldLabel htmlFor="general.logoInicio">Logo inicio</FieldLabel>
                <FieldContent>
                    <Controller
                        control={form.control}
                        name="general.logoInicio"
                        rules={{
                            validate: (v) => {
                                if (!v?.length) return true;
                                const file = v[0];
                                const ok = file.type === "image/png" || file.type === "image/jpeg";
                                return ok || "Solo se permiten archivos PNG o JPG";
                            },
                        }}
                        render={({ field: { onChange, onBlur, ref }, fieldState }) => (
                            <>
                                <Input
                                    ref={ref}
                                    id="general.logoInicio"
                                    type="file"
                                    accept={ACCEPT_IMAGES}
                                    aria-invalid={fieldState.invalid}
                                    onChange={(e) => onChange(e.target.files)}
                                    onBlur={onBlur}
                                />
                                <FieldError errors={[fieldState.error]} />
                            </>
                        )}
                    />
                </FieldContent>
            </Field>

            <Field className="grid gap-2">
                <FieldLabel>
                    Modelo corporativo <span className="text-destructive">*</span>
                </FieldLabel>
                <FieldContent>
                    <Controller
                        control={form.control}
                        name="general.modeloCorporativo"
                        rules={{ required: "El modelo corporativo es obligatorio" }}
                        render={({ field, fieldState }) => (
                            <>
                                <DropdownWithSearch
                                    options={modeloOptions}
                                    value={field.value ?? ""}
                                    onValueChange={field.onChange}
                                    placeholder="Seleccione modelo corporativo"
                                    id="general.modeloCorporativo"
                                />
                                <FieldError errors={[fieldState.error]} />
                            </>
                        )}
                    />
                </FieldContent>
            </Field>
        </FieldGroup>
    );
}
