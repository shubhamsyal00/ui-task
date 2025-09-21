// pages/dashboard.tsx
"use client";

import { useMemo, useState } from "react";
import { dummyOrders } from "../data/orders-data";
import OrdersToolbar from "../components/orders/OrdersToolbar";
import Topbar from "../components/layout/Topbar";
import OrdersTable from "../components/orders/OrdersTable";
import { Order } from "../types/order";
import Pagination from "../components/common/Pagination";

export default function Orders() {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState("");
  const [sortIndex, setSortIndex] = useState<number | null>(null); // which option index is active
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const pageSize = 5;

  // derive sortKey from sortIndex (controlled)
  const sortingOptions:any = { 0: "dateIso", 1: "user", 2: "id" };
  const sortKey = sortIndex === null ? "" : sortingOptions[sortIndex];

  // filter + sort
  const filtered: Order[] = useMemo(() => {
    let data = [...dummyOrders];

    if (query) {
      data = data.filter((o) =>
        [o.id, o.user, o.project, o.address, o.status]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }

    if (statusFilter) data = data.filter((o) => o.status === statusFilter);

    if (dateFilter) {
      const today = new Date();
      data = data.filter((o) => {
        const orderDate = new Date(o.dateIso);
        switch (dateFilter) {
          case "today":
            return orderDate.toDateString() === today.toDateString();
          case "yesterday": {
            const y = new Date(today);
            y.setDate(today.getDate() - 1);
            return orderDate.toDateString() === y.toDateString();
          }
          case "last7days": {
            const week = new Date(today);
            week.setDate(today.getDate() - 7);
            return orderDate >= week;
          }
          default:
            return true;
        }
      });
    }

    if (sortKey) {
      data.sort((a, b) => {
        if (sortKey === "dateIso") {
          return +new Date(b.dateIso) - +new Date(a.dateIso);
        }
        return String(a[sortKey as keyof Order]).localeCompare(String(b[sortKey as keyof Order]));
      });
    }

    return data;
  }, [query, sortKey, statusFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const startIdx = (page - 1) * pageSize;
  const paginated: Order[] = filtered.slice(startIdx, startIdx + pageSize);

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <Topbar name="Orders" />
      <div className="max-h-[calc(100vh-68px)] overflow-y-auto">
        <div className="px-6 pt-8 pb-6">
          <OrdersToolbar
            onSearch={setQuery}
            sortingOptions={sortingOptions}
            sortIndex={sortIndex}
            setSortIndex={setSortIndex}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />

          <div className="mt-4">
            <OrdersTable dummyOrders={paginated} />
          </div>

          <div className="mt-6 flex items-center justify-end gap-4">
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onChange={(p) => setPage(p)}
              neighbors={1}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
