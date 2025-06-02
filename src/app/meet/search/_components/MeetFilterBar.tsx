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
    <div className="flex gap-4 mb-6">
      <SelectBox
        label="카테고리"
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        options={[
          { label: "전체", value: "" },
          { label: "디지털 기초", value: "디지털 기초" },
          { label: "디지털 심화", value: "디지털 심화" },
          { label: "커뮤니케이션", value: "커뮤니케이션" },
        ]}
      />
      <SelectBox
        label="지역"
        value={filters.area}
        onChange={(e) => handleChange("area", e.target.value)}
        options={[
          { label: "전체", value: "" },
          { label: "서울", value: "서울" },
          { label: "부산", value: "부산" },
          { label: "대구", value: "대구" },
        ]}
      />
      <SelectBox
        label="디지털 난이도"
        value={filters.digitalLevel}
        onChange={(e) => handleChange("digitalLevel", e.target.value)}
        options={[
          { label: "전체", value: "" },
          { label: "하", value: "하" },
          { label: "중", value: "중" },
          { label: "상", value: "상" },
        ]}
      />
    </div>
  );
}