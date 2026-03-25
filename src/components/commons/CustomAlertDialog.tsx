import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type CustomAlertDialogProps = {
    title: string;
    description: string;
    /** Se ejecuta al hacer clic en Confirmar. Puede ser síncrona o asíncrona. */
    onConfirm: () => void | Promise<void>;
    /** Elemento que abre el diálogo (botón, enlace, etc.). Debe aceptar ref y onClick. Si es un Link, usar onClick={(e) => e.preventDefault()} para no navegar. */
    children: ReactNode;
};

export const CustomAlertDialog = ({ title, description, onConfirm, children }: CustomAlertDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col items-center rounded-2xl border-0 shadow-xl sm:max-w-md text-center">
                <AlertDialogHeader className="flex flex-col items-center justify-center gap-4 text-center w-full">
                    <TriangleAlert
                        className="size-10 shrink-0 text-[var(--warning-dark)]"
                        strokeWidth={2}
                        aria-hidden
                    />
                    <div className="grid gap-1.5 place-items-center w-full">
                        <AlertDialogTitle className="text-2xl font-semibold tracking-tight mb-12">
                            {title}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
                            {description}
                        </AlertDialogDescription>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center gap-2 sm:gap-2 w-full mt-12">
                    <AlertDialogCancel className="cursor-pointer !bg-[var(--error-dark)] !text-white hover:!bg-[var(--error-dark)]/90 rounded-lg">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="cursor-pointer !bg-[var(--color-success-dark)] !text-white hover:!bg-[var(--accent)]/90 rounded-lg"
                        onClick={onConfirm}
                    >
                        Confirmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
