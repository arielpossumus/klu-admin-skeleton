import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { BentoPanelProps } from "@/types/ui/BentoPanelProps";

export const BentoPanel = ({
    children,
    className,
    title,
    icon,
    showHeaderButton = false,
    headerButtonLabel,
    onHeaderButtonClick,
}: BentoPanelProps) => {
    const hasHeaderButton = showHeaderButton && headerButtonLabel != null && headerButtonLabel !== "";
    const showHeaderRow = Boolean(title || icon || hasHeaderButton);

    const handleHeaderButtonClick = () => {
        onHeaderButtonClick?.();
    };

    return (
        <div
            className={cn(
                "flex flex-col rounded-3xl border border-white/10 bg-[#0a3530]/90 p-5",
                className
            )}
        >
            {showHeaderRow ? (
                <div className="mb-4 flex w-full min-w-0 items-center gap-2 text-sm font-semibold tracking-tight text-white/90">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                        {icon ? <span className="shrink-0 text-amber-400">{icon}</span> : null}
                        {title ? <span className="min-w-0 truncate">{title}</span> : null}
                    </div>
                    {hasHeaderButton ? (
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="shrink-0 border-white/25 bg-transparent text-white/90 hover:bg-white/10 hover:text-white"
                            onClick={handleHeaderButtonClick}
                        >
                            {headerButtonLabel}
                        </Button>
                    ) : null}
                </div>
            ) : null}
            <div className="min-h-0 flex-1">{children}</div>
        </div>
    );
};
