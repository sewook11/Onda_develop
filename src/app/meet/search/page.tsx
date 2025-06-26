"use client";

import React, { useState } from "react";
import MeetFilterBar from "@/app/meet/search/_components/MeetFilterBar";
import MeetCardList from "@/app/meet/search/_components/MeetCardList";
import DropdownInput from "@/app/community/_components/DropdownInput";
import TextInput from "@/components/common/TextInput";
import { Search } from "lucide-react";
import { MeetingFilter, StatusOption } from "@/types/meetings";
import { STATUS_OPTION } from "@/constants/meeting";

export default function MeetSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<StatusOption>(
    STATUS_OPTION[0]
  );
  const [filters, setFilters] = useState<MeetingFilter>({
    interest: undefined,
    area: undefined,
    digitalLevel: undefined,
    status: undefined,
  });

  return (
    <main className="flex flex-col items-center w-full my-20 max-w-[1440px] px-4 md:px-[160px] mx-auto">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold text-main mb-6">모임 검색</h1>
      </div>

      <div className="w-full flex flex-col gap-4 mt-10 items-end">
        <div className="w-full flex gap-4 flex-wrap">
          <DropdownInput
            value={selectedStatus}
            onChange={(opt) => {
              setSelectedStatus(opt);
              setFilters((prev) => ({ ...prev, status: opt.value }));
            }}
            options={STATUS_OPTION}
            placeholder="모집 상태"
            className="min-w-[150px] w-auto"
          />
          <div className="flex-grow">
            <TextInput
              placeholder="제목으로 게시글을 검색해보세요."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={24} />}
            ></TextInput>
          </div>
        </div>
      </div>

      <MeetFilterBar filters={filters} onChange={setFilters} />

      <MeetCardList searchQuery={searchQuery} filters={filters} />
    </main>
  );
}
