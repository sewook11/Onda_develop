"use client";

import React, { useEffect, useState } from "react";
import SelectBox from "@/components/common/SelectBox";
import { MeetingSelectBox } from "../../create/_components/MeetingSelectBox";
import { getAreaOptions, getCategoryOptions, getDigitalOptions } from "@/apis/options";

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

  const [areaOptions, setAreaOptions] = useState<{ id: number; name: string }[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<{ id: number; category_name: string }[]>([]);
  const [digitalLevelOptions, setDigitalLevelOptions] = useState<{ id: number; display: string }[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const area = await getAreaOptions();
      setAreaOptions(area);

      const category = await getCategoryOptions();
      setCategoryOptions(category.results);

      const digital = await getDigitalOptions();
      setDigitalLevelOptions(digital.results);
    };
    fetchOptions();
  }, []);

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-3 mb-6">
      <MeetingSelectBox
        placeholder="카테고리"
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
      >
        {categoryOptions.map((option) => (
          <option key={option.id} value={String(option.id)}>
            {option.category_name}
          </option>
        ))}
      </MeetingSelectBox>

      <SelectBox
        value={filters.area}
        onChange={(e) => handleChange("area", e.target.value)}
        placeholder="지역"
        options={areaOptions.map((area) => ({
          label: area.area_name,
          value: String(area.id),
        }))}
        className="min-w-[160px]"
      />

      <MeetingSelectBox
        placeholder="디지털 난이도"
        value={filters.digitalLevel}
        onChange={(e) => handleChange("digitalLevel", e.target.value)}
      >
        {digitalLevelOptions?.map((option) => (
          <option key={option.id} value={String(option.id)}>
            {option.display}
          </option>
        ))}
      </MeetingSelectBox>
      <button
        type="submit"
        className="bg-primary text-white text-sm rounded-md px-4 h-[44px] min-w-[72px] hover:bg-primary-light active:bg-primary-deep"
      >
        조회
      </button>
    </div>
  );
}
