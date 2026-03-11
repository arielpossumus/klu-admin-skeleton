"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TOP_CORPORATIVOS_CHART_CONFIG, BAR_COLORS } from "@/config/chart.config";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import ParagraphH4 from "@/components/text/ParagraphH4";
import dataFebrero from "../../../public/mockups/dashboard/top/getlAllTopCorporativosFebrero.json" with { type: "json" };
import dataMarzo from "../../../public/mockups/dashboard/top/getlAllTopCorporativosMarzo.json" with { type: "json" };
import type { TopResponse, TopCorporativosMonthOption } from "@/types/dashboard/topCorporativosChart";

const DATA_SOURCE = {
  Febrero: dataFebrero as TopResponse,
  Marzo: dataMarzo as TopResponse,
} as const;

const LEFT_ALIGN_X = 4;
const LABEL_MAX_CHARS_ONE_LINE = 18;

function splitInTwoLines(str: string): [string, string] | null {
  if (str.length <= LABEL_MAX_CHARS_ONE_LINE) return null;
  const words = str.split(" ");
  if (words.length <= 1) return null;
  const mid = Math.floor(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");
  return [line1, line2];
}

function YAxisTickLeft(props: { x?: number; y?: number; payload?: { value?: string; corporativo?: string; } | string; }) {
  const { y, payload } = props;
  const text =
    typeof payload === "string"
      ? payload
      : (payload && "corporativo" in payload ? payload.corporativo : payload?.value) ?? "";
  const twoLines = splitInTwoLines(text);
  const lineHeight = 14;

  return (
    <g transform={`translate(${LEFT_ALIGN_X}, ${y ?? 0})`}>
      <text
        textAnchor="start"
        fill="currentColor"
        className="fill-muted-foreground"
        style={{ fontSize: 12 }}
      >
        {twoLines ? (
          <>
            <tspan x={0} dy={twoLines[1] ? -lineHeight / 2 : 0}>
              {twoLines[0]}
            </tspan>
            {twoLines[1] ? <tspan x={0} dy={lineHeight}>{twoLines[1]}</tspan> : null}
          </>
        ) : (
          <tspan dy="0.35em">{text}</tspan>
        )}
      </text>
    </g>
  );
}

export function TopCorporativosChart() {
  const [month, setMonth] = useState<TopCorporativosMonthOption>("Febrero");

  const { chartData } = useMemo(() => {
    const source = DATA_SOURCE[month];
    const data = (source.data ?? []).slice().sort((a, b) => a.ranking - b.ranking);
    return { period: source.period ?? month, chartData: data };
  }, [month]);

  const formatMonto = (value: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 }).format(value);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <ParagraphH4 text="Top Corporativos" />
        <ButtonGroup>
          {(["Febrero", "Marzo"] as const).map((opt) => (
            <Button
              key={opt}
              variant={month === opt ? "default" : "outline"}
              size="sm"
              onClick={() => setMonth(opt)}
            >
              {opt}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <ChartContainer config={TOP_CORPORATIVOS_CHART_CONFIG} className="h-[280px] w-full">
        <BarChart
          layout="vertical"
          accessibilityLayer
          data={chartData}
          margin={{ top: 8, right: 8, bottom: 8, left: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="corporativo"
            width={170}
            tickLine={false}
            axisLine={false}
            tickMargin={0}
            tick={<YAxisTickLeft />}
          />
          <ChartTooltip
            formatter={(value: number) => formatMonto(value)}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.corporativo}
            content={(props) => {
              const { coordinate, active, payload, label } = props;
              if (!active || !payload?.length) return null;
              return (
                <div
                  className="recharts-tooltip-wrapper"
                  style={{
                    position: "absolute",
                    left: 8,
                    top: coordinate?.y != null ? coordinate.y - 24 : 0,
                    transform: "translateY(-50%)",
                  }}
                >
                  <ChartTooltipContent
                    active={active}
                    payload={payload as React.ComponentProps<typeof ChartTooltipContent>["payload"]}
                    label={label}
                    className="text-left"
                    formatter={(val: unknown) => formatMonto(Number(val))}
                    labelFormatter={(_, pl) => pl?.[0]?.payload?.corporativo}
                  />
                </div>
              );
            }}
          />
          <Bar dataKey="monto" name="Monto" radius={[0, 4, 4, 0]} barSize={28} maxBarSize={36}>
            {chartData.map((_, index) => (
              <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>

      <p className="text-xs text-muted-foreground">
        Mostrando top 5 corporativos por monto en el período seleccionado.
      </p>
    </div>
  );
}
