// components/CustomCheckbox.tsx
"use client";

import React from "react";
import { IoMdCheckmark } from "react-icons/io";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CustomCheckbox({ checked, onChange }: CustomCheckboxProps) {
  return (
    <div
      className={`
        w-5 h-5 rounded-md flex items-center justify-center cursor-pointer
        border border-neutral-550 dark:border-neutral-600
        ${checked ? "bg-neutral-900 dark:bg-neutral-1000 border-neutral-900 dark:border-neutral-1000" : "bg-transparent"}
      `}
      onClick={() => onChange(!checked)}
      role="checkbox"
      aria-checked={checked}
    >
      {checked && (
        <IoMdCheckmark
          className="w-3.5 h-3.5 text-white dark:text-black pointer-events-none"
        />
      )}
    </div>
  );
}
