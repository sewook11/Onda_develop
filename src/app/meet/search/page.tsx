"use client";

import React, { useState } from "react";
import MeetSearchBar from "@/components/meet/MeetSearchBar";
import MeetFilterBar from "@/components/meet/MeetFilterBar";
import MeetCardList from "@/components/meet/MeetCardList";

export default function MeetSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    area: "",
    digitalLevel: "",
  });

  const handleSearch = () => {
    console.log("검색어:", searchQuery);
    console.log("필터:", filters);
    // 나중에 이 위치에 api 요청 붙일 예정
  };

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-xl font-bold text-main mb-6">모임 검색</h1>

      <MeetSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      />

      <MeetFilterBar filters={filters} onChange={setFilters} />

      <MeetCardList searchQuery={searchQuery} filters={filters} />
    </main>
  );
}
