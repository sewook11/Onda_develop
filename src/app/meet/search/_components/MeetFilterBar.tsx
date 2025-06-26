"use client";

import React, { useEffect, useState } from "react";
import DropdownInput from "@/app/community/_components/DropdownInput";
import {
  getAreaOptions,
  getDigitalOptions,
  getInterestOptions,
} from "@/apis/options";
import { Option } from "@/types/post";
import { MeetingFilter } from "@/types/meetings";
import AreaDropdown from "@/app/community/_components/AreaDropdown";
import { Area } from "@/types/options";

interface MeetFilterBarProps {
  filters: MeetingFilter;
  onChange: (filters: MeetingFilter) => void;
}

export default function MeetFilterBar({
  filters,
  onChange,
}: MeetFilterBarProps) {
  const [areaOptions, setAreaOptions] = useState<Area[]>([]);
  const [interestOptions, setInterestOptions] = useState<Option[]>([]);
  const [digitalLevelOptions, setDigitalLevelOptions] = useState<Option[]>([]);

  const handleChange = (key: keyof MeetingFilter, value: Option) => {
    onChange({ ...filters, [key]: value });
  };

  const defaultFilters: MeetingFilter = {
    interest: undefined,
    digitalLevel: undefined,
    area: { parentId: undefined, childId: undefined },
    status: undefined,
  };

  const resetFilter = () => {
    onChange(defaultFilters);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const areaRes = await getAreaOptions();
      const interestRes = await getInterestOptions();
      const digitalRes = await getDigitalOptions();

      setAreaOptions(areaRes);

      setInterestOptions(
        interestRes.results.map((i: { id: number; interest_name: string }) => ({
          id: i.id,
          name: i.interest_name,
        }))
      );

      setDigitalLevelOptions(
        digitalRes.results.map((d: { id: number; description: string }) => ({
          id: d.id,
          name: d.description,
        }))
      );
    };

    fetchOptions();
  }, []);

  return (
    <div className="flex flex-col flex-wrap w-full md:flex-nowrap items-center gap-3 mb-6 p-2 bg-gray-100 my-2 rounded-lg border border-gray-300">
      <div className="flex gap-4 items-center justify-start w-full">
        <span className="text-gray-700 text-sm">상세 검색</span>
        <div className="flex gap-4">
          <button
            onClick={resetFilter}
            className="flex gap-2 py-1 rounded-full bg-white px-4 hover:bg-gray-300 text-accent-main font-medium"
          >
            필터 초기화
          </button>
        </div>
      </div>
      <div className="flex flex-wrap w-full md:flex-nowrap items-center gap-3 pb-2">
        <DropdownInput
          key={filters.interest?.id ?? "interest-default"}
          value={filters.interest}
          onChange={(val) => handleChange("interest", val)}
          options={interestOptions}
          placeholder="관심사"
          className="min-w-[160px] w-[250px]"
        />
        <DropdownInput
          key={filters.digitalLevel?.id ?? "digital-default"}
          value={filters.digitalLevel}
          onChange={(val) => handleChange("digitalLevel", val)}
          options={digitalLevelOptions}
          placeholder="디지털 난이도"
          className="min-w-[160px] w-[250px]"
        />
        <AreaDropdown
          key={`${filters.area?.parentId?.id ?? "parent"}-${filters.area?.childId?.id ?? "child"}`}
          value={filters.area}
          onChange={(val) => onChange({ ...filters, area: val })}
          options={areaOptions}
          placeholder="지역"
          className="flex-grow"
        />
      </div>
    </div>
  );
}
