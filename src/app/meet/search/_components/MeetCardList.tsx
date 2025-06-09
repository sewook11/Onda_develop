"use client";

import React from "react";
import { MeetingCard } from "@/components/common/MeetingCard";

interface MeetItem {
  meet_id: number;
  title: string;
  interest: number;
  date: string;
  time: string;
  location: string;
  image?: string;
  status: string;
}

interface MeetCardListProps {
  searchQuery?: string;
  filters?: {
    category?: string;
    area?: string;
    digitalLevel?: string;
  };
}

export default function MeetCardList({}: MeetCardListProps) {
  const dummyData: MeetItem[] = [
    {
      meet_id: 1,
      title: "걷기 & 대화 모임",
      interest: 9,
      date: "2025-06-04",
      time: "14:00",
      location: "서울 특별시 어쩌구 저쩌구",
      image: "",
      status: "모집중",
    },
    {
      meet_id: 2,
      title: "줌 사용법 마스터",
      interest: 8,
      date: "2025-06-05",
      time: "10:00",
      location: "부산 해운대구",
      image: "",
      status: "모집 마감",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyData.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">모임이 없습니다.</p>
      ) : (
        dummyData.map((meet) => (
          <MeetingCard key={meet.meet_id} item={meet} />
        ))  
      )}
    </section>
  );
}
