import { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CardTitle } from "@/components/ui/card";
import ParagraphH4 from "@/components/text/ParagraphH4";
import { cn } from "@/lib/utils";

const DEFAULT_CARD_SURFACE =
    "bg-[var(--color-gray)] border-[var(--color-gray)] text-[var(--color-gray-foreground)]";

/** Evita el `border-border` global (`index.css` *) cuando solo se pasa `bg-*`. */
const withBorderMatchingBackground = (surface: string): string => {
    if (surface.includes("border-")) return surface;
    if (surface.includes("bg-[var(--color-primary)]")) {
        return cn(surface, "border-[var(--color-primary)]");
    }
    if (surface.includes("bg-[var(--color-gray)]")) {
        return cn(surface, "border-[var(--color-gray)]");
    }
    return cn(surface, "border-[var(--color-primary)]");
};

interface CustomCollapsibleCardProps {
    title: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Fondo (y opcionalmente borde) de la tarjeta. Si solo pasás `bg-*`, se añade un borde del mismo token cuando sea primary/gray. */
    cardBackgroundClassName?: string;
}

export const CustomCollapsibleCard = ({
    title,
    children,
    icon,
    defaultOpen = true,
    open: controlledOpen,
    onOpenChange,
    cardBackgroundClassName,
}: CustomCollapsibleCardProps) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const handleOpenChange = (next: boolean) => {
        if (!isControlled) setInternalOpen(next);
        onOpenChange?.(next);
    };

    const surface = withBorderMatchingBackground(
        cardBackgroundClassName?.trim() ? cardBackgroundClassName : DEFAULT_CARD_SURFACE
    );

    return (
        <div
            role="region"
            className={cn(
                "flex flex-col rounded-xl border-2 border-solid shadow-none outline-none ring-0",
                "gap-0 py-0",
                "px-2 pt-4 pb-2",
                surface,
                surface.includes("bg-[var(--color-primary)]") ? "text-white" : null
            )}
        >
            <Collapsible open={open} onOpenChange={handleOpenChange}>
                <CollapsibleTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            "flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border-0 bg-transparent text-inherit shadow-none outline-none",
                            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                        )}
                        aria-expanded={open}
                        aria-label={open ? "Ocultar contenido" : "Mostrar contenido"}
                    >
                        <CardTitle className="flex items-center gap-2 text-sm font-medium text-inherit uppercase tracking-wide">
                            {icon}
                            <ParagraphH4 text={title} />
                        </CardTitle>
                        <ChevronDown
                            className={cn(
                                "size-5 shrink-0 text-inherit transition-transform",
                                open ? "rotate-0" : "-rotate-90"
                            )}
                            aria-hidden
                        />
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">{children}</CollapsibleContent>
            </Collapsible>
        </div>
    );
};
