"use client"

import AreaSelector from "@/components/common/AreaSelector";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AreaDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
      >
        지역 선택
        {isOpen ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-[400px]">
          <AreaSelector />
        </div>
      )}
    </div>
  );
}
