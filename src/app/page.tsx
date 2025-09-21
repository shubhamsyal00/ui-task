// pages/dashboard.tsx

import Topbar from "./components/layout/Topbar";
import StatsCard from "./components/common/StatsCard";
import RevenueChart from "./components/charts/RevenueChart";
import SalesTable from "./components/sales/SalesTable";
import TotalSalesChart from "./components/charts/TotalSalesChart";
import RightPanel from "./components/layout/RightPanel";
import ProjectionsChart from "./components/charts/ProjectionsChart";
import RevenueByLocation from "./components/charts/RevenueByLocation";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      {/* Main content area */}
      <main className="flex-1 flex flex-col">
        {/* Top navigation bar with page title */}
        <Topbar name="Default"/>

        {/* Scrollable content below the top bar */}
        <div className="max-h-[calc(100vh-68px)] overflow-y-auto">

          {/* Page header */}
          <div className="flex items-center justify-between px-6 pt-8 py-6">
            <h1 className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
              eCommerce
            </h1>
          </div>

          {/* First grid: summary stats and projections chart */}
          <div className="grid grid-cols-4 grid-rows-2 gap-6 p-6">

            {/* Customers card */}
            <div className="row-start-1 row-span-1 col-start-1 col-span-1">
              <StatsCard
                title="Customers"
                value="3,781"
                change="+110.1"
                changePositive
                className="p-6 h-28 bg-neutral-660 text-black dark:text-black"
              />
            </div>

            {/* Orders card (clickable link to orders page) */}
            <Link
              className="row-start-1 row-span-1 col-start-2 col-span-1"
              href="/orders"
            >
              <StatsCard
                title="Orders"
                value="1,219"
                change="-0.03"
                className="p-6 h-28 bg-neutral-750 dark:bg-neutral-800"
              />
            </Link>

            {/* Revenue card */}
            <div className="row-start-2 row-span-1 col-start-1 col-span-1">
              <StatsCard
                title="Revenue"
                value="$695"
                change="+15.03"
                changePositive
                className="p-6 h-28 bg-neutral-750 dark:bg-neutral-800"
              />
            </div>

            {/* Growth card */}
            <div className="row-start-2 row-span-1 col-start-2 col-span-1">
              <StatsCard
                title="Growth"
                value="30.1%"
                change="+6.08"
                changePositive
                className="p-6 h-28 bg-neutral-700 text-black dark:text-black"
              />
            </div>

            {/* Projections chart takes larger space */}
            <div className="row-start-1 row-span-2 col-start-3 col-span-3 h-62">
              <ProjectionsChart />
            </div>
          </div>

          {/* Second grid: charts and tables */}
          <div
            className="grid grid-cols-4 gap-6 pt-0 p-6 mb-20"
            style={{ gridTemplateRows: "repeat(4, 147px)" }}
          >
            {/* Revenue trend chart */}
            <div className="row-start-1 row-span-2 col-start-1 col-span-3">
              <RevenueChart />
            </div>

            {/* Revenue by location chart */}
            <div className="row-start-1 row-span-2 col-start-4 col-span-1">
              <RevenueByLocation />
            </div>

            {/* Sales data table */}
            <div className="row-start-3 row-span-2 col-start-1 col-span-3">
              <SalesTable />
            </div>

            {/* Total sales breakdown chart */}
            <div className="row-start-3 row-span-2 col-start-4 col-span-1">
              <TotalSalesChart />
            </div>
          </div>
        </div>
      </main>

      {/* Persistent right-side panel */}
      <RightPanel />
    </>
  );
}
