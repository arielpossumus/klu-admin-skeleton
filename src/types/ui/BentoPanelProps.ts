import type { ReactNode } from "react";

export type BentoPanelProps = {
    children: ReactNode;
    className?: string;
    title?: string;
    icon?: ReactNode;
    /** Si es `true`, muestra el botón en la cabecera (misma fila que título e ícono). Por defecto `false`. */
    showHeaderButton?: boolean;
    /** Texto del botón de cabecera (visible solo con `showHeaderButton`). */
    headerButtonLabel?: string;
    /** Acción al hacer clic en el botón de cabecera. */
    onHeaderButtonClick?: () => void;
};
