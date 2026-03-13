import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import ParagraphH4 from "../text/ParagraphH4";

export function SectionCards({ accumulatedAmountDay, salesNumber, rejectionNumber, transactionDailyNumber }: { accumulatedAmountDay: number; salesNumber: number; rejectionNumber: number; transactionDailyNumber: number; }) {
    const [aggregation, setAggregation] = useState<AggregationValue>("total");
    const [currency, setCurrency] = useState<CurrencyOption>("Pesos");

    const aggregationLabel = AGGREGATION_OPTIONS.find((o) => o.value === aggregation)?.label ?? "Total";

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto px-4 py-2 lg:px-6">
            <div className="flex flex-nowrap items-center justify-between gap-2">
                <ParagraphH4 text="Transacciones" />
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
            <div className="grid grid-cols-2 gap-4 *:data-[slot=card]:shadow-xs">
                <Card className="@container/card bg-[var(--color-success-light)] border-2 border-[var(--color-success-light)] text-[var(--color-success-dark)]">
                    <CardHeader className="p-3">
                        <CardDescription className="text-md text-[var(--color-success-dark)]">Aprobadas</CardDescription>
                        <CardTitle className="text-6xl font-semibold tabular-nums">
                            {salesNumber}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card bg-[var(--color-error-light)] border-2 border-[var(--color-error-light)] text-[var(--color-error-dark)]">
                    <CardHeader className="p-3">
                        <CardDescription className="text-md text-[var(--color-error-dark)]">Rechazadas</CardDescription>
                        <CardTitle className="text-6xl font-semibold tabular-nums">
                            {rejectionNumber}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card bg-[var(--color-warning-light)] border-2 border-[var(--color-warning-light)] text-[var(--color-warning-dark)]">
                    <CardHeader className="p-3">
                        <CardDescription className="text-md text-[var(--color-warning-dark)]">Diarias</CardDescription>
                        <CardTitle className="text-6xl font-semibold tabular-nums">
                            {transactionDailyNumber}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card bg-[var(--color-info-light)] border-2 border-[var(--color-info-light)] text-[var(--color-info-dark)]">
                    <CardHeader className="p-3">
                        <CardDescription className="text-md text-[var(--color-info-dark)]">Acumulado</CardDescription>
                        <CardTitle className="text-6xl font-semibold tabular-nums">
                            {accumulatedAmountDay}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}