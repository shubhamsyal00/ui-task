"use client";

import React, { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoAddSharp, IoFilterOutline } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import debounce from "lodash/debounce";

type Props = {
  onSearch: (q: string) => void;
  sortingOptions: Record<number, string>;
  sortIndex: number | null;
  setSortIndex: (i: number | null) => void;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  dateFilter: string;
  setDateFilter: (v: string) => void;
};

export default function OrdersToolbar({
  onSearch,
  sortingOptions,
  sortIndex,
  setSortIndex,
  showFilters,
  setShowFilters,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}: Props) {
  const options = useMemo(() => Object.values(sortingOptions), [sortingOptions]);
  const filterRef = useRef<HTMLDivElement | null>(null);

  // controlled input value
  const [query, setQuery] = useState("");

  // create debounced onSearch (runs 300ms after user stops typing)
  const debouncedSearch = useMemo(
    () => debounce((q: string) => onSearch(q), 300),
    [onSearch]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setQuery(v);
      debouncedSearch(v);
    },
    [debouncedSearch]
  );

  // flush debounce on Enter for instant search
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        debouncedSearch.flush();
        onSearch(query);
      }
    },
    [debouncedSearch, onSearch, query]
  );

  // close filter popover when clicking outside
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [setShowFilters]);

  // cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSortClick = useCallback(() => {
    const next = sortIndex === null ? 0 : sortIndex + 1;
    if (next >= options.length) {
      setSortIndex(null);
    } else {
      setSortIndex(next);
    }
  }, [sortIndex, options.length, setSortIndex]);

  return (
    <div className="w-full bg-neutral-750 dark:bg-[#FFFFFF0D] rounded-lg px-4 py-2 h-11 flex items-center gap-3 relative">
      <div className="flex items-center gap-2">
        <button
          className="h-7 w-7 flex justify-center items-center rounded hover:bg-gray-50 dark:hover:bg-neutral-450"
          aria-label="Add order"
        >
          <IoAddSharp />
        </button>

        {/* Filter Popover */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="h-7 w-7 flex justify-center items-center rounded hover:bg-gray-50 dark:hover:bg-neutral-450"
            aria-expanded={showFilters}
            aria-label="Filters"
          >
            <IoFilterOutline />
          </button>

          {showFilters && (
            <div className="absolute mt-2 left-0 z-10 w-48 p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg shadow-lg text-sm">
              <label className="block text-xs mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full mb-3 px-2 py-1 rounded border text-xs"
              >
                <option value="">All</option>
                <option value="Complete">Complete</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <label className="block text-xs mb-1">Date</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-2 py-1 rounded border text-xs"
              >
                <option value="">All</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
              </select>
            </div>
          )}
        </div>

        {/* Sort button */}
        <button
          onClick={handleSortClick}
          className="h-7 w-auto px-2 flex items-center gap-2 rounded hover:bg-gray-50 dark:hover:bg-neutral-450"
          aria-pressed={sortIndex !== null}
        >
          <TbArrowsSort />
          {sortIndex !== null && <span className="text-xs">{options[sortIndex]}</span>}
        </button>
      </div>

      <div className="flex-1" />

      {/* Search with lodash debounce */}
      <div className="w-40 h-7">
        <div className="flex items-center gap-2 border border-neutral-150 dark:border-neutral-200 rounded-lg px-2 py-1 bg-neutral-350 dark:bg-neutral-250">
          <HiOutlineSearch className="w-4 h-4 text-neutral-150 dark:text-neutral-200" />
          <input
            type="search"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className="w-full bg-transparent outline-none text-sm placeholder:text-neutral-150 dark:placeholder:text-neutral-200 text-neutral-150 dark:text-neutral-200"
            aria-label="Search orders"
          />
        </div>
      </div>
    </div>
  );
}
