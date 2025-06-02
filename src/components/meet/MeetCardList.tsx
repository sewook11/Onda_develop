"use client";

import React from "react";
import MeetCard from "./MeetCard";

interface MeetItem {
  id: number;
  category: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface MeetCardListProps {
  searchQuery?: string;
  filters?: {
    category?: string;
    area?: string;
    digitalLevel?: string;
  };
}

export default function MeetCardList({ searchQuery, filters }: MeetCardListProps) {
  // 더미 데이터
  const dummyData: MeetItem[] = [
    {
      id: 1,
      category: "원예/정원 가꾸기",
      title: "걷기 & 대화 모임",
      date: "2025.06.04 (목)",
      time: "14:00",
      location: "서울 특별시 어쩌구 저쩌구",
    },
    {
      id: 2,
      category: "디지털 기초",
      title: "줌 사용법 마스터",
      date: "2025.06.05 (금)",
      time: "10:00",
      location: "부산 해운대구",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyData.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">모임이 없습니다.</p>
      ) : (
        dummyData.map((meet) => (
          <MeetCard
            key={meet.id}
            category={meet.category}
            title={meet.title}
            date={meet.date}
            time={meet.time}
            location={meet.location}
          />
        ))
      )}
    </section>
  );
}
