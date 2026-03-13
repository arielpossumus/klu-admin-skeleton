import { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardTitle } from "@/components/ui/card";
import ParagraphH4 from "@/components/text/ParagraphH4";

interface CustomCollapsibleCardProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const CustomCollapsibleCard = ({
    title,
    children,
    defaultOpen = true,
    open: controlledOpen,
    onOpenChange,
}: CustomCollapsibleCardProps) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const handleOpenChange = (next: boolean) => {
        if (!isControlled) setInternalOpen(next);
        onOpenChange?.(next);
    };

    return (
        <Card className="px-2 pt-4 pb-2 bg-[var(--color-gray)] border-2 border-[var(--color-gray)] text-[var(--color-gray-foreground)]">
            <Collapsible open={open} onOpenChange={handleOpenChange}>
                <CollapsibleTrigger asChild>
                    <button
                        type="button"
                        className="flex w-full items-center justify-between gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-expanded={open}
                        aria-label={open ? "Ocultar contenido" : "Mostrar contenido"}
                    >
                        <CardTitle>
                            <ParagraphH4 text={title} />
                        </CardTitle>
                        <ChevronDown
                            className={`size-5 shrink-0 transition-transform ${open ? "" : "-rotate-90"}`}
                            aria-hidden
                        />
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent>{children}</CollapsibleContent>
            </Collapsible>
        </Card>
    );
};
