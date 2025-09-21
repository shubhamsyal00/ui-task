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

// register only the echarts pieces we need to keep bundle size smaller
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

// simple typed data model for the chart points
type Point = { name: string; current: number; previous: number };

// sample data used to build the chart series
const data: Point[] = [
  { name: "Jan", current: 8, previous: 12 },
  { name: "Feb", current: 14, previous: 8 },
  { name: "Mar", current: 17, previous: 10 },
  { name: "Apr", current: 18, previous: 17 },
  { name: "May", current: 15, previous: 20 },
  { name: "Jun", current: 8, previous: 18 },
];

// main chart component — accepts an optional height prop
export default function RevenueChartECharts({ height = 232 }: { height?: number }) {
  // ref to the DOM node where echarts will render
  const chartRef = useRef<HTMLDivElement | null>(null);
  // keep a reference to the echarts instance so we can dispose/resize it
  const instanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    // bail out if the ref is not available yet
    if (!chartRef.current) return;

    // initialize echarts with SVG renderer for crisp lines and easier styling
    const chart = echarts.init(chartRef.current, undefined, { renderer: "svg" });
    instanceRef.current = chart;

    // prepare axis labels and series data
    const months = data.map((d) => d.name);
    const currentVals = data.map((d) => d.current);
    const previousVals = data.map((d) => d.previous);

    const splitIndex = 4;
    const currentSolid = currentVals.map((v, i) => (i < splitIndex ? v : null));
    const currentDashed = currentVals.map((v, i) => (i >= splitIndex - 1 ? v : null));

    // compute a nice Y max so the chart has breathing room
    const yMax = Math.ceil(Math.max(...[...currentVals, ...previousVals]) * 1.12);

    // chart option object — typed as EChartsOption
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

        formatter: ((params: any) => {
          if (!params || params.length === 0) return "";

          // first param usually holds the category name
          const month = params[0]?.name ?? "";

          let prev: number | null = null;
          let current: number | null = null;

          // iterate through the items and pick out the values we care about
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

      // three series:
      // 1) previous (solid with area)
      // 2) current-solid (solid line up to split)
      // 3) current-dashed (dashed line after split, overlaps one index)
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
          emphasis: { disabled: true },
          select: { disabled: true },
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
          emphasis: { disabled: true },
          select: { disabled: true },
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
          emphasis: { disabled: true },
          select: { disabled: true },     // disable selection state
        },
      ],
    };

    // apply the option and wire up responsive behavior
    chart.setOption(option);

    const resize = () => chart.resize();
    window.addEventListener("resize", resize);

    // cleanup on unmount: remove listener and dispose the chart instance
    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
      instanceRef.current = null;
    };
  }, []);

  return (
    <Card className="rounded-2xl p-6 bg-neutral-750 dark:bg-neutral-800 h-[318px]">
      {/* Title and legend area */}
      <div className="mb-2">
        <div className="text-sm font-semibold text-text-primary dark:text-text-primary-dark flex items-center">
          Revenue <span className="text-neutral-150 dark:text-neutral-200 ml-3 mr-6">|</span>
          <ChartLegend />
        </div>
      </div>

      {/* chart container; echarts will render into this div */}
      <div style={{ height }} ref={chartRef} />
    </Card>
  );
}

// small presentational legend used in the card header
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
