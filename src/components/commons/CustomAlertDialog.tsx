import { BadgeX, TriangleAlert } from "lucide-react";
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

type CustomAlertDialogProps = {
    title: string;
    description: string;
};

export const CustomAlertDialog = ({ title, description }: CustomAlertDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    type="button"
                    className="cursor-pointer text-[var(--error-dark)] hover:opacity-80 transition-opacity"
                    aria-label="Cancelar acción"
                >
                    <BadgeX className="size-4" />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl border-0 shadow-xl sm:max-w-md">
                <AlertDialogHeader className="flex flex-col items-center justify-center gap-4 text-center">
                    <TriangleAlert
                        className="size-10 shrink-0 text-[var(--warning-dark)]"
                        strokeWidth={2}
                        aria-hidden
                    />
                    <div className="grid gap-1.5">
                        <AlertDialogTitle className="text-lg font-semibold tracking-tight">
                            {title}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
                            {description}
                        </AlertDialogDescription>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2 sm:gap-2">
                    <AlertDialogCancel className="cursor-pointer !bg-[var(--error-dark)] !text-white hover:!bg-[var(--error-dark)]/90 rounded-lg">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer !bg-[var(--accent)] !text-white hover:!bg-[var(--accent)]/90 rounded-lg">
                        Confirmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};