import { BadgeX } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";


export const CustomAlertDialog = ({ title, description }: { title: string, description: string; }) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    type="button"
                    className="cursor-pointer text-[var(--error-dark)] hover:opacity-80"
                    aria-label="Cancelar acción"
                >
                    <BadgeX className="size-4" />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer !bg-[var(--error-dark)] !text-white hover:!bg-[var(--error-dark)]/90">Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer !bg-[var(--accent)] !text-white hover:!bg-[var(--accent)]/90">Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};