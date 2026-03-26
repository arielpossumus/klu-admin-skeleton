import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DISTRIBUTION_AGGREGATION_OPTIONS,
  DISTRIBUTION_CURRENCY_OPTIONS,
  DISTRIBUTION_DONUT_CHART_CONFIG,
  type DistributionAggregationValue,
  type DistributionCurrencyOption,
} from "./distributionChartConfig";

export interface DistributionItem {
  label: string;
  count: number;
}

const getValueByLabel = (items: DistributionItem[], label: string): number =>
  items.find((i) => i.label.toLowerCase() === label.toLowerCase())?.count ?? 0;

interface DistributionListCardProps {
  items: DistributionItem[];
  footer?: string;
}

export const DistributionListCard = ({ items, footer }: DistributionListCardProps) => {
  const [aggregation, setAggregation] = useState<DistributionAggregationValue>("total");
  const [currency, setCurrency] = useState<DistributionCurrencyOption>("Pesos");
  const aggregationLabel =
    DISTRIBUTION_AGGREGATION_OPTIONS.find(
      (o: (typeof DISTRIBUTION_AGGREGATION_OPTIONS)[number]) => o.value === aggregation
    )?.label ?? "Total";

  const { pieData, centerValue, totalAmount } = useMemo(() => {
    const aprobadas = getValueByLabel(items, "Aprobadas");
    const rechazadas = getValueByLabel(items, "Rechazadas");
    const diarias = getValueByLabel(items, "Diarias");
    const acumulado = getValueByLabel(items, "Acumulado");

    const data = [
      { name: "Aprobadas", value: aprobadas },
      { name: "Rechazadas", value: rechazadas },
    ].filter((d) => d.value > 0);

    if (data.length === 0) {
      data.push({ name: "Aprobadas", value: 0 }, { name: "Rechazadas", value: 0 });
    }

    return {
      pieData: data,
      centerValue: diarias,
      totalAmount: acumulado,
    };
  }, [items]);

  const currencySymbol = currency === "Pesos" ? "$" : "USD";
  const formattedTotal = `${currencySymbol} ${totalAmount.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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
              {DISTRIBUTION_AGGREGATION_OPTIONS.map(
                (opt: (typeof DISTRIBUTION_AGGREGATION_OPTIONS)[number]) => (
                  <DropdownMenuItem key={opt.value} onClick={() => setAggregation(opt.value)}>
                    {opt.label}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <ButtonGroup className="shrink-0">
            {DISTRIBUTION_CURRENCY_OPTIONS.map((opt: DistributionCurrencyOption) => (
              <Button
                key={opt}
                variant={currency === opt ? "default" : "outline"}
                className={
                  currency === opt
                    ? "bg-[var(--accent)] text-accent-foreground hover:bg-[var(--accent-dark)]"
                    : "bg-[var(--background)] text-foreground hover:bg-[var(--accent)] hover:text-accent-foreground"
                }
                size="sm"
                onClick={() => setCurrency(opt)}
              >
                {opt}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border pb-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold uppercase tracking-tight text-foreground">Total</p>
            <p className="text-xs text-muted-foreground">Acumulado del día</p>
          </div>
          <p className="text-xl font-bold tabular-nums text-foreground">{formattedTotal}</p>
        </div>

        <div className="relative mx-auto h-[220px] w-full max-w-[220px]">
          <ChartContainer config={DISTRIBUTION_DONUT_CHART_CONFIG} className="h-full w-full">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="90%"
                strokeWidth={0}
                paddingAngle={1}
              >
                {pieData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={
                      DISTRIBUTION_DONUT_CHART_CONFIG[entry.name as keyof typeof DISTRIBUTION_DONUT_CHART_CONFIG]
                        ?.color ?? "var(--color-success-dark)"
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
            aria-hidden
          >
            <span className="text-2xl font-bold tabular-nums text-foreground">{centerValue}</span>
            <span className="text-xs font-medium text-muted-foreground">Diarias</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 pt-2" role="list" aria-label="Leyenda del gráfico">
          <div className="flex items-center gap-1.5">
            <span className="size-3 shrink-0 rounded-sm bg-[var(--color-success-dark)]" aria-hidden />
            <span className="text-sm text-foreground">Aprobados</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-3 shrink-0 rounded-sm bg-[var(--color-error-dark)]" aria-hidden />
            <span className="text-sm text-foreground">Rechazados</span>
          </div>
        </div>

        {footer ? (
          <p className="border-t border-border/60 pt-3 text-xs text-muted-foreground">{footer}</p>
        ) : null}
      </div>
    </Card>
  );
};
