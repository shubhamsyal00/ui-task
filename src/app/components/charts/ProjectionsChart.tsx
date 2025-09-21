"use client";

import React, { useMemo } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { projectionsData } from "../../data/projections";

type Props = {
    className?: string;
    height?: number;
};

export default function ProjectionsChart({ className = "", height = 172 }: Props) {
    const data = useMemo(
        () =>
            projectionsData.map((d) => ({
                ...d,
                extra: Math.max(0, +(d.projection - d.actual).toFixed(2)),
            })),
        []
    );

    const maxVal = Math.max(...data.map((d) => d.projection));
    const yMax = Math.ceil((maxVal + maxVal * 0.08) / 5) * 5;

    return (
        <div className={`rounded-2xl p-6 bg-neutral-750 dark:bg-neutral-800 ${className}`}>
            <div className="text-sm font-semibold mb-2">
                Projections vs Actuals
            </div>

            <div style={{ width: "100%", height }}>
                <ResponsiveContainer width="100%" height="100%" className="no-underline outline-0">
                    <BarChart
                        data={data}
                        margin={{ top: 6, right: 8, left: -25, bottom: 0 }}
                        barCategoryGap="28%"
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={2}
                            className="text-xs"
                        />

                        <YAxis
                            domain={[0, yMax]}
                            tickFormatter={(v) => `${v}M`}
                            axisLine={false}
                            tickLine={false}
                            className="text-xs"
                        />

                        <Tooltip
                            cursor={false}
                            formatter={(value: number, name: string) => [
                                `${value}M`,
                                name === "extra" ? "Projection extra" : "Actual",
                            ]}
                            itemStyle={{ color: "black", fontSize: "12px" }}
                            contentStyle={{
                                background: "var(--color-neutral-0)",
                                borderRadius: 8,
                                border: "1px solid rgba(0,0,0,0.06)",
                                color: "black",
                            }}
                        />

                        <Bar
                            dataKey="actual"
                            stackId="a"
                            barSize={36}
                            radius={[0, 0, 0, 0]}
                            fill="#A8C5DA"
                            activeBar={false}
                        />

                        <Bar
                            dataKey="extra"
                            stackId="a"
                            barSize={36}
                            radius={[6, 6, 0, 0]}
                            fill="#E5ECF6"
                            activeBar={false}
                        />
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
}
