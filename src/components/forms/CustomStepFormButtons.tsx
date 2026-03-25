import { ChevronsLeft, ChevronsRight, Save } from "lucide-react";
import { Button } from "../ui/button";
import { CustomAlertDialog } from "../commons/CustomAlertDialog";
import { cn } from "@/lib/utils";

/** Extrae el tipo del `id` a partir de un array de config con propiedad `id` (ej. INTERNAL_ADD_CORPORATE_NAV). */
export type StepIdFromConfig<T extends readonly { id: string; }[]> = T[number]["id"];

export type CustomStepFormButtonsProps<T extends string = string> = {
    /** Orden de los pasos (ids). Se usa para saber primer/último paso y navegación. */
    stepIds: readonly T[];
    /** Paso actual. */
    currentStepId: T;
    /** Se llama al cambiar de paso (Volver o Siguiente). */
    onStepChange: (stepId: T) => void;
    /** Función que se ejecuta al hacer clic en el botón del último paso (ej. "Crear"). Opcional; si no se pasa, el botón usa type="submit" y dispara el submit del formulario. */
    onSubmit?: () => void;
    /** Etiqueta del botón "siguiente" en el último paso. Por defecto "Crear". */
    lastStepButtonLabel?: string;
    /** Etiqueta del botón "siguiente" en pasos intermedios. Por defecto "Siguiente". */
    nextStepButtonLabel?: string;
    /** aria-label del botón del último paso. */
    submitAriaLabel?: string;
    /** Si true, el botón "Siguiente" queda deshabilitado (solo en pasos intermedios). */
    isNextDisabled?: boolean;
    /** Descripción del diálogo de confirmación del último paso (ej. "¿Desea añadir el Corporativo X?"). */
    confirmDialogDescription?: string;
};

export function CustomStepFormButtons<T extends string = string>({
    stepIds,
    currentStepId,
    onStepChange,
    onSubmit,
    lastStepButtonLabel = "Crear",
    nextStepButtonLabel = "Siguiente",
    submitAriaLabel = "Crear corporativo",
    isNextDisabled = false,
    confirmDialogDescription,
}: CustomStepFormButtonsProps<T>) {
    const currentIndex = stepIds.indexOf(currentStepId as T);
    const isFirstTab = currentIndex <= 0;
    const isLastTab = currentIndex >= stepIds.length - 1;

    const handleVolver = () => {
        if (currentIndex > 0) onStepChange(stepIds[currentIndex - 1]);
    };

    const handleSiguiente = () => {
        if (isLastTab) {
            onSubmit?.();
        } else {
            onStepChange(stepIds[currentIndex + 1]);
        }
    };

    return (
        <div className="mt-6 flex flex-row items-center justify-between gap-4">
            <div className="min-w-[6rem]">
                {!isFirstTab && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleVolver}
                        aria-label="Volver al paso anterior"
                        className="border-[var(--color-primary-light)] text-[var(--color-primary-light)] hover:bg-[var(--color-primary-light)] hover:text-white"
                    >
                        <ChevronsLeft className="mr-2 size-4" aria-hidden />
                        Volver
                    </Button>
                )}
            </div>
            {isLastTab ? (
                <CustomAlertDialog
                    title={`¿Desea ${lastStepButtonLabel}?`}
                    description={confirmDialogDescription ?? "¿Desea continuar?"}
                    onConfirm={onSubmit ?? (() => { })}
                >
                    <Button
                        type="button"
                        aria-label={submitAriaLabel}
                        disabled={false}
                        className={cn("btn-form-action gap-2")}
                    >
                        <Save className="mr-2 size-4" aria-hidden />
                        {lastStepButtonLabel}
                    </Button>
                </CustomAlertDialog>
            ) : (
                <Button
                    type="button"
                    onClick={handleSiguiente}
                    aria-label="Siguiente paso"
                    disabled={isNextDisabled}
                    className={cn("btn-form-action gap-2")}
                >
                    {nextStepButtonLabel}
                    <ChevronsRight className="ml-2 size-4" aria-hidden />
                </Button>
            )}
        </div>
    );
}