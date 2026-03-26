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
  onConfirm: () => void | Promise<void>;
  children: ReactNode;
};

export const CustomAlertDialog = ({ title, description, onConfirm, children }: CustomAlertDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col items-center rounded-2xl border-0 shadow-xl sm:max-w-md text-center">
        <AlertDialogHeader className="flex w-full flex-col items-center justify-center gap-4 text-center">
          <TriangleAlert
            className="size-10 shrink-0 text-[var(--warning-dark)]"
            strokeWidth={2}
            aria-hidden
          />
          <div className="grid w-full place-items-center gap-1.5">
            <AlertDialogTitle className="mb-12 text-2xl font-semibold tracking-tight">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-12 flex w-full justify-center gap-2 sm:gap-2">
          <AlertDialogCancel className="cursor-pointer !rounded-lg !bg-[var(--error-dark)] !text-white hover:!bg-[var(--error-dark)]/90">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer !rounded-lg !bg-[var(--color-success-dark)] !text-white hover:!bg-[var(--accent)]/90"
            onClick={onConfirm}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
