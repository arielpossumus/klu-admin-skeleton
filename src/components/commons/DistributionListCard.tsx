import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AGGREGATION_OPTIONS,
    CURRENCY_OPTIONS,
    type AggregationValue,
    type CurrencyOption,
} from "@/config/options";

export interface DistributionItem {
    label: string;
    count: number;
}

interface DistributionListCardProps {

    items: DistributionItem[];
    footer?: string;
}

export const DistributionListCard = ({ items, footer }: DistributionListCardProps) => {
    const [aggregation, setAggregation] = useState<AggregationValue>("total");
    const [currency, setCurrency] = useState<CurrencyOption>("Pesos");
    const aggregationLabel = AGGREGATION_OPTIONS.find((o) => o.value === aggregation)?.label ?? "Total";

    return (
        <Card className="p-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-nowrap items-center justify-between gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="min-w-0 shrink justify-between gap-1 text-sm">
                                {aggregationLabel}
                                <ChevronDown className="size-3.5 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="text-sm">
                            {AGGREGATION_OPTIONS.map((opt) => (
                                <DropdownMenuItem
                                    key={opt.value}
                                    onClick={() => setAggregation(opt.value)}
                                >
                                    {opt.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ButtonGroup className="shrink-0">
                        {CURRENCY_OPTIONS.map((opt) => (
                            <Button
                                key={opt}
                                variant={currency === opt ? "default" : "outline"}
                                className={currency === opt ? "bg-[var(--accent)] text-accent-foreground hover:bg-[var(--accent-dark)]" : "bg-[var(--background)] text-foreground hover:bg-[var(--accent)] hover:text-accent-foreground"}
                                size="sm"
                                onClick={() => setCurrency(opt)}
                            >
                                {opt}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
                <ul className="flex flex-col gap-2" aria-label="Distribución de transacciones">
                    {items.map(({ label, count }) => (
                        <li
                            key={label}
                            className="flex items-center justify-between gap-4 border-b border-border/50 pb-2 last:border-0 last:pb-0"
                        >
                            <span className="text-sm text-foreground">{label}</span>
                            <span className="text-sm font-semibold tabular-nums">
                                {count}
                            </span>
                        </li>
                    ))}
                </ul>
                {footer ? (
                    <p className="text-xs text-muted-foreground">
                        {footer}
                    </p>
                ) : null}
            </div>
        </Card>
    );
};
