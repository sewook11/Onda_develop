"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MeetingCard } from "@/components/common/MeetingCard";
import { getMeetingInfo } from "@/apis/meetingApi";
import { Meeting, MeetingFilter } from "@/types/meetings";
import {} from "../page";

interface MeetCardListProps {
  searchQuery: string;
  filters: MeetingFilter;
}

interface MeetingResponse {
  results: Meeting[];
  count: number;
  next: string | null;
  previous: string | null;
}

export default function MeetCardList({
  searchQuery,
  filters,
}: MeetCardListProps) {
  const {
    data: meets,
    isLoading,
    isError,
  } = useQuery<MeetingResponse>({
    queryKey: ["meetList", searchQuery, filters],
    queryFn: () =>
      getMeetingInfo({
        title: searchQuery || undefined,
        interest: filters.interest?.id !== 0 ? filters.interest?.id : undefined,
        area:
          filters.area?.childId?.id ?? filters.area?.parentId?.id ?? undefined,
        digital_level:
          filters.digitalLevel?.id !== 0 ? filters.digitalLevel?.id : undefined,
        status: filters.status,
      }),
  });
  console.log("meets", meets);
  if (isLoading)
    return <p className="text-center col-span-full">불러오는 중...</p>;
  if (isError)
    return (
      <p className="text-center col-span-full text-red-500">
        에러가 발생했습니다.
      </p>
    );
  if (!meets)
    return (
      <p className="text-center col-span-full text-gray-500">
        데이터를 불러올 수 없습니다.
      </p>
    );

  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meets.results.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">
          모임이 없습니다.
        </p>
      ) : (
        meets.results.map((meet) => (
          <MeetingCard key={meet.meet_id} item={meet} />
        ))
      )}
    </section>
  );
}
