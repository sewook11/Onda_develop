"use client";

import React from "react";
import SelectBox from "@/components/common/SelectBox";

interface Filters {
  category: string;
  area: string;
  digitalLevel: string;
}

interface MeetFilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function MeetFilterBar({ filters, onChange }: MeetFilterBarProps) {
  const handleChange = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-3 mb-6">
      <SelectBox
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        placeholder="카테고리"
        options={[
          { label: "디지털 기초", value: "디지털 기초" },
          { label: "문화예술", value: "문화예술" },
          { label: "사교/친목도모", value: "사교/친목도모" },
        ]}
        className="min-w-[160px]"
      />
      <SelectBox
        value={filters.area}
        onChange={(e) => handleChange("area", e.target.value)}
        placeholder="지역"
        options={[
          { label: "서울", value: "서울" },
          { label: "부산", value: "부산" },
          { label: "인천", value: "인천" },
        ]}
        className="min-w-[160px]"
      />
      <SelectBox
        value={filters.digitalLevel}
        onChange={(e) => handleChange("digitalLevel", e.target.value)}
        placeholder="디지털 난이도"
        options={[
          { label: "하", value: "하" },
          { label: "중", value: "중" },
          { label: "상", value: "상" },
        ]}
        className="min-w-[160px]"
      />
      <button
        type="submit"
        className="bg-primary text-white text-sm rounded-md px-4 h-[44px] min-w-[72px] hover:bg-primary-light active:bg-primary-deep"
      >
        조회
      </button>
    </div>
  );
}
