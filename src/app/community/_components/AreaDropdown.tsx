"use client";

import { Area } from "@/types/options";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "./useClickOutside";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface SelectedArea {
  parentId: number;
  childId: number;
}

interface AreaDropdownProps {
  options: Area[];
  value?: SelectedArea;
  onChange: (value: SelectedArea) => void;
  placeholder?: string;
  className?: string;
}

export default function AreaDropdown({
  options,
  value,
  onChange,
  placeholder = "지역을 선택해주세요.",
  className,
}: AreaDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setOpen(false));

  useEffect(() => {
    if (value) {
      setSelectedParentId(value.parentId);
      setSelectedChildId(value.childId);
    }
  }, [value]);

  const selectedParent = options.find((p) => p.id === selectedParentId);
  const selectedChild = selectedParent?.children?.find(
    (c) => c.id === selectedChildId
  );

  const children = selectedParent?.children ?? [];

  const displayText =
    selectedParent && selectedChild
      ? `${selectedParent.area_name} ${selectedChild.area_name}`
      : placeholder;

  return (
    <div className={`${className}`}>
      <div className="relative w-full max-w-[600px]" ref={dropdownRef}>
        <button
          type="button"
          className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={selectedChild ? "text-black" : "text-gray-600"}>
            {value ? displayText : placeholder}
          </span>
          {open ? <ChevronUp /> : <ChevronDown />}
        </button>
        {open && (
          <div className="absolute mt-2 z-10 w-full bg-white border rounded-md shadow-lg h-[300px]">
            <div className="grid grid-cols-2 gap-4 h-full p-4">
              {/* 왼쪽 : 시/도 */}
              <div className="flex flex-col gap-2 h-full overflow-auto">
                <div className="font-semibold sticky top-0 bg-white px-3 py-2 pb-1">
                  시/도
                </div>
                <div>
                  {options.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setSelectedParentId(area.id)}
                      className={`w-full text-left px-3 py-2 rounded ${
                        selectedParent?.area_name === area.area_name
                          ? "border-orange-500 bg-orange-100 font-bold text-orange-600"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {area.area_name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 오른쪽 : 구/군 */}
              <div className="flex flex-col gap-2 h-full overflow-auto">
                <div className="font-semibold sticky top-0 bg-white px-3 py-2 pb-1">
                  구/군
                </div>
                <div
                  className="overflow-auto flex-1"
                  style={{ maxHeight: "230px" }}
                >
                  {children.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setSelectedChildId(c.id);
                        onChange({
                          parentId: selectedParentId!,
                          childId: c.id,
                        });
                        setOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded ${
                        selectedChild?.area_name === c.area_name
                          ? "border-orange-500 bg-orange-100 font-bold text-orange-600"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {c.area_name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
