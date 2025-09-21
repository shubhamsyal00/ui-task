"use client";

import React, { useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { BiHistory } from "react-icons/bi";
import {
  PiBellDuotone,
  PiNotebookDuotone,
  PiStarDuotone,
  PiSunDuotone,
} from "react-icons/pi";
import Link from "next/link";
import { useThemeStore } from "../../stores/theme-store";

interface TopbarProps {
  name: string;
}

export default function Topbar({ name }: TopbarProps) {
  const { isDark, toggle } = useThemeStore();

  // sync Zustand with <html class="dark">
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="py-5 h-17 flex items-center justify-between px-4 border-b border-neutral-550 dark:border-neutral-600">
      <div className="flex items-center gap-3">
        <button aria-label="menu" className="p-1 rounded hover:bg-bg-hover" title="Menu">
          <PiNotebookDuotone className="w-4 h-4 text-neutral-950 dark:text-neutral-0 cursor-pointer" />
        </button>

        <button aria-label="star" className="p-1 rounded hover:bg-bg-hover">
          <PiStarDuotone className="w-4 h-4 text-neutral-950 dark:text-neutral-0 cursor-pointer" />
        </button>

        <nav className="flex items-center gap-2 text-sm text-neutral-500 ml-2">
          <Link className="text-neutral-250 dark:text-neutral-350" href="/">
            Dashboards
          </Link>
          <span className="text-neutral-250 dark:text-neutral-350">/</span>
          <span className="text-neutral-950 dark:text-neutral-0 font-medium">
            {name}
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-bg-active rounded-lg px-3 py-1 text-sm bg-neutral-400 dark:bg-neutral-600">
          <HiOutlineSearch className="w-4 h-4 text-neutral-150 dark:text-neutral-200" />
          <input
            aria-label="quick search"
            placeholder="Search ⌘/"
            className="bg-transparent outline-none text-sm text-neutral-150 dark:text-neutral-200 placeholder:text-neutral-150 dark:placeholder:text-neutral-200 w-40"
          />
        </div>

        <button
          className="p-1 rounded hover:bg-bg-hover"
          onClick={toggle}
          aria-label="toggle theme"
        >
          <PiSunDuotone className="w-5 h-5 text-neutral-950 dark:text-neutral-0 cursor-pointer" />
        </button>
        <button className="p-1 rounded hover:bg-bg-hover">
          <BiHistory className="w-5 h-5 text-neutral-950 dark:text-neutral-0 cursor-pointer" />
        </button>
        <button className="p-1 rounded hover:bg-bg-hover">
          <PiBellDuotone className="w-5 h-5 text-neutral-950 dark:text-neutral-0 cursor-pointer" />
        </button>
        <button className="p-1 rounded hover:bg-bg-hover">
          <PiNotebookDuotone className="w-5 h-5 text-neutral-950 dark:text-neutral-0 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
