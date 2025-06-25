"use client";

import { Option } from "@/types/post";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface DropdownInput {
  value?: Option;
  onChange: (value: Option) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
}

export default function DropdownInput({
  value,
  onChange,
  options,
  placeholder = "선택하세요.",
  className,
}: DropdownInput) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`${className}`}>
      <div className="relative w-full" ref={selectRef}>
        <button
          type="button"
          className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={value ? "text-black" : "text-gray-600"}>
            {value ? value.name : placeholder}
          </span>
          {open ? <ChevronUp /> : <ChevronDown />}
        </button>

        {open && (
          <ul className="text-sm absolute z-10 w-full bg-white border mt-1 rounded-md shadow-md max-h-60 overflow-auto">
            {options.map((opt) => (
              <li
                className={`px-2 py-4 m-1 hover:bg-gray-200 cursor-pointer rounded-md ${value?.id === opt?.id ? "bg-gray-100 font-medium" : ""}`}
                key={opt.id}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                {opt.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
