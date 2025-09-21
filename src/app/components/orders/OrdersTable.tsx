"use client";

import React, { useState } from "react";
import { GoCalendar } from "react-icons/go";
import { PiDotsThreeBold } from "react-icons/pi";
import CustomCheckbox from "../common/CustomCheckbox";
import { Order } from "@/app/types/order";
import { formatRelativeDate } from "@/app/utils/formatDate";
type Props = {
    dummyOrders: Order[];
};

export default function OrdersTable({ dummyOrders }: Props) {
    const [selected, setSelected] = useState<string[]>([]);
    // Handle "select all" in header
    const allSelected =
        dummyOrders.length > 0 && selected.length === dummyOrders.length;

    const toggleAll = (checked: boolean) => {
        if (checked) {
            setSelected(dummyOrders.map((o) => o.id));
        } else {
            setSelected([]);
        }
    };

    const toggleRow = (id: string, checked: boolean) => {
        if (checked) {
            setSelected((prev) => [...prev, id]);
        } else {
            setSelected((prev) => prev.filter((x) => x !== id));
        }
    };

    return (

        <div className="mt-4 overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="bg-transparent text-xs text-neutral-250 dark:text-neutral-350 border-b border-neutral-550 dark:border-neutral-600">
                        <th className="px-4 py-3 text-left font-normal"><CustomCheckbox
                            checked={allSelected}
                            onChange={toggleAll}
                        /></th>
                        <th className="px-4 py-3 text-left font-normal">Order ID</th>
                        <th className="px-4 py-3 text-left font-normal">User</th>
                        <th className="px-4 py-3 text-left font-normal">Project</th>
                        <th className="px-4 py-3 text-left font-normal">Address</th>
                        <th className="px-4 py-3 text-left font-normal">Date</th>
                        <th className="px-4 py-3 text-left font-normal">Status</th>
                        <th className="px-4 py-3 text-left font-normal"></th>
                    </tr>
                </thead>
                <tbody>
                    {dummyOrders.map((o: Order) => (
                        <tr
                            key={o.id}
                            className="group border-b border-neutral-550 dark:border-neutral-600 last:border-b-0 hover:bg-neutral-750 dark:hover:bg-[#FFFFFF0D]"
                        >
                            <th className="px-4 py-4 text-xs"><CustomCheckbox
                                checked={selected.includes(o.id)}
                                onChange={(checked) => toggleRow(o.id, checked)}
                            /></th>
                            <td className="px-4 py-4 text-xs">{o.id}</td>

                            <td className="px-4 py-4 text-xs">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={o.avatar}
                                        alt={o.user}
                                        className="w-6 h-6 rounded-full object-cover"
                                    />
                                    {o.user}
                                </div>
                            </td>

                            <td className="px-4 py-4 text-xs">{o.project}</td>
                            <td className="px-4 py-4 text-xs">{o.address}</td>

                            <td className="px-4 py-4 text-xs">
                                <div className="flex items-center gap-1">
                                    <GoCalendar />
                                    {formatRelativeDate(o.dateIso)}
                                </div>
                            </td>

                            <td className="px-4 py-4 text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{
                                        backgroundColor: getStatusVar(o.status).color,
                                    }} />
                                    <span style={{ color: getStatusVar(o.status).color }}>{o.status}</span>
                                    {/* Only show on row hover */}
                                </div>
                            </td>
                            <td>
                                <PiDotsThreeBold className="hidden group-hover:inline-flex cursor-pointer" />
                            </td>
                        </tr>
                    ))}
                    {dummyOrders.length === 0 && (
                        <tr>
                            <td colSpan={6} className="p-6 text-center text-neutral-500">
                                No matching results
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function getStatusVar(status: string) {
    switch (status) {
        case "Complete":
            return { color: "var(--color-status-complete, #4aa785)" };
        case "In Progress":
            return { color: "var(--color-status-progress, #95A4FC)" };
        case "Pending":
            return { color: "var(--color-status-pending, #59A8D4)" };
        case "Approved":
            return { color: "var(--color-status-approved, #FFC555)" };
        case "Rejected":
            return { color: "var(--color-status-rejected, #9CA3AF)" };
        default:
            return { color: "var(--color-status-default, #9CA3AF)" };
    }
}
