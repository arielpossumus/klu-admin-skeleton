export interface CustomCollapsibleCardProps {
    title: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Fondo (y opcionalmente borde) de la tarjeta. Si solo pasás `bg-*`, se añade un borde del mismo token cuando sea primary/gray. */
    cardBackgroundClassName?: string;
}