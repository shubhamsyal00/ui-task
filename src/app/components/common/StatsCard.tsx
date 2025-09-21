// components/StatsCard.tsx
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";
import Card from "./Card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changePositive?: boolean;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  changePositive = false,
  className
}: StatsCardProps) {
  return (
    <Card className={`flex flex-col gap-2 ${className}`}>
      <p className="text-sm font-semibold">{title}</p>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{value}</h2>
        <div className="text-sm font-semibold flex items-center gap-1">
          {change}
          {
            changePositive ? <MdOutlineTrendingUp /> : <MdOutlineTrendingDown />
          }
        </div>
      </div>
    </Card>
  );
}
