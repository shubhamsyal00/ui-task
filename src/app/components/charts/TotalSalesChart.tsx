"use client";
import Card from "../common/Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface SalesData {
  name: string;
  value: number;
  [key: string]: any;
}

const data: SalesData[] = [
  { name: "Direct", value: 300.56 },
  { name: "Affiliate", value: 135.18 },
  { name: "Sponsored", value: 154.02 },
  { name: "E-mail", value: 48.96 },
];

const COLORS = [
  "var(--color-dougnut-black)",
  "var(--color-dougnut-green)",
  "var(--color-dougnut-purple)",
  "var(--color-dougnut-blue)",
];

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-[#1C1C1CCC] text-white text-xs px-2 py-1 rounded-md shadow">
        {value}%
      </div>
    );
  }
  return null;
};

export default function TotalSalesChart() {
  return (
    <Card className="rounded-2xl p-6 bg-neutral-50 dark:bg-neutral-800">
      <h3 className="text-sm font-semibold mb-4">Total Sales</h3>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="48%"       // ⬅️ shift pie a little up/down
            innerRadius={45}
            outerRadius={70} // ⬅️ reduce radius to avoid cut-off
            paddingAngle={6}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* legend */}
      <div className="mt-4 space-y-2 text-xs">
        {data.map((d, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: COLORS[i] }}
              />
              {d.name}
            </div>
            <span>${d.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
