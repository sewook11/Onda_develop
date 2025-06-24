"use client";

import React, { useState, useEffect } from "react";
import MeetSearchBar from "@/app/meet/search/_components/MeetSearchBar";
import MeetFilterBar from "@/app/meet/search/_components/MeetFilterBar";
import MeetCardList from "@/app/meet/search/_components/MeetCardList";
import { getCategoryOptions, getDigitalLevelOptions } from "@/apis/meetingApi";
import { getAreaOptions } from "@/apis/options";

export default function MeetSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    area: "",
    digitalLevel: "",
  });

  //옵션 상태 선언
  const [areaOptions, setAreaOptions] = useState<{ id: number; area_name: string }[]>([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [digitalLevelOptions, setDigitalLevelOptions] = useState([]);

  //옵션 불러오기
  useEffect(() => {
    const fetchOptions = async () => {
      const area = await getAreaOptions();
      console.log("지역 옵션 확인", area);
      const category = await getCategoryOptions();
      const digital = await getDigitalLevelOptions();

      setAreaOptions(area);
      setCategoryOptions(category.results);
      setDigitalLevelOptions(digital.results);
    };
    fetchOptions();
  }, []);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-xl font-bold text-main mb-6">모임 검색</h1>

      <MeetSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={() => {}}
      />

      <MeetFilterBar
        filters={filters}
        onChange={setFilters}
        areaOptions={areaOptions}
        categoryOptions={categoryOptions}
        digitalLevelOptions={digitalLevelOptions}
      />

      <MeetCardList searchQuery={searchQuery} filters={filters} />
    </main>
  );
}
