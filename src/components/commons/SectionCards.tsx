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
} from "@/lib/utils";

export function SectionCards({ accumulatedAmountDay, salesNumber, rejectionNumber, transactionDailyNumber }: { accumulatedAmountDay: number; salesNumber: number; rejectionNumber: number; transactionDailyNumber: number; }) {
    const [aggregation, setAggregation] = useState<AggregationValue>("total");
    const [currency, setCurrency] = useState<CurrencyOption>("Pesos");

    const aggregationLabel = AGGREGATION_OPTIONS.find((o) => o.value === aggregation)?.label ?? "Total";

    return (
        <div className="flex flex-col gap-4 px-4 lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="min-w-[12rem] justify-between">
                            {aggregationLabel}
                            <ChevronDown className="size-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
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
                <ButtonGroup>
                    {CURRENCY_OPTIONS.map((opt) => (
                        <Button
                            key={opt}
                            variant={currency === opt ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrency(opt)}
                        >
                            {opt}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                <Card className="@container/card bg-[#fbb755] border border-[#f99b1c] text-white">
                    <CardHeader>
                        <CardDescription className="text-xl text-white">Transacciones aprobadas </CardDescription>
                        <CardTitle className="text-6xl font-semibold tabular-nums @[250px]/card:text-6xl">
                            {salesNumber}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card bg-[#0b3c36] border border-[#087771] text-white">
                    <CardHeader>
                        <CardDescription className="text-xl text-white">Transacciones aprobadas </CardDescription>
                        <CardTitle className="text-6xl font-semibold tabular-nums @[250px]/card:text-6xl">
                            {rejectionNumber}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card bg-[#527098] border border-[#31496a] text-white">
                    <CardHeader>
                        <CardDescription className="text-xl text-white">Transacciones aprobadas </CardDescription>
                        <CardTitle className="text-6xl font-semibold tabular-nums @[250px]/card:text-6xl">
                            {transactionDailyNumber}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card bg-[#3a3c3d] border border-[#1e1e20] text-white">
                    <CardHeader>
                        <CardDescription className="text-xl text-white">Monto acumulado del dia </CardDescription>
                        <CardTitle className="text-6xl font-semibold tabular-nums @[250px]/card:text-6xl">
                            {accumulatedAmountDay}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}