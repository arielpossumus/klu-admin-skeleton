"use client";

import { Pencil, PenOff, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export type CustomFormButtonsProps = {
    /** true = formulario en solo lectura, se muestra solo "Editar"; false = modo edición, se muestran "Cancelar" y "Guardar" */
    isReadOnly: boolean;
    /** Se invoca al hacer clic en Editar, Guardar o Cancelar (el padre debe alternar el estado de edición). */
    onToggle: () => void;
};

export function CustomFormButtons({ isReadOnly, onToggle }: CustomFormButtonsProps) {
    return (
        <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-full flex justify-end gap-2">
                {!isReadOnly && (
                    <Button
                        type="button"
                        onClick={onToggle}
                        className="group flex overflow-hidden w-10 h-10 p-0 hover:w-28 transition-[width] duration-200 ease-out bg-[var(--error-dark)] text-white hover:bg-[var(--error-dark)]/90"
                    >
                        <span className="flex items-center justify-center group-hover:justify-end gap-2 w-full min-w-0 pr-2 group-hover:pr-3 transition-[justify-content] duration-200 ease-out">
                            <span className="max-w-0 overflow-hidden opacity-0 whitespace-nowrap group-hover:max-w-20 group-hover:opacity-100 group-hover:mr-2 transition-[max-width,opacity,margin] duration-200 ease-out">
                                Cancelar
                            </span>
                            <PenOff className="size-4 shrink-0" aria-hidden />
                        </span>
                    </Button>
                )}
                <Button
                    type={isReadOnly ? "button" : "submit"}
                    onClick={isReadOnly ? (e) => { e.preventDefault(); onToggle(); } : undefined}
                    className={cn(
                        "btn-form-action group flex h-10 w-10 overflow-hidden p-0 transition-[width] duration-200 ease-out hover:w-28"
                    )}
                >
                    <span className="flex items-center justify-center group-hover:justify-end gap-2 w-full min-w-0 pr-2 group-hover:pr-3 transition-[justify-content] duration-200 ease-out">
                        <span className="max-w-0 overflow-hidden opacity-0 whitespace-nowrap group-hover:max-w-20 group-hover:opacity-100 group-hover:mr-2 transition-[max-width,opacity,margin] duration-200 ease-out">
                            {isReadOnly ? "Editar" : "Guardar"}
                        </span>
                        {isReadOnly ? <Pencil className="size-4 shrink-0" aria-hidden /> : <Save className="size-4 shrink-0" aria-hidden />}
                    </span>
                </Button>
            </div>
        </FieldGroup>
    );
}
