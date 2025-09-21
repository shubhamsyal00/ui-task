// components/Sidebar.tsx
"use client";
import { useState } from "react";
import { sidebarData } from "../../data/sidebarData";
import type { NavItem, LinkItem } from "../../types/nav";
import { GoChevronRight, GoChevronDown } from "react-icons/go";

export default function Sidebar() {
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

    const toggleSubmenu = (label: string) => {
        setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <aside className="w-64 h-screen border border-neutral-550 dark:border-neutral-600 p-4 flex flex-col gap-6">
            {/* User */}
            <div className="flex items-center gap-3">
                <img
                    src={sidebarData.user.avatar}
                    alt={sidebarData.user.name}
                    className="w-6 h-6 rounded-full"
                />
                <h2 className="text-sm ">{sidebarData.user.name}</h2>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-auto">
                {sidebarData.sections.map((section) => (
                    <div key={section.title} className="mb-6">
                        {/* small / muted section heading (keeps original string so "Favorites  Recently" works) */}
                        <div className="flex gap-8">
                            <h3 className="text-xs text-neutral-250 dark:text-neutral-350 tracking-wide mb-3">
                                {section.title}
                            </h3>
                            {
                                section.title.toLowerCase().includes("favorites") ? (
                                    <h3 className="text-xs text-neutral-150 dark:text-neutral-200 tracking-wide mb-3">
                                        Recent
                                    </h3>
                                ) : null
                            }
                        </div>

                        <ul className="flex flex-col gap-2">
                            {section.items.map((item: NavItem) =>
                                item.type === "submenu" ? (
                                    <li key={item.label}>
                                        <button
                                            onClick={() => toggleSubmenu(item.label)}
                                            className="flex items-start gap-3 w-full px-2 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-neutral-450 cursor-pointer"
                                        >
                                            {/* left chevron (right when closed, down when open) */}
                                            <span className="mt-1 text-gray-400">
                                                {openSubmenus[item.label] ? (
                                                    <GoChevronDown className="w-4 h-4" />
                                                ) : (
                                                    <GoChevronRight className="w-4 h-4" />
                                                )}
                                            </span>

                                            <span className="flex items-center gap-3">
                                                {/* icon (tight, no extra padding) */}
                                                {item.icon && (() => {
                                                    const Icon = item.icon;
                                                    return (
                                                        <Icon className="w-4 h-4" />
                                                    );
                                                })()}

                                                <span className="text-sm ">{item.label}</span>
                                            </span>
                                        </button>

                                        {openSubmenus[item.label] && item.children && (
                                            <ul className="ml-8 mt-2 flex flex-col gap-1">
                                                {item.children.map((child: LinkItem) => (
                                                    <li key={child.label}>
                                                        <a
                                                            href={child.href ?? "#"}
                                                            className="block px-2 py-1 text-sm "
                                                        >
                                                            {child.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ) : (
                                    <li key={item.label}>
                                        {/* ACTIVE: rounded pill with left black pill indicator */}
                                        {(item as LinkItem).active ? (
                                            <a
                                                href={(item as LinkItem).href ?? "#"}
                                                className="flex items-center gap-3 pr-2 py-1 rounded-lg bg-neutral-400 dark:bg-neutral-600"
                                            >
                                                {/* inline left black vertical pill */}
                                                <span className="inline-block w-1 h-4 rounded-full bg-black dark:bg-neutral-1000" />

                                                {/* icon in tight circle (no border padding) */}
                                                {item.icon && (() => {
                                                    const Icon = item.icon!;
                                                    return (
                                                        <Icon className="w-4 h-4 ml-5" />
                                                    );
                                                })()}

                                                <span className="text-sm ">{item.label}</span>
                                            </a>
                                        ) : (
                                            <a
                                                href={(item as LinkItem).href ?? "#"}
                                                className="flex items-center gap-3 px-2 py-2 rounded-m hover:bg-gray-50 dark:hover:bg-neutral-450"
                                            >
                                                {/* for Favorites section show small bullet dot */}
                                                {section.title.toLowerCase().includes("favorites") ? (
                                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-150 dark:bg-neutral-200" />
                                                ) : (
                                                    /* keep space so icons align */
                                                    <span className="w-2" />
                                                )}

                                                {/* icon (tight) */}
                                                {item.icon && (() => {
                                                    const Icon = item.icon!;
                                                    return <Icon className="w-5 h-5" />;
                                                })()}

                                                <span className="text-sm">{item.label}</span>
                                            </a>
                                        )}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
