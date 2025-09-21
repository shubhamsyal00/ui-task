// components/RevenueChartECharts.tsx
"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  LineChart,
} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GraphicComponent,
  DatasetComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import Card from "../common/Card";
import { EChartsOption } from "echarts/types/dist/shared";

// register required pieces
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GraphicComponent,
  DatasetComponent,
  LineChart,
  SVGRenderer,
]);

type Point = { name: string; current: number; previous: number };

const data: Point[] = [
  { name: "Jan", current: 8, previous: 12 },
  { name: "Feb", current: 14, previous: 8 },
  { name: "Mar", current: 17, previous: 10 },
  { name: "Apr", current: 18, previous: 17 },
  { name: "May", current: 15, previous: 20 },
  { name: "Jun", current: 8, previous: 18 },
];

export default function RevenueChartECharts({ height = 232 }: { height?: number }) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // init chart
    const chart = echarts.init(chartRef.current, undefined, { renderer: "svg" });
    instanceRef.current = chart;

    const months = data.map((d) => d.name);
    const currentVals = data.map((d) => d.current);
    const previousVals = data.map((d) => d.previous);

    // split current into two series but overlap one index at the boundary
    const splitIndex = 4; // dashed starts at index 4 (May)
    const currentSolid = currentVals.map((v, i) => (i < splitIndex ? v : null));
    // include the previous index in dashed too to make a smooth join without gap:
    // dashed includes index (splitIndex - 1) and onwards
    const currentDashed = currentVals.map((v, i) =>
      i >= splitIndex - 1 ? v : null
    );

    const yMax = Math.ceil(Math.max(...[...currentVals, ...previousVals]) * 1.12);

    const option: EChartsOption = {
      backgroundColor: "transparent",
      grid: { left: 40, right: 24, top: 20, bottom: 20 },
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(0,0,0,0.06)",
        borderWidth: 1,
        textStyle: { color: "#0f1720" },
        axisPointer: { type: "line", lineStyle: { color: "transparent" } },

        // <-- we accept `params: any` and cast to `any` so TS stops complaining
        formatter: ((
          params: any
        ) => {
          if (!params || params.length === 0) return "";

          const month = params[0]?.name ?? "";

          let prev: number | null = null;
          let current: number | null = null;

          params.forEach((p: any) => {
            if (!p) return;
            const name: string = p.seriesName ?? "";
            const val = p.value == null ? null : p.value;
            if (name === "previous") prev = val;
            if (name.startsWith("current")) {
              if (current == null && val != null) current = val;
            }
          });

          const lines: string[] = [month];
          if (current != null) lines.push(`Current Week: ${current}M`);
          if (prev != null) lines.push(`Previous Week: ${prev}M`);
          return lines.join("<br/>");
        }) as any,
      },
      xAxis: {
        type: "category",
        data: months,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: "var(--color-neutral-500)", fontSize: 13, padding: [14, 0, 0, 0] },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: yMax,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: "rgba(15,23,32,0.06)" } },
        axisLabel: { color: "var(--color-neutral-500)", formatter: "{value}M", fontSize: 13 },
      },


      series: [
  {
    name: "previous",
    type: "line",
    smooth: true,
    data: previousVals,
    showSymbol: false,
    lineStyle: { color: "#A8C5DA", width: 2 },
    itemStyle: { color: "#A8C5DA", borderColor: "#fff", borderWidth: 2 },
    areaStyle: {
      color: {
        type: "linear",
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: "rgba(168,197,218,0.18)" },
          { offset: 1, color: "rgba(168,197,218,0.02)" },
        ],
      },
    },
    z: 1,
    emphasis: { disabled: true },   // 🔑 disables hover fade
    select: { disabled: true },     // 🔑 disables selection
  },

  {
    name: "current-solid",
    type: "line",
    smooth: true,
    data: currentSolid,
    showSymbol: false,
    connectNulls: true,
    lineStyle: { color: "var(--color-graphline-fill)", width: 2.0 },
    itemStyle: { color: "var(--color-graphline-fill)", borderColor: "#fff", borderWidth: 2 },
    z: 2,
    emphasis: { disabled: true },   // 🔑 no hover fade
    select: { disabled: true },     // 🔑 no selection
  },

  {
    name: "current-dashed",
    type: "line",
    smooth: true,
    data: currentDashed,
    showSymbol: false,
    symbol: "circle",
    symbolSize: 8,
    connectNulls: true,
    lineStyle: { color: "var(--color-graphline-fill)", width: 2.6, type: "dashed" },
    itemStyle: { color: "var(--color-graphline-fill)", borderColor: "#fff", borderWidth: 2 },
    z: 3,
    emphasis: { disabled: true },   // 🔑 no hover fade
    select: { disabled: true },     // 🔑 no selection
  },
],

    };

    chart.setOption(option);

    // make it responsive
    const resize = () => chart.resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
      instanceRef.current = null;
    };
  }, []);

  return (
    <Card className="rounded-2xl p-6 bg-neutral-750 dark:bg-neutral-800 h-[318px]">
      <div className="mb-2">
        <div className="text-sm font-semibold text-text-primary dark:text-text-primary-dark flex items-center">
          Revenue <span className="text-neutral-150 dark:text-neutral-200 ml-3 mr-6">|</span>
          <ChartLegend />
        </div>
      </div>
      <div style={{ height }} ref={chartRef} />
    </Card>
  );
}
function ChartLegend() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-xs text-text-primary dark:text-text-primary-dark">
        <span className="inline-flex items-center justify-center w-1.5 h-1.5 rounded-full bg-neutral-950 dark:bg-neutral-0" />
        <span className="ml-0.5">Current Week</span>
        <span className="ml-0.5 font-semibold">$58,211</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-text-primary dark:text-text-primary-dark">
        <span className="inline-flex items-center justify-center w-1.5 h-1.5 rounded-full bg-[#A8C5DA]" />
        <span className="ml-0.5">Previous Week</span>
        <span className="ml-0.5 font-semibold">$68,768</span>
      </div>
    </div>
  );
}