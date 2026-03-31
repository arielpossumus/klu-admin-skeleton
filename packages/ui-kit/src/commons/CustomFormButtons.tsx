import type { LucideIcon } from "lucide-react";
import { Pencil, PenOff, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export type CustomFormButtonsProps = {
  /** true = formulario en solo lectura, se muestra solo "Editar"; false = modo edición, se muestran "Cancelar" y "Guardar" */
  isReadOnly: boolean;
  /** Se invoca al hacer clic en Editar, Guardar o Cancelar (el padre debe alternar el estado de edición). */
  onToggle: () => void;
  /** Nombre de la acción a mostrar en el botón principal en modo solo lectura. */
  actionName?: string;
  /** Icono del botón principal en modo solo lectura (por defecto lápiz). */
  readOnlyIcon?: LucideIcon;
};

export const CustomFormButtons = ({
  isReadOnly,
  onToggle,
  actionName = "Editar",
  readOnlyIcon: ReadOnlyIcon = Pencil,
}: CustomFormButtonsProps) => {
  return (
    <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="col-span-full flex justify-end gap-2">
        {!isReadOnly && (
          <Button
            type="button"
            onClick={onToggle}
            className="group flex h-10 w-10 overflow-hidden bg-[var(--error-dark)] p-0 text-white transition-[width] duration-200 ease-out hover:w-28 hover:bg-[var(--error-dark)]/90"
          >
            <span className="flex min-w-0 w-full items-center justify-center gap-2 pr-2 transition-[justify-content] duration-200 ease-out group-hover:justify-end group-hover:pr-3">
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-200 ease-out group-hover:max-w-20 group-hover:opacity-100 group-hover:mr-2">
                Cancelar
              </span>
              <PenOff className="size-4 shrink-0" aria-hidden />
            </span>
          </Button>
        )}
        <Button
          type={isReadOnly ? "button" : "submit"}
          onClick={
            isReadOnly
              ? (e) => {
                e.preventDefault();
                onToggle();
              }
              : undefined
          }
          className={cn(
            "btn-form-action group flex h-10 w-10 overflow-hidden p-0 transition-[width] duration-200 ease-out hover:w-28"
          )}
        >
          <span className="flex min-w-0 w-full items-center justify-center gap-2 pr-2 transition-[justify-content] duration-200 ease-out group-hover:justify-end group-hover:pr-3">
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-200 ease-out group-hover:max-w-20 group-hover:opacity-100 group-hover:mr-2">
              {isReadOnly ? actionName : "Guardar"}
            </span>
            {isReadOnly ? (
              <ReadOnlyIcon className="size-4 shrink-0" aria-hidden />
            ) : (
              <Save className="size-4 shrink-0" aria-hidden />
            )}
          </span>
        </Button>
      </div>
    </FieldGroup>
  );
};
