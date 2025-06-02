"use client";

import React from "react";

interface SelectBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  className?: string;
  placeholder?: string;
}

export default function SelectBox({
  value,
  onChange,
  options,
  className = "",
  placeholder = "선택하세요",
}: SelectBoxProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border border-gray-300 text-sm rounded-md px-3 h-[44px] ${className}`}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
} 
