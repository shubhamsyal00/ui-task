// components/ui/Pagination.tsx
"use client";

import React, { useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type PaginationProps = {
  currentPage?: number;
  totalPages: number;
  onChange?: (page: number) => void;
  neighbors?: number;
  defaultPage?: number;
  ariaLabel?: string;
};

export default function Pagination({
  currentPage: controlledPage,
  totalPages,
  onChange,
  neighbors = 1,
  defaultPage = 1,
  ariaLabel = "Pagination",
}: PaginationProps) {
  const isControlled = typeof controlledPage === "number";
  const [internalPage, setInternalPage] = React.useState<number>(defaultPage);

  const currentPage = isControlled ? (controlledPage as number) : internalPage;
  const clamp = (p: number) => Math.min(Math.max(1, p), Math.max(1, totalPages));

  React.useEffect(() => {
    if (!isControlled) setInternalPage((p) => clamp(p));
  }, [totalPages]);

  const setPage = (p: number) => {
    const next = clamp(p);
    if (!isControlled) setInternalPage(next);
    if (onChange) onChange(next);
  };

  const prev = () => setPage(currentPage - 1);
  const next = () => setPage(currentPage + 1);

  const pages = useMemo(() => {
    const total = Math.max(1, totalPages);
    const win = neighbors;
    const rangeStart = Math.max(2, currentPage - win);
    const rangeEnd = Math.min(total - 1, currentPage + win);

    const items: (number | "left-ellipsis" | "right-ellipsis")[] = [];
    items.push(1);
    if (rangeStart > 2) items.push("left-ellipsis");
    for (let i = rangeStart; i <= rangeEnd; i++) items.push(i);
    if (rangeEnd < total - 1) items.push("right-ellipsis");
    if (total > 1) items.push(total);
    return items;
  }, [currentPage, totalPages, neighbors]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
  };

  const baseBtn = "inline-flex items-center justify-center px-2 py-1 rounded-md text-sm font-medium transition";

  const pageBtnClass = (p: number) =>
    p === currentPage
      ? `${baseBtn} bg-neutral-100 dark:bg-neutral-200 focus:outline-none ring-0` 
      : `${baseBtn} hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-700`;

  const arrowBtnClass = (disabled?: boolean) =>
    disabled
      ? `${baseBtn} !p-1 cursor-not-allowed`
      : `${baseBtn} !p-1 hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-700`;

  return (
    <nav aria-label={ariaLabel} onKeyDown={handleKey} className="flex items-center gap-2 select-none">
      <button type="button" aria-label="Previous page" onClick={prev} disabled={currentPage <= 1} className={arrowBtnClass(currentPage <= 1)}>
        <FiChevronLeft className="w-5 h-5" />
      </button>

      <ul className="flex items-center gap-2 list-none m-0 p-0">
        {pages.map((it, idx) => {
          if (it === "left-ellipsis" || it === "right-ellipsis") {
            return (
              <li key={`${it}-${idx}`} className="px-2 text-sm" aria-hidden>
                …
              </li>
            );
          }

          const p = it as number;
          return (
            <li key={p}>
              <button
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === currentPage ? "page" : undefined}
                aria-label={p === currentPage ? `Page ${p}, current` : `Go to page ${p}`}
                className={pageBtnClass(p)}
              >
                <span className={p === currentPage ? "rounded-md" : ""}>{p}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <button type="button" aria-label="Next page" onClick={next} disabled={currentPage >= totalPages} className={arrowBtnClass(currentPage >= totalPages)}>
        <FiChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
