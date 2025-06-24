"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MeetingCard } from "@/components/common/MeetingCard";
import { MeetingCardType }  from "@/types/meetings";
import { getMeetingInfo } from "@/apis/meetingApi";


interface MeetCardListProps {
  searchQuery: string;
  filters: {
    category: string;
    area: string;
    digitalLevel: string;
  };
}

export default function MeetCardList({ searchQuery, filters }: MeetCardListProps) {
  const { data:meets, isLoading, isError } = useQuery({
    queryKey: ["meetList", searchQuery, filters],
    queryFn: () =>
      getMeetingInfo({
        title: searchQuery,
        category: filters.category,
        area: filters.area,
        digital_level: filters.digitalLevel,
      }),
  });
 console.log("meets", meets);
  if (isLoading) return <p className="text-center col-span-full">불러오는 중...</p>;
  if (isError) return <p className="text-center col-span-full text-red-500">에러가 발생했습니다.</p>;


  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meets.results.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">모임이 없습니다.</p>
      ) : (
        meets.results.map((meet:MeetingCardType) => (
          <MeetingCard key={meet.id} item={meet} />
        ))
      )}
    </section>
  );
}
