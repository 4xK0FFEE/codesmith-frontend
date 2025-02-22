"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  className,
  disabled = false,
}) => {
  return (
    <label
      className={cn(
        "inline-flex items-center",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={cn(
            "w-6 h-6 border-2 rounded-lg transition-all duration-200",
            checked
              ? "border-blue-500 bg-blue-500"
              : "border-cosmic-text bg-inkpaper-text",
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          {checked && (
            <svg
              className="w-full h-full text-white p-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      {label && (
        <span
          className={cn("ml-3 text-cosmic-text", disabled ? "opacity-60" : "")}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
